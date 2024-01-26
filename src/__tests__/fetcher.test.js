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

  describe("getResourceGraph", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return undefined if graph cannot be returned", async () => {
      const iri = "http://example.com/nonexistent-resource";
      const headers = { Accept: "text/turtle" };
      const options = {};

      // Mock the fetch function to reject with an error
      global.fetch.mockRejectedValue(new Error("mocked error"));

    await expect(fetcher.getResourceGraph(iri, headers, options)).resolves.toBeUndefined();
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
        headers: {
          get: () => "text/turtle",
        },
        text: () => `@prefix ex: <http://example.com/> .

      ex:Person1 a ex:Person ;
        ex:name "John Doe" ;
        ex:age 30 .`,
      });

      const result = await fetcher.getResourceGraph(iri, headers, options);

      expect(result._graph).toHaveLength(3);
      expect(result._graph._graph[1].object).toEqual({
        datatype: {
          interfaceName: "NamedNode",
          nominalValue: "http://www.w3.org/2001/XMLSchema#string",
        },
        interfaceName: "Literal",
        language: null,
        native: undefined,
        nominalValue: "John Doe",
      });
    });
  });
});
