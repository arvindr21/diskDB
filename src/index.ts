import { ERR, LOG } from './helper';
import { EXT_JSON, MESSAGES } from './global';

import { each } from 'async';
import { join } from 'path';

export class DiskDB {
  protected collections: string[];
  protected path: string;

  constructor(path: string = __dirname, collections: string[] = []) {
    if (collections.length === 0) {
      ERR(MESSAGES.ERROR.COLL_MT);
      throw new Error(MESSAGES.ERROR.COLL_MT);
    }
    this.path = path;
    this.collections = collections;
  }

  public loadCollections(): Promise<any | string> {
    return new Promise((resolve, reject) => {
      each(
        this.collections,
        async (collectionName, callback) => {
          LOG(MESSAGES.INFO.PRCG + collectionName);

          if (!collectionName.includes(EXT_JSON)) {
            collectionName = `${collectionName}${EXT_JSON}`;
          }

          const collectionFile = join(this.path, collectionName);
          const fsExists = await fileExists(collectionFile);


          callback();
        },
        err => {
          if (err) {
            ERR(MESSAGES.ERROR.LOAD_FL + err.message);
            reject(MESSAGES.ERROR.LOAD_FL);
            throw new Error(MESSAGES.ERROR.LOAD_FL + err.message);
          } else {
            LOG(MESSAGES.INFO.COLL_LD_DONE);
            resolve();
          }
        }
      );
    })
  }
}
