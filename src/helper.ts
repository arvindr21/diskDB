import * as debug from 'debug';

import { IDocument } from './interfaces';
import { MESSAGES } from './global';
import { nanoid } from 'nanoid';
import { promises } from 'fs';

export const LOG = debug('diskdb');
export const ERR = debug('diskdb:error');

// File Helpers
export async function fileExists(file: string): Promise<boolean> {
  try {
    await promises.access(file);
    return true;
  } catch (error) {
    ERR.log(MESSAGES.ERROR.GEN + error);
    return false;
  }
}

export async function writeToCollection(
  file: string,
  contents: string
): Promise<boolean> {
  try {
    await promises.writeFile(file, contents);
    return true;
  } catch (error) {
    ERR.log(MESSAGES.ERROR.GEN + error);
    return false;
  }
}

export async function readFromCollection(file: string): Promise<string | null> {
  try {
    const contents = await promises.readFile(file, 'utf8');
    return contents;
  } catch (error) {
    ERR.log(MESSAGES.ERROR.GEN + error);
    return null;
  }
}

export function getMeta(): IDocument["meta"]{
  return {
    _id: nanoid(),
    timestamp: +new Date
  }
}
