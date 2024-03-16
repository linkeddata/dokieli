import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from "util";
import { webcrypto } from "crypto";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

Object.defineProperty(global.self, "crypto", {
  value: {
    subtle: webcrypto.subtle,
  },
});


global.jest = jest;