import * as LZC from 'lzutf8';

/**
 * @description Compression class
 * @author Arvind Ravulavaru
 * @date 2020-09-23
 * @export
 * @class Compress
 */
export class Compress {
  /**
   * @description Compress any data
   * @author Arvind Ravulavaru
   * @date 2020-09-23
   * @param {*} data
   * @returns
   * @memberof Compress
   */
  public async compress(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      LZC.compressAsync(
        data,
        {
          inputEncoding: 'String',
          outputEncoding: 'BinaryString',
        },
        (compressed, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(compressed);
          }
        }
      );
    });
  }

  /**
   * @description De-compress any data that has been already been compressed
   * @author Arvind Ravulavaru
   * @date 2020-09-23
   * @param {*} data
   * @returns
   * @memberof Compress
   */
  public async decompress(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      LZC.decompressAsync(
        data,
        {
          inputEncoding: 'BinaryString',
          outputEncoding: 'String',
        },
        (compressed, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(compressed);
          }
        }
      );
    });
  }
}
