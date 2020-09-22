import Debug from 'debug';

import { ICollection, IDocument } from './interfaces';

import { promises } from 'fs';
import { MESSAGES } from './global';

export const LOG = Debug('diskdb');

// File Helpers
export async function exists(file: string): Promise<boolean> {
  try {
    await promises.access(file);
    return true;
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return false;
  }
}

export async function write(file: string, contents: string): Promise<boolean> {
  try {
    await promises.writeFile(file, contents);
    return true;
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return false;
  }
}

export async function read(
  file: string
): Promise<ICollection['documents'] | null> {
  try {
    const contents = await promises.readFile(file, 'utf8');
    return JSON.parse(contents);
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return null;
  }
}

export async function remove(file: string): Promise<boolean | null> {
  try {
    await promises.unlink(file);
    return true;
  } catch (error) {
    LOG(MESSAGES.ERROR.GEN + error);
    return null;
  }
}

export function genMeta(): IDocument['meta'] {
  return {
    timestamp: +new Date(),
    version: 0,
  };
}
