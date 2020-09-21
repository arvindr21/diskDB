import { Collections } from '../lib/models/collection';
import { FStore } from './store';
import { red } from 'chalk';

/**
 * @description DiskDB Class
 * @author Arvind Ravulavaru
 * @date 2020-09-20
 * @export
 * @class DiskDB
 */
// tslint:disable-next-line: no-shadowed-variable
export class DiskDB {
  collections: string[];
  path: string;
  store: Promise<Collections> | undefined;

  constructor(path: string, collections: string[]) {
    const thrower = [];

    if (!path.trim().length) {
      thrower.push(
        red(`Path cannot be empty - "${path}". Expected: "/path/to/db"`)
      );
    }
    if (!Array.isArray(collections)) {
      thrower.push(
        red(
          `Invalid collections provided - "${collections}". Expected: ["books", "authors"]`
        )
      );
    }

    if (thrower.length) {
      throw new Error(thrower.join('\n'));
    }

    this.path = path;
    this.collections = collections;

    return this;
  }

  async connect() {
    return (this.store = new Promise(this.Resolver.bind(this)));
  }

  async Resolver(
    resolve: (collections: Collections) => void,
    reject: (error: string) => void
  ): Promise<Collections> {
    try {
      const fStore = new FStore(this.path, this.collections);
      const _store = await fStore.init();
      resolve(_store);
      return _store;
    } catch (error) {
      reject(error);
      return new Map() as Collections;
    }
  }
}
