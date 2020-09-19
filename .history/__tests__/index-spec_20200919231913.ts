import * as index from '../src/index';

test('Should have Greeter available', () => {
  expect(index.Greeter).toBeTruthy();
});

test('Should have diskdb available', () => {
  expect(index.diskdb).toBeTruthy();
});
