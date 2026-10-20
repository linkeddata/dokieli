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

import Config from './config.js';
import { getDeviceStorageItem, setDeviceStorageItem } from './storage.js';

const THEME_STORAGE_KEY = 'DO.Config.UI.Theme';
const THEMES = ['light', 'dark', 'auto'];

// The extension keeps one theme for every page, like the language
function extensionStorage() {
  return Config.WebExtensionEnabled ? Config.WebExtension?.storage : undefined;
}

async function getStoredTheme() {
  const storage = extensionStorage();
  if (storage) {
    return (await storage.local.get(THEME_STORAGE_KEY))?.[THEME_STORAGE_KEY];
  }
  return getDeviceStorageItem(THEME_STORAGE_KEY);
}

function storeTheme(theme) {
  const storage = extensionStorage();
  if (storage) {
    return storage.local.set({ [THEME_STORAGE_KEY]: theme });
  }
  return setDeviceStorageItem(THEME_STORAGE_KEY, theme);
}

// 'auto' removes the attribute so the prefers-color-scheme media query applies.
export function applyTheme(theme) {
  const t = THEMES.includes(theme) ? theme : 'auto';
  const root = document.documentElement;

  if (t === 'auto') {
    delete root.dataset.theme;
  }
  else {
    root.dataset.theme = t;
  }

  if (Config.User?.UI) {
    Config.User.UI.Theme = t;
  }

  document.dispatchEvent(new CustomEvent('do-theme-changed', { detail: { theme: t } }));

  return t;
}

export async function setTheme(theme) {
  const t = applyTheme(theme);

  try {
    await storeTheme(t);
  }
  catch (e) {
    console.error('dokieli: theme persist failed', e);
  }

  return t;
}

let themeControlsBound = false;

export function bindThemeControls() {
  if (themeControlsBound) { return; }
  themeControlsBound = true;

  document.addEventListener('change', (e) => {
    const input = e.target.closest('input[name="do-display-theme"]');
    if (!input) { return; }

    setTheme(input.value);
  });

  // A theme chosen in the extension's menu reaches every page it is active on
  extensionStorage()?.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[THEME_STORAGE_KEY]) {
      applyTheme(changes[THEME_STORAGE_KEY].newValue);
    }
  });
}

export async function initTheme() {
  let stored = 'auto';

  try {
    stored = (await getStoredTheme()) || 'auto';
  }
  catch (e) {}

  applyTheme(stored);
  bindThemeControls();
}
