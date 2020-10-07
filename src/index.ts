import { EMPTY_ARRAY, EXT_JSON, MESSAGES, EXT_DB } from './global';
import { exists, genMeta, read, write, remove, readDirectory } from './helper';
import { ICollection, IDBOptions, IDocument, TCollections } from './interfaces';

import { each } from 'async';
import { nanoid } from 'nanoid';
import { join, resolve as resolvePath } from 'path';

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
      // LOG(MESSAGES.ERROR.COLL_MT);
      throw new Error(MESSAGES.ERROR.COLL_MT);
    }

    options.path = resolvePath(options.path) ?? __dirname;
    options.compress = options.compress ?? true;
    console.log(MESSAGES.WARN.COMP_WRN);
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
  public async addDocumentToCollection(
    collectionName: string,
    doc: any
  ): Promise<boolean> {
    const coll = this.findOneCollection(collectionName);

    if (!coll) {
      // LOG(MESSAGES.ERROR.COLL_NF + collectionName);
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
      await write(coll.meta.path, JSON.stringify(coll), coll.meta.compress);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description removes a collection and associated documents
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @param {string} collectionName
   * @returns {boolean}
   * @memberof DiskDB
   */
  public delete(collectionName: string): boolean {
    let collectionFilePath = join(this.options.path, collectionName+EXT_DB); 
    console.log(collectionFilePath) //for unlinking collection .db file
    return  remove(collectionFilePath) && this.store.delete(collectionName);
  }
  /**
   * @description returns names of all collections
   * @author Arvind Ravulavaru
   * @date 2020-09-22
   * @return{Promise<String[]>
   * @memberof DiskDB
  **/
  public findCollections():Promise<String[]> {
    return readDirectory(this.options.path);
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
      // LOG(MESSAGES.ERROR.COLL_NF + collectionName);
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
  public loadCollections(): Promise<DiskDB> {
    return new Promise((resolve, reject) => {
      each(
        this.options.collections,
        async (collectionName: string, callback) => {
          // LOG.log(MESSAGES.INFO.PRCG + collectionName);

          if (!collectionName.includes(EXT_JSON)) {
            collectionName = `${collectionName}${EXT_DB}`;
          }

          const collectionFile = join(this.options.path, collectionName);
          const fileContents: ICollection['documents'] = JSON.parse(
            EMPTY_ARRAY
          );

          const dbDoc = await read(collectionFile, this.options);
          const coll: ICollection = {
            documents: dbDoc?.documents ?? fileContents,
            meta: {
              //compress: dbDoc?.meta.compress || false,  //false for testing purpose
              compress: dbDoc?.meta.compress || this.options.compress, 
              name: dbDoc?.meta.name ?? collectionName.replace(EXT_JSON, ''),
              path: dbDoc?.meta.path ?? collectionFile,
            },
          };

          const fsExists: boolean = await exists(collectionFile);
          if (!fsExists) {
            await write(
              collectionFile,
              JSON.stringify(coll),
              coll.meta.compress
            );
          }

          this.store.set(coll.meta.name.replace(EXT_DB, ''), coll);

          callback();
        },
        (err) => {
          if (err) {
            // LOG(MESSAGES.ERROR.LOAD_FL + err.message);
            reject(MESSAGES.ERROR.LOAD_FL);
            throw new Error(MESSAGES.ERROR.LOAD_FL + err.message);
          } else {
            resolve(this);
          }
        }
      );
    });
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
  public async removeDocumentFromCollection(
    collectionName: string,
    docId: string
  ) {
    const coll = this.findOneCollection(collectionName);

    if (!coll) {
      // LOG(MESSAGES.ERROR.COLL_NF + collectionName);
      return false;
    }

    try {
       const dbDoc = await read(coll.meta.path, this.options);
          const collection: ICollection = {
            documents: coll.documents.filter((d: IDocument) => d._id !== docId),
            meta: {
              compress: dbDoc?.meta.compress || this.options.compress, 
              name: dbDoc?.meta.name ?? collectionName.replace(EXT_JSON, ''),
              path: dbDoc?.meta.path ?? coll.meta.path
            },
          };
      coll.documents = coll.documents.filter((d: IDocument) => d._id !== docId);
      await write(coll.meta.path, JSON.stringify(collection), coll.meta.compress);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
