// tslint:disable: variable-name
import { Decoder, Encoder } from 'msgpack5';
/**
 * @description Compression class
 * @author Arvind Ravulavaru
 * @date 2020-09-23
 * @export
 * @class Compress
 */
export class Compress {

  /**
   * Creates an instance of Compress.
   * @author Arvind Ravulavaru
   * @date 2020-09-23
   * @memberof Compress
   */
  constructor() {
    this._decoder = new Decoder({});
    this._encoder = new Encoder({});
  }

  private _decoder: any;
  private _encoder: any;
  /**
   * @description De-compress any data that has been already encoded
   * @author Arvind Ravulavaru
   * @date 2020-09-23
   * @param {*} data
   * @returns
   * @memberof Compress
   */
  public decode(data: any) {
    return this._decoder(data);
  }
  /**
   * @description Compress any data
   * @author Arvind Ravulavaru
   * @date 2020-09-23
   * @param {*} data
   * @returns
   * @memberof Compress
   */
  public encode(data: any) {
    return this._encoder(data);
  }
}
