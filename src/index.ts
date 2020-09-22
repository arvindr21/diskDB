import { EMPTY_ARRAY, EXT_JSON, MESSAGES } from './global';
import {
  ERR,
  fileExists,
  getMeta,
  LOG,
  readFromCollection,
  writeToCollection,
} from './helper';
import { ICollection, IDBOptions, IDocument, TCollections } from './interfaces';

import { each } from 'async';
import { nanoid } from 'nanoid'
import { join } from 'path';

// Collection == File.json
// Document == File.Obj[0].json

export class DiskDB {
  public options: IDBOptions;
  public store: TCollections = new Map() as TCollections;

  constructor(options: IDBOptions) {
    options.path = options.path || __dirname;

    if (options.collections.length === 0) {
      ERR.log(MESSAGES.ERROR.COLL_MT);
      throw new Error(MESSAGES.ERROR.COLL_MT);
    }
    this.options = options;
  }

  public addDocumentToCollection(collectionName: string, doc: any): boolean {
    const coll = this.findOneCollection(collectionName);
    let dbDoc: IDocument;

    if (!coll) {
      ERR.log(MESSAGES.ERROR.COLL_NF + collectionName);
      return false;
    }

    let data = coll.documents as any[];
    // bulk add
    if (Array.isArray(doc)) {
      // tslint:disable-next-line: no-shadowed-variable
      doc.forEach((data: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        const dbDoc: IDocument = {
          data,
          meta: getMeta()
        }
        data = dbDoc;
      });
      data = data.concat(doc);
    } else {
      // single document add
      data.push({
        data: doc,
        meta: getMeta()
      });
    }

    coll.documents = data;
    return true;
  }

  public findCollections(): TCollections {
    return this.store;
  }

  public findOneCollection(collectionName: string): ICollection | undefined {
    return this.store.get(collectionName);
  }

  public getDocumentFromCollection(collectionName: string, docId: string) {
    const coll = this.store.get(collectionName);
    coll?.documents.
  }

  public loadCollections(): Promise<TCollections | string> {
    return new Promise((resolve, reject) => {
      each(
        this.options.collections,
        async (collectionName: string, callback) => {
          LOG.log(MESSAGES.INFO.PRCG + collectionName);

          if (!collectionName.includes(EXT_JSON)) {
            collectionName = `${collectionName}${EXT_JSON}`;
          }

          const collectionFile = join(this.options.path, collectionName);
          const fsExists: boolean = await fileExists(collectionFile);
          let fileContents: string | null = EMPTY_ARRAY;
          if (!fsExists) {
            await writeToCollection(collectionFile, JSON.parse(fileContents));
          } else {
            fileContents = await readFromCollection(collectionFile);
          }

          const coll: ICollection = {
            documents: fileContents,
            name: collectionName.replace(EXT_JSON, ''),
            path: collectionFile,
          };

          this.store.set(coll.name, coll);

          callback();
        },
        err => {
          if (err) {
            ERR.log(MESSAGES.ERROR.LOAD_FL + err.message);
            reject(MESSAGES.ERROR.LOAD_FL);
            throw new Error(MESSAGES.ERROR.LOAD_FL + err.message);
          } else {
            LOG.log(MESSAGES.INFO.COLL_LD_DONE);
            resolve(this.store);
          }
        }
      );
    });
  }

  public removeCollection(collectionName: string): boolean {
    return this.store.delete(collectionName);
  }

}
