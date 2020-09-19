import * as index from '../src/index';

test('Should have diskdb available', () => {
  expect(index.diskdb).toBeTruthy();
});
