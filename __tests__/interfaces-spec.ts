import { ERR, LOG } from '../build/helper';

test('Should have LOG logger available', () => {
  expect(LOG).toBeDefined();
});

test('Should have ERR logger available', () => {
  expect(ERR).toBeDefined();
});
