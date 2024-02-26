const fetcher = require("../fetcher");

global.fetch = jest.fn();

describe("fetcher", () => {
  describe("getResource", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should throw error", async () => {
      const iri = "http://example.com/nonexistent-resource";
      const headers = { Accept: "text/turtle" };
      const options = {};

      // Mock the fetch function to reject with an error
      global.fetch.mockRejectedValue(new Error("mocked error"));

      await expect(fetcher.getResource(iri, headers, options)).rejects.toThrow(
        "mocked error"
      );
    });

    test("should return a resource", async () => {
      const iri = "http://example.com/resource";
      const headers = { Accept: "text/turtle" };
      const options = {};

      // Mock the fetch function to resolve with a response
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
      });

      const result = await fetcher.getResource(iri, headers, options);

      expect(result).toEqual({ ok: true, status: 200, statusText: "OK" });
    });
  });

  describe("setAcceptRDFTypes", () => {
    test("should return the correct accept types", () => {
      const options = {};

      const result = fetcher.setAcceptRDFTypes(options);

      expect(result).toEqual(
        "text/turtle,application/ld+json,application/activity+json,text/html;q=0.9,image/svg+xml;q=0.9,text/markdown;q=0.9"
      );
    });

    test("should return the correct accept types with existing options", () => {
      const options = {
        headers: {
          Accept: "application/json",
        },
      };

      const result = fetcher.setAcceptRDFTypes(options);

      expect(result).toEqual(
        "text/turtle,application/ld+json,application/activity+json,text/html;q=0.9,image/svg+xml;q=0.9,text/markdown;q=0.9"
      );
    });
  });

  describe("getResourceHead", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should throw error when response is not ok", async () => {
      const url = "http://example.com/resource";
      const options = {};

      // Mock the fetch function to resolve with a response that is not ok
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetcher.getResourceHead(url, options)).rejects.toThrow(
        "Error fetching resource: 404 Not Found"
      );
    });

    test("should return response when response is ok", async () => {
      const url = "http://example.com/resource";
      const options = {};

      // Mock the fetch function to resolve with a response that is ok
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
      });

      const result = await fetcher.getResourceHead(url, options);

      expect(result).toEqual({
        ok: true,
        status: 200,
        statusText: "OK",
      });
    });
  });

  describe("getResourceOptions", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return resource options with default values", async () => {
      const url = "http://example.com/resource";
      const options = {};

      // Mock the fetch function to resolve with a response
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: {
          get: () => "text/turtle",
        },
      });

      const result = await fetcher.getResourceOptions(url, options);

      expect(result.headers.get()).toEqual("text/turtle");
    });

    test("should throw error when response is not ok", async () => {
      const url = "http://example.com/resource";
      const options = {};

      // Mock the fetch function to resolve with a response that is not ok
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetcher.getResourceOptions(url, options)).rejects.toThrow(
        "Error fetching resource OPTIONS: 404 Not Found"
      );
    });

    test("should throw error when specific header is not present", async () => {
      const url = "http://example.com/resource";
      const options = { header: "X-Custom-Header" };

      // Mock the fetch function to resolve with a response
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: {
          get: () => null,
        },
      });

      await expect(fetcher.getResourceOptions(url, options)).rejects.toThrow(
        "OPTIONS without X-Custom-Header header: 200 OK"
      );
    });

    test("should return specific header value", async () => {
      const url = "http://example.com/resource";
      const options = { header: "X-Custom-Header" };

      // Mock the fetch function to resolve with a response
      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
        headers: {
          get: () => "custom-value",
        },
      });

      const result = await fetcher.getResourceOptions(url, options);

      expect(result).toEqual({ headers: "custom-value" });
    });
  });

});
