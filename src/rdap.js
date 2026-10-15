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

export const RDAP_BOOTSTRAP_URL = 'https://data.iana.org/rdap/dns.json';

const TIMEOUT_MS = 15000;

let bootstrap = null;

function getBootstrap() {
  if (!bootstrap) {
    bootstrap = fetch(RDAP_BOOTSTRAP_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) })
      .then(res => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .catch(e => {
        bootstrap = null;
        throw e;
      });
  }
  return bootstrap;
}

async function getServerURL(domain) {
  const ending = domain.split('.').pop().toLowerCase();
  const data = await getBootstrap();
  const service = (data.services || []).find(([endings]) => endings.includes(ending));
  if (!service) return null;
  const url = service[1].find(u => u.startsWith('https:')) || service[1][0];
  return url.endsWith('/') ? url : url + '/';
}

function getVCardValue(entity, field) {
  const item = (entity?.vcardArray?.[1] || []).find(property => property[0] === field);
  return item ? item[3] : undefined;
}

// Registries hide personal data with placeholders such as "REDACTED FOR PRIVACY"
function published(value) {
  if (Array.isArray(value)) value = value.filter(Boolean).join(', ');
  return typeof value === 'string' && value.trim() && !/redacted|withheld|not disclosed/i.test(value) ? value.trim() : undefined;
}

// Same fields as the WHOIS lookup of the Oh yeah? text analysis service
function getRecord(data) {
  const events = Object.fromEntries((data.events || []).map(event => [event.eventAction, event.eventDate]));
  const entities = data.entities || [];
  const registrar = entities.find(entity => entity.roles?.includes('registrar'));
  const registrant = entities.find(entity => entity.roles?.includes('registrant'));
  const address = getVCardValue(registrant, 'adr');

  return {
    domain_name: data.ldhName?.toLowerCase(),
    registrar: published(getVCardValue(registrar, 'fn')),
    creation_date: events.registration,
    updated_date: events['last changed'],
    expiration_date: events.expiration,
    org: published(getVCardValue(registrant, 'org')),
    country: Array.isArray(address) ? published(address[address.length - 1]) : undefined,
    name_servers: (data.nameservers || []).map(nameserver => nameserver.ldhName).filter(Boolean),
    status: data.status,
    dnssec: data.secureDNS ? (data.secureDNS.delegationSigned ? 'signed' : 'unsigned') : undefined
  };
}

// Only the registered domain is known to the registry (www.bbc.co.uk, then bbc.co.uk)
export async function lookupDomain(host) {
  const server = await getServerURL(host);
  if (!server) return null;

  const labels = host.toLowerCase().split('.');
  for (let i = 0; i <= labels.length - 2; i++) {
    const domain = labels.slice(i).join('.');
    const url = new URL(`domain/${domain}`, server).href;
    const res = await fetch(url, { headers: { Accept: 'application/rdap+json' }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    // Registries answer a subdomain with 404 or 400
    if (res.status === 404 || res.status === 400) continue;
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return { domain, url, record: getRecord(await res.json()) };
  }

  return null;
}
