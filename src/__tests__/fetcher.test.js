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

      await expect(
        fetcher.getResourceGraph(iri, headers, options)
      ).resolves.toBeUndefined();
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
        "Error fetching resource HEAD: 404 Not Found"
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

  describe("getTriplesFromGraph", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("should return triples from graph", async () => {
      const url = "http://example.com/resource";

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

      const result = await fetcher.getTriplesFromGraph(url);

      expect(result._graph).toHaveLength(3);
      expect(result._graph[0]).toEqual({
        object: {
          interfaceName: "NamedNode",
          nominalValue: "http://example.com/Person",
        },
        predicate: {
          interfaceName: "NamedNode",
          nominalValue: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        },
        subject: {
          interfaceName: "NamedNode",
          nominalValue: "http://example.com/Person1",
        },
      });
    });

    test("should throw error if getResourceGraph fails", async () => {
      const url = "http://example.com/resource";

      global.fetch.mockRejectedValue(new Error("mocked error"));

      // TODO: this test reflects current behaviour but getResourceGraph should probably throw error when fetch fails instead of returning undefined
      await expect(fetcher.getTriplesFromGraph(url)).rejects.toThrow(
        "Cannot read properties of undefined (reading 'graph')"
      );
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

  describe("parseLinkHeader", () => {
    test("should return an empty object if link is not provided", () => {
      const result = fetcher.parseLinkHeader();
      expect(result).toEqual({});
    });

    test("should parse link header and return the correct result", () => {
      const link =
        '<http://example.com/page1>; rel="prev", <http://example.com/page2>; rel="next"';
      const result = fetcher.parseLinkHeader(link);
      expect(result).toEqual({
        prev: ["http://example.com/page1"],
        next: ["http://example.com/page2"],
      });
    });

    test("should handle multiple links with the same rel", () => {
      const link =
        '<http://example.com/page1>; rel="next", <http://example.com/page2>; rel="next"';
      const result = fetcher.parseLinkHeader(link);
      expect(result).toEqual({
        next: ["http://example.com/page1", "http://example.com/page2"],
      });
    });

    test("should handle links with parameters", () => {
      const link =
        '<http://example.com/page1>; rel="next"; type="text/html", <http://example.com/page2>; rel="prev"; type="application/json"';
      const result = fetcher.parseLinkHeader(link);
      expect(result).toEqual({
        "application/json": ["http://example.com/page2"],
        next: ["http://example.com/page1"],
        prev: ["http://example.com/page2"],
        "text/html": ["http://example.com/page1"],
      });
    });

    test("should handle links with different casing", () => {
      const link =
        '<http://example.com/page1>; rel="Next", <http://example.com/page2>; rel="PREV"';
      const result = fetcher.parseLinkHeader(link);
      expect(result).toEqual({
        next: ["http://example.com/page1"],
        prev: ["http://example.com/page2"],
      });
    });

    test("should handle links without 'http:' or 'https:'", () => {
      const link =
        '<http://example.com/page1>; rel="next", <example.com/page2>; rel="prev"';
      const result = fetcher.parseLinkHeader(link);
      expect(result).toEqual({
        next: ["http://example.com/page1"],
        prev: ["example.com/page2"],
      });
    });
  });
});
