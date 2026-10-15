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

// TODO: Remove after the Spanish pilot, with its calls in ohyeah.js, the strings with "pilot" in their keys, the .ohyeah-pilot-form CSS and the docs section

import { i18n } from './i18n.js';
import { getButtonHTML, getDocsBaseURL } from './ui/buttons.js';
import { htmlEncode } from './utils/sanitization.js';
import { getDeviceStorageItem, setDeviceStorageItem, removeDeviceStorageItem } from './storage.js';

const STORAGE_KEY = 'DO.Config.OhYeah.Pilot';
const MODEL_URL = 'https://huggingface.co/Nithiwat/mdeberta-v3-base_claimbuster';

let pilotCode = null;

function encodeAttribute(value) {
  return htmlEncode(value, { mode: 'attribute' });
}

export async function loadPilotCode() {
  try {
    const stored = await getDeviceStorageItem(STORAGE_KEY);
    pilotCode = typeof stored?.code === 'string' && stored.code ? stored.code : null;
  }
  catch {
    pilotCode = null;
  }
}

function usesPilotModel(language) {
  return language === 'es' && !!pilotCode;
}

export function getPilotClaimLanguageHTML(language) {
  if (!usesPilotModel(language)) return '';
  return `<p class="ohyeah-warning ohyeah-claim-language" data-i18n="panel.ohyeah.claimcheck.language-es-pilot.p" data-i18n-model="${encodeAttribute(MODEL_URL)}">${i18n.t('panel.ohyeah.claimcheck.language-es-pilot.p.innerHTML', { model: MODEL_URL })}</p>`;
}

export function getPilotHTML(language) {
  if (language !== 'es') return '';

  const infoButton = getButtonHTML({ key: 'info.ohyeah-pilot.button', button: 'info', buttonClass: 'info', buttonType: 'button', buttonRel: 'rel:help', buttonResource: `${getDocsBaseURL()}#feature-oh-yeah-spanish-pilot` });

  return `
    <details class="ohyeah-service ohyeah-pilot"${pilotCode ? ' open=""' : ''}>
      <summary data-i18n="panel.ohyeah.pilot.summary">${i18n.t('panel.ohyeah.pilot.summary.textContent')}</summary>
      <p><span data-i18n="panel.ohyeah.pilot.about.p" data-i18n-model="${encodeAttribute(MODEL_URL)}">${i18n.t('panel.ohyeah.pilot.about.p.innerHTML', { model: MODEL_URL })}</span> ${infoButton}</p>
      <form class="ohyeah-pilot-form">
        <label data-i18n="panel.ohyeah.pilot.label" for="ohyeah-pilot-code">${i18n.t('panel.ohyeah.pilot.label.textContent')}</label>
        <input autocomplete="off" id="ohyeah-pilot-code" name="ohyeah-pilot-code" required="" type="password" value="${encodeAttribute(pilotCode || '')}" />
        <button data-i18n="panel.ohyeah.pilot.save.button" type="submit">${i18n.t('panel.ohyeah.pilot.save.button.textContent')}</button>
        <button class="ohyeah-pilot-remove" data-i18n="panel.ohyeah.pilot.remove.button"${pilotCode ? '' : ' disabled=""'} type="button">${i18n.t('panel.ohyeah.pilot.remove.button.textContent')}</button>
        <p class="ohyeah-service-message" role="status"></p>
      </form>
    </details>`;
}

async function setPilotCode(aside, value) {
  if (value) {
    await setDeviceStorageItem(STORAGE_KEY, { code: value });
  }
  else {
    removeDeviceStorageItem(STORAGE_KEY);
  }
  pilotCode = value;

  aside.querySelector('.ohyeah-pilot-remove').disabled = !value;
  aside.querySelector('#ohyeah-pilot-code').value = value || '';
}

export function initPilotForm(aside, onChange) {
  const form = aside.querySelector('.ohyeah-pilot-form');
  if (!form) return;

  const message = form.querySelector('.ohyeah-service-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = form.querySelector('#ohyeah-pilot-code').value.trim();
    if (!value) return;
    await setPilotCode(aside, value);
    onChange();
    message.textContent = i18n.t('panel.ohyeah.pilot.saved.p.textContent');
  });

  form.querySelector('.ohyeah-pilot-remove').addEventListener('click', async () => {
    await setPilotCode(aside, null);
    onChange();
    message.textContent = i18n.t('panel.ohyeah.pilot.removed.p.textContent');
  });
}

export function getPilotRequestFields(language) {
  return usesPilotModel(language) ? { access_code: pilotCode } : {};
}

// 403: the service refused the access code; 404: it has no pilot model
export function getPilotErrorKey(body, status) {
  if (!body.access_code) return null;
  if (status === 403) return 'panel.ohyeah.pilot.rejected.p';
  if (status === 404) return 'panel.ohyeah.pilot.unavailable.p';
  return null;
}
