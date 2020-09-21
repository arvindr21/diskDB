import { each } from "async";

export class DiskDB {
  public collections: string[];
  public path: string;

  constructor(path: string = __dirname, collections: string[] = []) {
    this.path = path;
    this.collections = collections;

    this.loadCollections();
  }

  private loadCollections(): void {
    each(this.collections, (collection, callback) => {

      // Perform operation on file here.
      console.log('Processing collection ' + collection);

      callback();

    }, (err) => {
      // if any of the file processing produced an error, err would equal that error
      if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        throw new Error('Load Collection Failed: '+ err.message);
      }
    });
  }

}
