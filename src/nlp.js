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

export const NAME_LANGUAGES = ['en', 'es'];

// Types here must be singular
const lexicon = {
  'dokieli': 'Organization',
  'W3C': 'Organization'
};

function getMatches(type, selection) {
  return selection.json({ offset: true }).map(entry => {
    const terms = entry.terms;
    if (!terms.length) return null;

    const first = terms[0].offset;
    const last = terms[terms.length - 1].offset;
    const start = first.start;
    const end = last.start + last.length;

    return {
      type,
      text: entry.text.replace(/[.,!?;:]+$/, ''),
      start,
      end
    };
  }).filter(Boolean);
}

function getEnglishEntities(nlp, text) {
  const doc = nlp(text, lexicon);

  const people = getMatches('person', doc.people());
  const places = getMatches('place', doc.places());
  const organizations = getMatches('organization', doc.organizations());
  const acronyms = getMatches('acronym', doc.acronyms())
    .filter(item => !organizations.some(o => o.text === item.text));

  return { people, organizations, places, acronyms, names: [] };
}

// es-compromise tags proper nouns, and some as people or places, but has no organisations
function getSpanishEntities(nlp, text) {
  const doc = nlp(text);
  const entities = { people: [], organizations: [], places: [], acronyms: [], names: [] };

  // Names joined by "de" or "del", such as "Ministerio de Sanidad", then the rest
  const joined = doc.match('#ProperNoun+ (de|del) #ProperNoun+');
  const single = doc.not(joined).match('#ProperNoun+');

  [joined, single].forEach(chunks => {
    getMatches('name', chunks).forEach((match, i) => {
      const chunk = chunks.eq(i);
      if (chunk.has('#Person')) entities.people.push({ ...match, type: 'person' });
      else if (chunk.has('#Place')) entities.places.push({ ...match, type: 'place' });
      else entities.names.push(match);
    });
  });

  for (const m of text.matchAll(/\b[A-ZÁÉÍÓÚÑÜ]{2,}\b/g)) {
    entities.acronyms.push({ type: 'acronym', text: m[0], start: m.index, end: m.index + m[0].length });
  }

  return entities;
}

export async function extractEntitiesFromText(text, language = 'en') {
  if (language === 'es') {
    const { default: nlp } = await import(/* webpackChunkName: "nlp-es" */ 'es-compromise');
    return getSpanishEntities(nlp, text);
  }

  if (language === 'en') {
    const { default: nlp } = await import(/* webpackChunkName: "nlp-en" */ 'compromise');
    return getEnglishEntities(nlp, text);
  }

  return { people: [], organizations: [], places: [], acronyms: [], names: [] };
}
