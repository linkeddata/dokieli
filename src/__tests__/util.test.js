const util = require("../util");
const { TextEncoder } = require("util");
const crypto = require("crypto");

global.TextEncoder = TextEncoder;

Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: crypto.webcrypto.subtle,
  },
});

describe("util", () => {
  describe("uniqueArray", () => {
    it("returns an array with unique values", () => {
      const nonUniqueArray = [1, 2, 2, 2, 6, 9];
      const result = util.uniqueArray(nonUniqueArray);
      expect(result).toHaveLength(4);
      expect(result).toEqual([1, 2, 6, 9]);
    });
  });

  describe("getDateTimeISO", () => {
    jest.useFakeTimers().setSystemTime(new Date("April 25, 2022 02:00:00"));
    it("returns a date string", () => {
      const result = util.getDateTimeISO();
      expect(result).toBe("2022-04-25T02:00:00.000Z");
    });
  });

  describe("removeChildren", () => {
    it("removes first child", () => {
      const node = `<div id='wrapper'><span>test</span></div>`;
      document.body.innerHTML = node;
      util.removeChildren(document.getElementById("wrapper"));
      expect(document.body.innerHTML.toString()).toMatchInlineSnapshot(
        `"<div id="wrapper"></div>"`
      );
    });
  });

  describe("copyTextToClipboard", () => {
    it("calls the clipboard writeText function with the correct argument if navigator clipboard is available", () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
      util.copyTextToClipboard("example");
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("example");
    });
    it("calls the document execCommand function with copy with the correct argument if navigator clipboard is unavailable", () => {
      Object.assign(navigator, {
        clipboard: null,
      });
      Object.assign(document, {
        execCommand: jest.fn(),
      });
      util.copyTextToClipboard("example");
      expect(document.execCommand).toHaveBeenCalledWith("copy");
    });
  });

  describe("escapeRegExp", () => {
    it("escape characters in a given string", () => {
      const resultString = util.escapeRegExp("example (test)");
      expect(resultString).toEqual("example \\(test\\)");
    });
  });

  describe("generateUUID", () => {
    it("returns a 36-character-long UUID", () => {
      const result = util.generateUUID();
      expect(result).toHaveLength(36);
    });
  });

  describe("generateAttributeId", () => {
    it("returns an attribute id given a prefix and a string", () => {
      const id = util.generateAttributeId("a", "example");
      expect(id).toEqual("aexample");
    });
    it("returns an attribute id given a string and no prefix", () => {
      const id = util.generateAttributeId(null, "example");
      expect(id).toEqual("example");
    });
    it("returns an attribute id with a suffix if id already in use", () => {
      const node = `<div id='example'><span>test</span></div>`;
      document.body.innerHTML = node;
      const id = util.generateAttributeId(null, "example");
      expect(id).toEqual("example-x");
    });
    it("returns a 36-character-long UUID if string is not passed", () => {
      const id = util.generateAttributeId();
      expect(id).toHaveLength(36);
    });
  });

  describe("hashCode", () => {
    it("retuns a number for a given string", () => {
      const result = util.hashCode("example string");
      expect(result).toEqual(168766343);
    });
  });

  describe("fragmentFromString", () => {
    it("creates a document fragment from a string", () => {
      const result = util.fragmentFromString(
        '<div id="wrapper"><span>test</span></div>'
      );
      expect(result).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          id="wrapper"
        >
          <span>
            test
          </span>
        </div>
      </DocumentFragment>
      `);
    });
  });

  describe("getHash", () => {
    it("returns a hash for a given message and default algorithm", async () => {
      const hash = await util.getHash("example");
      expect(hash).toEqual(
        "50d858e0985ecc7f60418aaf0cc5ab587f42c2570a884095a9e8ccacd0f6545c"
      );
    });
    it("returns a hash for a given message and algorithm", async () => {
      const hash = await util.getHash("example", "SHA-512");
      expect(hash).toEqual(
        "3bb12eda3c298db5de25597f54d924f2e17e78a26ad8953ed8218ee682f0bbbe9021e2f3009d152c911bf1f25ec683a902714166767afbd8e5bd0fb0124ecb8a"
      );
    });
  });
});
