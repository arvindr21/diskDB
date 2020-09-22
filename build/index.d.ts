import { ICollection, IDBOptions, TCollections } from './interfaces';
export declare class DiskDB {
    options: IDBOptions;
    store: TCollections;
    constructor(options: IDBOptions);
    addDocumentToCollection(collectionName: string, doc: any): boolean;
    findCollections(): TCollections;
    findOneCollection(collectionName: string): ICollection | undefined;
    loadCollections(): Promise<TCollections | string>;
    removeCollection(collectionName: string): boolean;
}
