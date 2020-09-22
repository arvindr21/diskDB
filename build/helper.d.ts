import * as debug from 'debug';
import { ICollection, IDocument } from './interfaces';
export declare const LOG: debug.Debugger;
export declare const ERR: debug.Debugger;
export declare function fileExists(file: string): Promise<boolean>;
export declare function writeToCollection(file: string, contents: string): Promise<boolean>;
export declare function readFromCollection(file: string): Promise<ICollection['documents'] | null>;
export declare function getMeta(): IDocument['meta'];
