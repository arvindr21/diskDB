export interface ICollection {
  documents: IDocument[];
  meta: {
    compress: boolean;
    encrypt: boolean;
    name: string;
    path: string;
  };
}
export interface IDBOptions {
  collections: string[];
  compress: boolean;
  encrypt?: boolean;
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
