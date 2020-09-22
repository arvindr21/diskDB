import { DiskDB } from '../build/index';

test('Should have DiskDB available', () => {
  expect(DiskDB).toBeDefined();
});

test('Should be able to create an instance of DiskDB', () => {
  const store = new DiskDB(__dirname, ['articles']);

  expect(store).toBeInstanceOf(DiskDB);
});
