export const exampleFunction = () => 'example';

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should return "example"', () => {
    expect(exampleFunction()).toBe('example');
  });
}
