import { ICollection, IDBOptions, IDocument, TCollections } from './interfaces';
export declare class DiskDB {
    options: IDBOptions;
    store: TCollections;
    constructor(options: IDBOptions);
    addDocumentToCollection(collectionName: string, doc: any): boolean;
    findCollections(): TCollections;
    findDocumentFromCollectionByID(collectionName: string, docId: string): IDocument | null | false;
    findDocumentsFromCollectionByQuery(collectionName: string, docId: string): IDocument | null | false;
    findOneCollection(collectionName: string): ICollection | undefined;
    loadCollections(): Promise<TCollections | string>;
    removeCollection(collectionName: string): boolean;
    removeDocumentFromCollection(collectionName: string, docId: string): boolean;
}
