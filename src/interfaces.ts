export interface ICollection {
  documents: IDocument[];
  name: string;
  path: string;
}
export interface IDBOptions {
  collections: string[];
  path: string;
}

export interface IDocument {
  _id: string;
  data: any;
  meta: {
    timestamp: number;
    version: number;
  };
}

export type TCollections = Map<string, ICollection>;
