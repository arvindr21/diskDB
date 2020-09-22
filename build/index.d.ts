export declare class DiskDB {
    protected collections: string[];
    protected path: string;
    constructor(path?: string, collections?: string[]);
    loadCollections(): Promise<any | string>;
}
