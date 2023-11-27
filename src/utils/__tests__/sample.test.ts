function add(a: number, b: number) {
  return a + b;
}

describe('sample add function', () => {
  it(() => {
    expect(add(1, 2)).toEqual(3);
  });
});
