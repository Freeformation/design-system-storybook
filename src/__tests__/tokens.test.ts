import tokens from '../tokens';

test('tokens export contains colors and spacing', () => {
  expect(tokens).toBeDefined();
  expect(tokens.colors).toBeDefined();
  expect(tokens.spacing).toBeDefined();
});
