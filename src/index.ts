import { EMPTY_ARRAY, EXT_JSON, MESSAGES } from './global';
import { exists, genMeta, LOG, read, write } from './helper';
import { ICollection, IDBOptions, IDocument, TCollections } from './interfaces';

import { each } from 'async';
import { nanoid } from 'nanoid';
import { join } from 'path';

// Collection == File.json
// Document == File.Obj[0].json
/**
 * @description DiskDB Class
 * @author Arvind Ravulavaru
 * @date 2020-09-22
 * @export
 * @class DiskDB
 */
export class DiskDB {
  public options: IDBOptions;
  public store: TCollections = new Map() as TCollections;
  /**
   * Creates an instance of DiskDB.
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {IDBOptions} options
   * @memberof DiskDB
   */
  constructor(options: IDBOptions) {
    if (options.collections.length === 0) {
      LOG(MESSAGES.ERROR.COLL_MT);
      throw new Error(MESSAGES.ERROR.COLL_MT);
    }

    options.path = options.path ?? __dirname;
    options.compress = options.compress ?? true;
    options.encrypt = options.encrypt ?? false;

    LOG(MESSAGES.WARN.ENC_WRN);

    if (options.encrypt) {
      // tslint:disable-next-line: no-console
      console.warn(MESSAGES.WARN.ENC_WRN);
    }
    this.options = options;
  }
  /**
   * @description adds a document to a collection
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {string} collectionName
   * @param {*} doc
   * @returns {boolean}
   * @memberof DiskDB
   */
  public addDocumentToCollection(collectionName: string, doc: any): boolean {
    const coll = this.findOneCollection(collectionName);

    if (!coll) {
      LOG(MESSAGES.ERROR.COLL_NF + collectionName);
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
            meta: genMeta(),
          };
          data.push(dbDoc);
        });
      } else {
        // single document add
        data.push({
          _id: nanoid(),
          data: doc,
          meta: genMeta(),
        });
      }

      coll.documents = data;
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * @description returns all collections
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @returns {TCollections}
   * @memberof DiskDB
   */
  public findCollections(): TCollections {
    return this.store;
  }
  /**
   * @description Returns a document by document id in a collection
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {string} collectionName
   * @param {string} docId
   * @returns {(IDocument | null | false)}
   * @memberof DiskDB
   */
  public findDocumentFromCollectionByID(
    collectionName: string,
    docId: string
  ): IDocument | null | false {
    const coll = this.findOneCollection(collectionName);
    let doc: IDocument | any = {};

    if (!coll) {
      LOG(MESSAGES.ERROR.COLL_NF + collectionName);
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

  /**
   * @description returns one collection
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {string} collectionName
   * @returns {(ICollection | undefined)}
   * @memberof DiskDB
   */
  public findOneCollection(collectionName: string): ICollection | undefined {
    return this.store.get(collectionName);
  }
  /**
   * @description Syncs collections from/to disk
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @returns {(Promise<TCollections | string>)}
   * @memberof DiskDB
   */
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
          const fileContents: ICollection['documents'] = JSON.parse(
            EMPTY_ARRAY
          );
          const dbDoc = await read(collectionFile, this.options);
          const coll: ICollection = {
            documents: dbDoc?.documents ?? fileContents,
            meta: {
              compress: dbDoc?.meta.compress || this.options.compress,
              encrypt: dbDoc?.meta.encrypt ?? this.options.encrypt ?? false,
              name: dbDoc?.meta.name ?? collectionName.replace(EXT_JSON, ''),
              path: dbDoc?.meta.path ?? collectionFile,
            },
          };

          const fsExists: boolean = await exists(collectionFile);
          if (!fsExists) {
            await write(
              collectionFile,
              JSON.stringify(fileContents),
              this.options
            );
          }

          this.store.set(coll.meta.name, coll);

          callback();
        },
        err => {
          if (err) {
            LOG(MESSAGES.ERROR.LOAD_FL + err.message);
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

  /**
   * @description removes a collection and associated documents
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {string} collectionName
   * @returns {boolean}
   * @memberof DiskDB
   */
  public removeCollection(collectionName: string): boolean {
    return this.store.delete(collectionName);
  }
  /**
   * @description removes a document from a collection
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {string} collectionName
   * @param {string} docId
   * @returns {boolean}
   * @memberof DiskDB
   */
  public removeDocumentFromCollection(
    collectionName: string,
    docId: string
  ): boolean {
    const coll = this.findOneCollection(collectionName);

    if (!coll) {
      LOG(MESSAGES.ERROR.COLL_NF + collectionName);
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
