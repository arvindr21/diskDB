import Debug from 'debug';

import { ICollection, IDBOptions, IDocument } from './interfaces';

import { promises } from 'fs';
import { MESSAGES } from './global';

import { Compress } from './compress';

export const LOG = Debug('diskdb');
const compress = new Compress();

/**
 * @description check if file exists
 * @author Arvind Ravulavaru
 * @date 2020-09-22
 * @export
 * @param {string} file
 * @returns {Promise<boolean>}
 */
export async function exists(file: string): Promise<boolean> {
  try {
    await promises.access(file);
    return true;
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return false;
  }
}
/**
 * @description writes contents to a file
 * @author Arvind Ravulavaru
 * @date 2020-09-22
 * @export
 * @param {string} file
 * @param {string} contents
 * @returns {Promise<boolean>}
 */
export async function write(
  file: string,
  contents: string,
  options: IDBOptions
): Promise<boolean> {
  try {
    await promises.writeFile(
      file,
      options.compress ? compress.encode(contents) : contents
    );
    return true;
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return false;
  }
}
/**
 * @description reads contents from a file
 * @author Arvind Ravulavaru
 * @date 2020-09-22
 * @export
 * @param {string} file
 * @returns {(Promise<ICollection['documents'] | null>)}
 */
export async function read(
  file: string,
  options: IDBOptions
): Promise<ICollection | null> {
  try {
    const contents = options.compress
      ? compress.decode(await promises.readFile(file, 'utf-8'))
      : await promises.readFile(file, 'utf-8');
    return JSON.parse(contents);
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return null;
  }
}
/**
 * @description removes a file
 * @author Arvind Ravulavaru
 * @date 2020-09-22
 * @export
 * @param {string} file
 * @returns {(Promise<boolean | null>)}
 */
export async function remove(file: string): Promise<boolean | null> {
  try {
    await promises.unlink(file);
    return true;
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return null;
  }
}

/**
 * @description Generates document meta data
 * @author Arvind Ravulavaru
 * @date 2020-09-22
 * @export
 * @returns {IDocument['meta']}
 */
export function genMeta(): IDocument['meta'] {
  return {
    timestamp: +new Date(),
    version: 0,
  };
}
