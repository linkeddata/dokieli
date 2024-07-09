import { encodeString, decodeString, getAbsoluteIRI, stripFragmentFromString, getFragmentFromString, getBaseURL, getPathURL, forceTrailingSlash } from "../../src/uri";

describe("uri", () => {
  const ENCODED_URL = "https%3A%2F%2Fexample.com";
  const DECODED_URL = "https://example.com";
  const URL_WITHOUT_QUERY_WITHOUT_FRAGMENT = "https://example.com/profile/card";
  const URL_WITHOUT_QUERY_WITH_FRAGMENT = "https://example.com/profile/card#me";
  const URL_WITH_QUERY_WITHOUT_FRAGMENT = "https://example.com/profile/card?foo=bar";
  const URL_WITH_QUERY_WITH_FRAGMENT = "https://example.com/profile/card?foo=bar#me";
  const URL_ENDING_WITH_SLASH = "https://example.com/profile/";
  const URL_ENDING_WITHOUT_SLASH = "https://example.com/profile";

  describe("encodeString", () => {
    it("returns an encoded URL", () => {
      const result = encodeString(DECODED_URL);
      expect(result).toEqual(ENCODED_URL);
    });
  });

  describe("decodeString", () => {
    it("returns a decoded URL", () => {
      const result = decodeString(ENCODED_URL);
      expect(result).toEqual(DECODED_URL);
    });
  });

  describe("getAbsoluteIRI", () => {
    it("returns correct IRI for a container relative path", () => {
      const result = getAbsoluteIRI(DECODED_URL, "/example/");
      expect(result).toEqual(`${DECODED_URL}/example/`);
    });
    it("returns correct IRI for a resource relative path", () => {
      const result = getAbsoluteIRI(DECODED_URL, "/example");
      expect(result).toEqual(`${DECODED_URL}/example`);
    });
    it("returns correct IRI for a full IRI", () => {
      const result = getAbsoluteIRI(DECODED_URL, "https://example.com");
      expect(result).toEqual(DECODED_URL);
    });
  });

  describe("stripFragmentFromString", () => {
    it("returns a string without fragment", () => {
      const result = stripFragmentFromString(URL_WITHOUT_QUERY_WITH_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
    });
  });
  
  describe("getFragmentFromString", () => {
    it("returns fragment from a given string", () => {
      const result = getFragmentFromString(URL_WITHOUT_QUERY_WITH_FRAGMENT);
      expect(result).toEqual("me");
    });
    it("returns fragment from a given string", () => {
      const result = getFragmentFromString(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
      expect(result).toEqual("");
    });
  });

  describe("getBaseUrl", () => {
    it("returns the base URL for a given URL", () => {
      const result = getBaseURL(URL_WITHOUT_QUERY_WITH_FRAGMENT);
      expect(result).toEqual(URL_ENDING_WITH_SLASH);
    });
  });

  describe("getPathUrl", () => {
    it("returns input if not string", () => {
      const result = getPathURL({});
      expect(result).toEqual({});
    });
    it("returns path URL for URL without query and without fragment", () => {
      const result = getPathURL(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
    });
    it("returns path URL for URL without query and with fragment", () => {
      const result = getPathURL(URL_WITHOUT_QUERY_WITH_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
    });
    it("returns path URL for URL with query and without fragment", () => {
      const result = getPathURL(URL_WITH_QUERY_WITHOUT_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
    });
    it("returns path URL for URL with query and with fragment", () => {
      const result = getPathURL(URL_WITH_QUERY_WITH_FRAGMENT);
      expect(result).toEqual(URL_WITHOUT_QUERY_WITHOUT_FRAGMENT);
    });
  });

  describe("forceTrailingSlash", () => {
    it("returns string without slash ending with slash", () => {
      const result = forceTrailingSlash( URL_ENDING_WITHOUT_SLASH);
      expect(result).toEqual(URL_ENDING_WITH_SLASH);
    });
    it("returns string with slash ending with slash", () => {
      const result = forceTrailingSlash( URL_ENDING_WITH_SLASH);
      expect(result).toEqual(URL_ENDING_WITH_SLASH);
    });
  });
});
