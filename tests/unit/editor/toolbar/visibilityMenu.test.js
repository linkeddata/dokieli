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

import { describe, it, expect } from 'vitest';
import { annotationVisibilityHTML } from '../../../../src/editor/toolbar/toolbar.js';

function form(options) {
  document.body.innerHTML = `<form><fieldset><div class="editor-form-footer">${annotationVisibilityHTML('note', options)}</div></fieldset></form>`;
}

const access = () => document.querySelector('.editor-form-access');
const encrypt = () => document.querySelector('.editor-form-encrypt');
const summary = (kind) => document.querySelector(`.annotation-menu[data-menu="${kind}"] summary`).textContent;
const chosen = (kind) => document.querySelector(`input[name="note-${kind}-menu"]:checked`).value;
const choose = (kind, value) => document.querySelector(`label[for="note-${kind}-menu-${value}"]`).click();

describe('annotation visibility and encryption menus', () => {
  it('start from the given visibility and encryption, each on its own', () => {
    form({ isPublic: true, encrypted: false });
    expect(chosen('access')).toBe('public');
    expect(chosen('encrypt')).toBe('unencrypted');
    expect(summary('access')).toContain('Public');
    expect(summary('encrypt')).toContain('Not encrypted');

    form({ isPublic: false, encrypted: true });
    expect(chosen('access')).toBe('private');
    expect(chosen('encrypt')).toBe('encrypted');
    expect(access().checked).toBe(false);
    expect(encrypt().checked).toBe(true);
  });

  it('the visibility menu sets the access checkbox the form reads, and leaves encryption alone', () => {
    form({ isPublic: false, encrypted: false });
    choose('access', 'public');
    expect(access().checked).toBe(true);
    expect(encrypt().checked).toBe(false);
    expect(summary('access')).toContain('Public');
    expect(new FormData(document.querySelector('form')).get('note-access-public')).toBe('true');

    choose('access', 'private');
    expect(access().checked).toBe(false);
    expect(new FormData(document.querySelector('form')).get('note-access-public')).toBeNull();
  });

  it('turning encryption off unchecks it', () => {
    form({ isPublic: false, encrypted: true });
    choose('encrypt', 'unencrypted');
    expect(encrypt().checked).toBe(false);
    expect(summary('encrypt')).toContain('Not encrypted');
  });

  it('follow a change made elsewhere', () => {
    form({ isPublic: false });
    access().checked = true;
    access().dispatchEvent(new Event('change', { bubbles: true }));
    expect(chosen('access')).toBe('public');
    expect(summary('access')).toContain('Public');
  });
});
