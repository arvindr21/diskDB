import * as debug from 'debug';
export declare const LOG: debug.Debugger;
export declare const ERR: debug.Debugger;
export declare function fileExists(file: string): Promise<boolean>;
export declare function writeToCollection(file: string, contents: string): Promise<boolean>;
export declare function readFromCollection(file: string): Promise<string | null>;
