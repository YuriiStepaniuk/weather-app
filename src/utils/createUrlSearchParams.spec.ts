import { createUrlSearchParams } from "./createUrlSearchParams";

describe("createUrlSearchParams", () => {
  it("converts string parameters correctly", () => {
    const params = { foo: "bar", baz: "qux" };
    const result = createUrlSearchParams(params);
    expect(result).toBe("foo=bar&baz=qux");
  });

  it("converts number and boolean parameters correctly", () => {
    const params = { num: 42, boolTrue: true, boolFalse: false };
    const result = createUrlSearchParams(params);

    expect(result).toBe("num=42&boolTrue=true&boolFalse=false");
  });

  it("skips undefined and null parameters", () => {
    const params = { a: "value", b: undefined, c: null };
    const result = createUrlSearchParams(params);
    expect(result).toBe("a=value");
  });

  it("returns empty string for empty input", () => {
    const params = {};
    const result = createUrlSearchParams(params);
    expect(result).toBe("");
  });
});
