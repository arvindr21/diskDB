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
import { nanoid } from 'nanoid';
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

    if (!coll) {
      ERR.log(MESSAGES.ERROR.COLL_NF + collectionName);
      return false;
    }

    try {
      const data = coll.documents as any[];
      // bulk add
      if (Array.isArray(doc)) {
        // tslint:disable-next-line: no-shadowed-variable
        doc.forEach((d: any) => {
          // tslint:disable-next-line: no-shadowed-variable
          const dbDoc: IDocument = {
            _id: nanoid(),
            data: d,
            meta: getMeta(),
          };
          data.push(dbDoc);
        });
      } else {
        // single document add
        data.push({
          _id: nanoid(),
          data: doc,
          meta: getMeta(),
        });
      }

      coll.documents = data;
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  public findCollections(): TCollections {
    return this.store;
  }

  public findDocumentFromCollectionByID(
    collectionName: string,
    docId: string
  ): IDocument | null | false {
    const coll = this.findOneCollection(collectionName);
    let doc: IDocument | any = {};

    if (!coll) {
      ERR.log(MESSAGES.ERROR.COLL_NF + collectionName);
      return false;
    }

    const docs = coll.documents;

    if (docs.length === 0) {
      return doc;
    }

    docs.forEach((docm: IDocument) => {
      if (docm._id === docId) {
        doc = docm;
        return;
      }
    });

    return doc;
  }

  public findDocumentsFromCollectionByQuery(
    collectionName: string,
    docId: string
  ): IDocument | null | false {
    const coll = this.findOneCollection(collectionName);
    let doc: IDocument | any = {};

    if (!coll) {
      ERR.log(MESSAGES.ERROR.COLL_NF + collectionName);
      return false;
    }

    const docs = coll.documents;

    if (docs.length === 0) {
      return doc;
    }

    docs.forEach((docm: IDocument) => {
      if (docm._id === docId) {
        doc = docm;
        return;
      }
    });

    return doc;
  }

  public findOneCollection(collectionName: string): ICollection | undefined {
    return this.store.get(collectionName);
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
          let fileContents: ICollection['documents'] = JSON.parse(EMPTY_ARRAY);
          if (!fsExists) {
            await writeToCollection(
              collectionFile,
              JSON.stringify(fileContents)
            );
          } else {
            fileContents =
              (await readFromCollection(collectionFile)) || fileContents;
          }

          const coll: ICollection = {
            documents: fileContents ? fileContents : [],
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

  public removeDocumentFromCollection(
    collectionName: string,
    docId: string
  ): boolean {
    const coll = this.findOneCollection(collectionName);

    if (!coll) {
      ERR.log(MESSAGES.ERROR.COLL_NF + collectionName);
      return false;
    }

    try {
      coll.documents = coll.documents.filter((d: IDocument) => d._id !== docId);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
