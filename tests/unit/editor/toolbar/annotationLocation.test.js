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

import { describe, it, expect, beforeEach } from 'vitest';
import { requireAnnotationLocation } from '../../../../src/editor/toolbar/toolbar.js';

function popup({ store, nanopub = false } = {}) {
  document.body.innerHTML = `<form><fieldset>
    <div class="editor-form-advanced" hidden="">
      <span class="annotation-location-selection"><details class="annotation-location-details" open=""><summary>Store at:</summary>
        ${store === undefined ? '' : `<ul><li><input data-visibility="public" type="checkbox" id="note-annotation-location-annotation-store-public" name="note-annotation-location-annotation-store" value="https://alice.example/annotations/"${store ? ' checked=""' : ''} /></li></ul>`}
        <ul class="annotation-location-setup"><li${store === undefined ? '' : ' hidden=""'}><button data-location="annotation-store" type="button">Add an annotation store</button></li></ul>
        <details class="annotation-location-more"><summary>More</summary>
          <ul><li><input type="checkbox" id="note-annotation-location-nanopub-network" name="note-annotation-location-nanopub-network"${nanopub ? ' checked=""' : ''} /></li></ul>
        </details>
      </details></span>
    </div>
    <div class="editor-form-footer">
      <button class="editor-form-advanced-toggle" type="button" aria-expanded="false"></button>
      <button class="editor-form-submit" type="submit">Post</button>
    </div>
  </fieldset></form>`;
  const form = document.querySelector('form');
  // Stands in for the toggle wiring in setupPopup
  form.querySelector('.editor-form-advanced-toggle').addEventListener('click', (e) => {
    e.currentTarget.setAttribute('aria-expanded', 'true');
    form.querySelector('.editor-form-advanced').hidden = false;
  });
  return form;
}

const warning = () => document.querySelector('.editor-form-storage-warning');

describe('posting without a storage location', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // jsdom has no layout
    document.defaultView.Element.prototype.scrollIntoView = () => {};
  });

  it('posts when a storage location is checked', () => {
    expect(requireAnnotationLocation(popup({ store: true }))).toBe(true);
    expect(requireAnnotationLocation(popup({ nanopub: true }))).toBe(true);
    expect(warning()).toBeNull();
  });

  it('asks to add an annotation store when there is none, and points to the button', () => {
    const form = popup();
    expect(requireAnnotationLocation(form)).toBe(false);
    expect(form.querySelector('.editor-form-advanced').hidden).toBe(false);
    expect(warning().closest('.annotation-location-details')).not.toBeNull();
    expect(warning().previousElementSibling.matches('summary')).toBe(true);
    expect(warning().textContent).toContain('You only have to do this once.');
    expect(document.activeElement.dataset.location).toBe('annotation-store');
  });

  it('asks to choose a location when the store exists but nothing is checked', () => {
    const form = popup({ store: false });
    expect(requireAnnotationLocation(form)).toBe(false);
    expect(warning().textContent).toContain('Choose where to store your annotation.');
    expect(document.activeElement.id).toBe('note-annotation-location-annotation-store-public');
  });

  it('shows one warning however often Post is clicked', () => {
    const form = popup();
    requireAnnotationLocation(form);
    requireAnnotationLocation(form);
    expect(document.querySelectorAll('.editor-form-storage-warning')).toHaveLength(1);
  });

  it('removes the warning once a location is checked', () => {
    const form = popup({ store: false });
    requireAnnotationLocation(form);
    const store = form.querySelector('#note-annotation-location-annotation-store-public');
    store.checked = true;
    store.dispatchEvent(new Event('change', { bubbles: true }));
    expect(warning()).toBeNull();
  });

  it('posts when the popup has no storage options, as in author mode', () => {
    document.body.innerHTML = '<form><fieldset><span class="annotation-location-selection"></span></fieldset></form>';
    expect(requireAnnotationLocation(document.querySelector('form'))).toBe(true);
  });
});
