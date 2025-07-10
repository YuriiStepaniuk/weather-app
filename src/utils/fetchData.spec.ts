import { fetchData } from "./fetchData";

describe("fetchData", () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  it("returns parsed JSON on successful response", async () => {
    const mockData = { foo: "bar" };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const url = "https://api.example.com/data";
    const data = await fetchData<typeof mockData>(url);

    expect(fetch).toHaveBeenCalledWith(url);
    expect(data).toEqual(mockData);
  });

  it("throws an error if response.ok is false", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const url = "https://api.example.com/fail";

    await expect(fetchData(url)).rejects.toThrow(
      `Failed to fetch data for ${url}`,
    );
  });

  it("throws if fetch itself rejects", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const url = "https://api.example.com/error";

    await expect(fetchData(url)).rejects.toThrow("Network error");
  });
});
