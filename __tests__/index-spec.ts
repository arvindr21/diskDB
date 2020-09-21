import * as index from '../src/index';

describe('DiskDB: ', () => {
  test('should be initialized ', () => {
    expect(index.DiskDB).toBeTruthy();
  });
});
