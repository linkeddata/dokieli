/*!
Copyright 2012-2026 Sarven Capadisli <https://csarven.ca/>
Copyright 2023-2026 Virginia Balseiro <https://virginiabalseiro.com/>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { test, expect, vi, } from 'vitest';
import {
  disableAutoSave,
  enableAutoSave
} from '../../src/sync.js';
import * as storage from '../../src/storage.js';
import Config from '../../src/config.js';

test('disableAutoSave removes the edit handlers and keeps the autosave preference', async () => {
  const removeEventListener = vi.spyOn(document, 'removeEventListener');
  const updateItem = vi.spyOn(storage, 'updateDeviceStorageItem').mockResolvedValue(undefined);

  // Autosave listens for edits rather than running on an interval
  const indexedDBHandler = vi.fn();
  const httpHandler = vi.fn();
  Config.AutoSave.Items['key'] = {
    IndexedDB: { handler: indexedDBHandler },
    http: { handler: httpHandler },
  };

  await disableAutoSave('key', { method: 'IndexedDB' });
  ['input', 'paste', 'keydown'].forEach(type => {
    expect(removeEventListener).toHaveBeenCalledWith(type, indexedDBHandler);
  });
  expect(Config.AutoSave.Items['key'].IndexedDB.handler).toBeUndefined();

  await disableAutoSave('key', { method: ['http'] });
  ['input', 'paste', 'keydown'].forEach(type => {
    expect(removeEventListener).toHaveBeenCalledWith(type, httpHandler);
  });
  expect(Config.AutoSave.Items['key'].http.handler).toBeUndefined();

  // Leaving edit mode disables the handlers; only the autosave toggle changes the preference
  expect(updateItem).not.toHaveBeenCalled();

  removeEventListener.mockRestore();
});

test('disableAutoSave ignores keys and methods it never enabled', async () => {
  global.clearInterval = vi.fn();
  vi.spyOn(storage, 'updateDeviceStorageItem').mockResolvedValue(undefined);

  await disableAutoSave('never-enabled', { method: 'IndexedDB' });

  Config.AutoSave.Items['partial'] = { IndexedDB: { id: 1 } };
  await disableAutoSave('partial', { method: 'http' });

  expect(global.clearInterval).not.toHaveBeenCalled();
});


test.skip('enableAutoSave sets interval for localStorage and http methods', async () => {
  vi.useFakeTimers();

  // Config.AutoSave.Items['key-1'] = {};

  await enableAutoSave('key-1', { method: 'localStorage' });
  expect(Config.AutoSave.Items['key-1'].localStorage.digestSRI).toBeDefined();

  await enableAutoSave('key-1', { method: 'http' });
  expect(Config.AutoSave.Items['key-1'].http.id).toBeDefined();

  disableAutoSave('key-1', { method: ['localStorage', 'http'] });
  vi.useRealTimers();
});
test('markLocalSnapshotPublished marks the latest snapshot when it already holds the saved content', async () => {
  const { autoSave, markLocalSnapshotPublished } = await import('../../src/sync.js');
  const { getHash } = await import('../../src/util.js');
  const { getDocument } = await import('../../src/doc.js');

  const hash = await getHash(getDocument(null, { ...Config.DOMProcessing, format: true, sanitize: true, normalize: true }));
  Config.AutoSave.Items['https://example.org/doc'] = { IndexedDB: { digestSRI: hash } };

  vi.spyOn(storage, 'getDeviceStorageItem').mockResolvedValue({ items: ['https://example.org/doc#latest', 'https://example.org/doc#older'] });
  const updateItem = vi.spyOn(storage, 'updateDeviceStorageItem').mockResolvedValue(undefined);
  const updateStorage = vi.spyOn(storage, 'updateStorage').mockResolvedValue(undefined);

  await markLocalSnapshotPublished('https://example.org/doc');

  expect(updateStorage).not.toHaveBeenCalled();
  expect(updateItem).toHaveBeenCalledWith('https://example.org/doc#latest', { published: expect.any(String) });

  updateItem.mockClear();
  await autoSave('https://example.org/doc', { method: 'IndexedDB' });
  expect(updateItem).not.toHaveBeenCalled();
});

test('syncLocalRemoteResource discards unsaved device copies when asked, and keeps them otherwise', async () => {
  const { syncLocalRemoteResource } = await import('../../src/sync.js');
  const { getDocument } = await import('../../src/doc.js');

  const url = 'https://example.org/unsaved';
  const items = {
    [url]: { items: [`${url}#unsaved-2`, `${url}#unsaved-1`, `${url}#saved`, `${url}#unsaved-old`] },
    [`${url}#unsaved-2`]: { id: `${url}#unsaved-2`, content: '<html><body><p>2</p></body></html>', mediaType: 'text/html', updated: '2026-10-22T10:02:00Z' },
    [`${url}#unsaved-1`]: { id: `${url}#unsaved-1`, content: '<html><body><p>1</p></body></html>', mediaType: 'text/html', updated: '2026-10-22T10:01:00Z' },
    [`${url}#saved`]: { id: `${url}#saved`, published: '2026-10-22T10:00:00Z' },
    [`${url}#unsaved-old`]: { id: `${url}#unsaved-old` }
  };
  const previousURL = Config.DocumentURL;
  const previousStorage = Config.Storage;
  Config.DocumentURL = url;
  const remote = getDocument(null, { ...Config.DOMProcessing, format: true, sanitize: true, normalize: true });
  Config.Storage = { get: vi.fn(async () => new Response(remote, { headers: { 'Content-Type': 'text/html' } })) };
  vi.spyOn(storage, 'getDeviceStorageItem').mockImplementation(async key => items[key]);
  const remove = vi.spyOn(storage, 'removeDeviceStorageDocumentFromCollection').mockResolvedValue(undefined);

  try {
    await syncLocalRemoteResource({ discardUnsaved: true });
    expect(remove.mock.calls).toEqual([[url, `${url}#unsaved-2`], [url, `${url}#unsaved-1`]]);

    remove.mockClear();
    delete Config.Resource[url];
    await syncLocalRemoteResource();
    expect(remove).not.toHaveBeenCalled();
  }
  finally {
    Config.DocumentURL = previousURL;
    Config.Storage = previousStorage;
    delete Config.Resource[url];
    vi.restoreAllMocks();
  }
});
