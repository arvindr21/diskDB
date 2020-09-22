export interface ICollection {
  documents: IDocument[];
  name: string;
  path: string;
}
export interface IDBOptions {
  collections: string[];
  path: string;
}

export interface IDocument{
  data: any,
  meta: {
    _id: string;
    timestamp: number
  }
}

export type TCollections = Map<string, ICollection>;



