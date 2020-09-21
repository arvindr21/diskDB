import {
  Collection,
  Collections,
} from '../lib/models/collection';
import { EMPTY_ARRAY, EXT_JSON } from '../lib/helpers/global';
import {
  fileExists,
  pathExists,
  readFromCollection,
  writeToCollection,
} from '../lib/helpers/file';

import { Document } from '../lib/models/document';
import { join } from 'path';
import { red } from 'chalk';

export class FStore {
  _db: Collections = new Map() as Collections;
  size = 0;
  constructor(private path: string, private collections: string[]) {
    if (!pathExists(this.path)) {
      throw new Error(red(`Invalid file path provided "${this.path}"`));
    }

    if (!Array.isArray(this.collections)) {
      throw new Error(
        red(
          `Invalid collection provided - "${this.collections}". Expected: ["books", "authors"]`
        )
      );
    }
    return this;
  }

  async get(collectionName: string){
    this._db.get(collectionName);
  }

  async init(): Promise<Collections> {
    await Promise.all(this.collections.map(this.initCollection.bind(this)));
    return this._db;
  }

  async initCollection(collectionName: string) {
    if (!collectionName.includes(EXT_JSON)) {
      collectionName = `${collectionName}${EXT_JSON}`;
    }

    const collectionFile = join(this.path, collectionName);
    const fsExists = await fileExists(collectionFile);
    let fileContents = EMPTY_ARRAY;
    if (!fsExists) {
      await writeToCollection(collectionFile, fileContents);
    } else {
      fileContents = await readFromCollection(collectionFile);
    }
    const coll: Collection = {
      name: collectionName.replace(EXT_JSON, ''),
      path: collectionFile,
      documents: fileContents,
    };

    this._db.set(coll.name, coll);
    this.size = this._db.size;
  }

  async set(collectionName: string, document: any): Promise<Document | null> {
    const doc: Document = {
      _id: '',
      data: document,
      meta: {
        updated: +new Date(),
        version: 1
      }
    }

    const status = await this._set(collectionName, doc);
    return status ? doc :  null;
  }


  private async _set(collectionName: string, document: Document): Promise<boolean> {
    // update local cache
    const coll: Collection | undefined = this._db.get(collectionName);
    coll?.documents?.push(document);
    // update filesystem
    const status: boolean = await writeToCollection(coll?.path, coll?.documents);
    return status;
  }

}
