import { describe, it, expect } from 'vitest';
import { strideTypes, linddunTypes, riskLevels, threatModelElementGroups, THREAT_SELECT_RELS, threatModelTableHTML, threatClassificationSentence, threatModelDefinitionHTML, threatTableRef, defaultThreatCaption, responseTypeGroups, responseTypeOf, RISK_ACCEPTANCE } from '../../src/threatModel.js';
import { normalizeHTML, cleanProseMirrorOutput } from '../../src/utils/normalization.js';
import Config from '../../src/config.js';

describe('threat model vocabulary', () => {
  it('offers the six STRIDE types as Wikidata entities', () => {
    const types = strideTypes();
    expect(types).toHaveLength(6);
    expect(types.map((t) => t.label)).toContain('Spoofing');
    expect(types.every((t) => t.value.startsWith('http://www.wikidata.org/entity/Q'))).toBe(true);
  });

  it('offers the seven LINDDUN types with their linddun.org anchors', () => {
    const types = linddunTypes();
    expect(types).toHaveLength(7);
    expect(types.find((t) => t.label === 'Non-repudiation').value).toBe('https://linddun.org/threat-types/#Nr');
    expect(types.find((t) => t.label === 'Non-compliance').value).toBe('https://linddun.org/threat-types/#Nc');
  });

  it('offers the seven DPV RISK levels', () => {
    const levels = riskLevels();
    expect(levels).toHaveLength(7);
    expect(levels.find((l) => l.label === 'Extremely High').value).toBe('https://w3id.org/dpv/risk#ExtremelyHigh');
    expect(levels.find((l) => l.label === 'Moderate').value).toBe('https://w3id.org/dpv/risk#Moderate');
  });

  it('groups all fifty threat-model elements by model', () => {
    const groups = threatModelElementGroups();
    expect(groups[0].options).toHaveLength(16);
    expect(groups[1].options).toHaveLength(34);
    expect(groups[0].options.find((o) => o.label === 'B1 Web Origin Boundary').value)
      .toBe('https://www.w3.org/TR/threat-model-web/#web-origin-boundary');
    expect(groups[1].options.find((o) => o.label === 'B1.8 Local Network Boundary').value)
      .toBe('https://www.w3.org/TR/threat-model-web/#local-network-boundary');
  });

  it('offers the four response types as groups, generic control first', () => {
    const groups = responseTypeGroups();
    expect(groups.map((g) => g.label)).toEqual(['Eliminate', 'Reduce', 'Transfer', 'Accept']);
    expect(groups[0].options[0]).toEqual({ value: 'https://w3id.org/dpv/risk#EliminationControl', label: 'Eliminate' });
    expect(groups[1].options.map((o) => o.label)).toEqual(['Reduce', 'Reduce (likelihood)', 'Reduce (severity)', 'Reduce (monitor)']);
    expect(groups[2].options[1]).toEqual({ value: 'https://w3id.org/dpv/risk#ShareRisk', label: 'Transfer (share)' });
    expect(groups[3].options).toEqual([{ value: RISK_ACCEPTANCE, label: 'Accept' }]);
  });

  it('keeps a recognized but uncurated control selectable under its type', () => {
    const groups = responseTypeGroups('https://w3id.org/dpv/risk#HaltSource');
    const reduce = groups.find((g) => g.label === 'Reduce');
    expect(reduce.options.at(-1)).toEqual({ value: 'https://w3id.org/dpv/risk#HaltSource', label: 'Reduce (halt source)' });
  });

  it('keeps an unrecognized term selectable without classifying it', () => {
    const groups = responseTypeGroups('https://example.org/vocab#Whatever');
    expect(groups[0].label).toBeUndefined();
    expect(groups[0].options).toEqual([{ value: 'https://example.org/vocab#Whatever', label: 'https://example.org/vocab#Whatever' }]);
    expect(groups).toHaveLength(5);
  });

  it('maps controls to their response type', () => {
    expect(responseTypeOf('https://w3id.org/dpv/risk#ReduceSeverity')).toBe('Reduce');
    expect(responseTypeOf('https://w3id.org/dpv/risk#ShareControl')).toBe('Transfer');
    expect(responseTypeOf(RISK_ACCEPTANCE)).toBe('Accept');
    expect(responseTypeOf('https://w3id.org/dpv/risk#High')).toBeNull();
  });
});

describe('threat model save conversion', () => {
  const makeTable = () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table" resource="#threats" id="threats" rel="schema:hasPart">
        <thead><tr>
          <th>Threat</th>
          <th><select data-select="threat-model-kind"><option selected="selected" value="stride">STRIDE type</option><option value="linddun">LINDDUN type</option></select></th>
          <th>Risk level</th>
        </tr></thead>
        <tbody>
          <tr typeof="dpv:Risk">
            <td property="dcterms:description">Description substitution. An attacker serves a fraudulent description.</td>
            <td><select data-select="threat-type"><option value=""></option><option selected="selected" value="http://www.wikidata.org/entity/Q11081100">Spoofing</option></select></td>
            <td><select data-select="risk-level"><option value=""></option><option selected="selected" value="https://w3id.org/dpv/risk#High">High</option></select></td>
          </tr>
          <tr typeof="dpv:Risk">
            <td property="dcterms:description">Description substitution. A second threat with the same first clause.</td>
            <td><select data-select="threat-type"><option value=""></option><option value="http://www.wikidata.org/entity/Q11081100">Spoofing</option></select></td>
            <td><select data-select="risk-level"><option value=""></option><option value="https://w3id.org/dpv/risk#High">High</option></select></td>
          </tr>
          <tr>
            <td></td>
            <td><select data-select="threat-type"><option value=""></option><option value="http://www.wikidata.org/entity/Q11081100">Spoofing</option></select></td>
            <td><select data-select="risk-level"><option value=""></option><option value="https://w3id.org/dpv/risk#High">High</option></select></td>
          </tr>
        </tbody>
      </table>`;
    return root;
  };

  it('converts chosen selects to anchors with their rels and drops unchosen ones', () => {
    const root = normalizeHTML(makeTable(), {});

    const anchors = root.querySelectorAll('tbody a');
    expect([...anchors].map((a) => a.getAttribute('rel'))).toEqual(['dpv:hasImpact', 'dpv:hasRiskLevel']);
    expect(anchors[0].getAttribute('href')).toBe('http://www.wikidata.org/entity/Q11081100');
    expect(anchors[0].textContent).toBe('Spoofing');
    expect(root.querySelector('select')).toBeNull();
  });

  it('turns the header select into the chosen title text', () => {
    const root = normalizeHTML(makeTable(), {});
    const th = root.querySelectorAll('th')[1];
    expect(th.textContent.trim()).toBe('STRIDE type');
  });

  it('removes rows whose only content was unchosen selects', () => {
    const root = normalizeHTML(makeTable(), {});
    expect(root.querySelectorAll('tbody tr')).toHaveLength(2);
  });

  it('mints readable risk subjects from the threat text, deduplicated', () => {
    const root = normalizeHTML(makeTable(), {});
    const rows = root.querySelectorAll('tr[typeof~="dpv:Risk"]');
    expect(rows[0].getAttribute('about')).toBe('#risk-description-substitution');
    expect(rows[0].getAttribute('id')).toBe('risk-description-substitution');
    expect(rows[1].getAttribute('about')).toBe('#risk-description-substitution-2');
  });

  it('moves the cell rel onto an anchor that already targets the resource', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <tbody><tr typeof="dpv:Risk">
          <td rel="dcterms:subject" resource="#feature-x"><p><a href="#feature-x">#feature-x</a></p></td>
          <td rel="dcterms:subject" resource="#other"><p><a href="#elsewhere">text</a></p></td>
        </tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    const cells = out.querySelectorAll('td');
    expect(cells[0].hasAttribute('rel')).toBe(false);
    expect(cells[0].hasAttribute('resource')).toBe(false);
    expect(cells[0].querySelector('a').getAttribute('rel')).toBe('dcterms:subject');

    expect(cells[1].getAttribute('resource')).toBe('#other');
    expect(cells[1].querySelector('a').hasAttribute('rel')).toBe(false);
  });

  it('renders an attribute-stated mitigation as the nested measure pattern', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <tbody><tr typeof="dpv:Risk">
          <td property="dcterms:description">Bad thing. Details.</td>
          <td rel="dpv:isMitigatedByMeasure" resource="#mitigation-bad-thing"><p>Do good.</p></td>
        </tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    const td = out.querySelector('td[rel="dpv:isMitigatedByMeasure"]');
    expect(td.hasAttribute('resource')).toBe(false);
    const span = td.querySelector('span');
    expect(span.getAttribute('about')).toBe('#mitigation-bad-thing');
    expect(span.getAttribute('id')).toBe('mitigation-bad-thing');
    expect(span.getAttribute('property')).toBe('dcterms:description');
    expect(span.getAttribute('typeof')).toBe('dpv:RiskMitigationMeasure');
    expect(span.textContent).toBe('Do good.');
  });

  it('strips table configuration attributes from the output', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table" data-subject="#x" data-about-url="#risk-{_slug_threat}">
        <thead><tr><th data-name="threat" data-titles="Threat" data-property-url="dcterms:description">Threat</th></tr></thead>
        <tbody><tr><td>Something</td></tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    expect(out.querySelector('[data-subject], [data-about-url], [data-name], [data-titles], [data-property-url]')).toBeNull();
    expect(out.querySelector('table').getAttribute('typeof')).toBe('schema:Table');
  });

  it('builds the classification sentence per the AC pattern', () => {
    const stride = threatTableRef(defaultThreatCaption('stride'), 'stride');
    const linddun = threatTableRef(defaultThreatCaption('linddun'), 'linddun');

    expect(stride.id).toBe('security-threats-and-responses');

    const strideOnly = threatClassificationSentence([stride]);
    expect(strideOnly).toContain('href="#security-threats-and-responses"');
    expect(strideOnly).toContain('>Security Threats</a> are classified by a');
    expect(strideOnly).toContain('STRIDE_model');
    expect(strideOnly).not.toContain('LINDDUN');

    const linddunOnly = threatClassificationSentence([linddun]);
    expect(linddunOnly).toContain('>Privacy Threats</a> are classified by a');
    expect(linddunOnly).toContain('linddun.org');

    const both = threatClassificationSentence([stride, linddun]);
    expect(both).toContain('STRIDE</a> threat type and');
    expect(both).toContain('>Privacy Threats</a> by a');

    expect(threatClassificationSentence([])).toBe('');
  });

  it('the definition paragraph carries the framework citations and risk sentence', () => {
    const html = threatModelDefinitionHTML([threatTableRef(defaultThreatCaption(), 'stride')]);
    expect(html).toContain('id="threat-model-definition"');
    expect(html).toContain('threat-model-web');
    expect(html).toContain('privacy-principles');
    expect(html).toContain('Each threat is assigned a risk level');
    expect(html).toContain('DPV-RISK');
    expect(html).toContain('href="https://www.w3.org/TR/threat-modeling-guide/#erta-threat-response-framework"');
    expect(html).toContain('ERTA Threat Response Framework</a>');
    expect(html).toContain('THREAT-MODELING-GUIDE');

    // Without tables, the classification sentence is simply absent.
    const bare = threatModelDefinitionHTML([]);
    expect(bare).not.toContain('Security Threats');
    expect(bare).toContain('Each threat is assigned');
  });

  it('renders a ready-to-edit threat table for section templates', () => {
    const root = document.createElement('div');
    root.innerHTML = threatModelTableHTML();

    const table = root.querySelector('table');
    expect(table.getAttribute('data-typeof')).toBe('dpv:Risk');
    expect(table.getAttribute('data-about-url')).toBe('#risk-{_slug_threat}');
    expect(root.querySelector('caption').textContent).toBe('Security Threats and Responses');

    const ths = root.querySelectorAll('th');
    expect(ths).toHaveLength(7);
    expect(ths[1].getAttribute('data-property-url')).toBe('dcterms:description');
    expect(ths[2].querySelector('select[data-select="threat-model-kind"] option[selected]').getAttribute('value')).toBe('stride');

    const typeSelect = root.querySelector('td select[data-select="threat-type"]');
    expect(typeSelect.getAttribute('data-framework')).toBe('stride');
    expect(typeSelect.querySelectorAll('option')).toHaveLength(7);
    expect(typeSelect.querySelector('option[value=""]').textContent).toBe('Select threat type');

    expect(root.querySelectorAll('td select[data-select="threat-element"] optgroup')).toHaveLength(2);
    expect(root.querySelectorAll('td select[data-select="risk-level"] option')).toHaveLength(8);
    expect(root.querySelectorAll('td select[data-select="response-type"] optgroup')).toHaveLength(4);
    expect(root.querySelector('td select[data-select="response-type"] option[value=""]').textContent).toBe('Select response type');
  });

  it('strips decoration classes and hint titles from the output', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <thead><tr><th class="table-identifier-column" title="Type an ISBN">ISBN</th></tr></thead>
        <tbody><tr class="table-lookup-pending"><td class="table-cell-active" title="Type an ISBN">9780262561006</td></tr></tbody>
      </table>`;
    const out = normalizeHTML(root, Config.DOMNormalisation);

    expect(out.querySelector('.table-cell-active, .table-identifier-column, .table-lookup-pending')).toBeNull();
    expect(out.querySelector('[title]')).toBeNull();
    expect(out.querySelector('td').textContent).toBe('9780262561006');
  });

  it('unwraps cell paragraphs even when editor widgets sit beside them', () => {
    const div = document.createElement('div');
    div.innerHTML = '<table><thead><tr><th><p>Title</p><button class="do table-sort">sort</button></th></tr></thead>'
      + '<tbody><tr><td><p>x</p></td></tr></tbody></table>';
    const out = cleanProseMirrorOutput(div);

    expect(out.querySelector('th p')).toBeNull();
    expect(out.querySelector('td p')).toBeNull();
    expect(out.querySelector('th').textContent).toContain('Title');
  });

  it('maps each select kind to its relation', () => {
    expect(THREAT_SELECT_RELS['threat-type']).toBe('dpv:hasImpact');
    expect(THREAT_SELECT_RELS['threat-element']).toBe('dcat:theme');
    expect(THREAT_SELECT_RELS['risk-level']).toBe('dpv:hasRiskLevel');
    expect(THREAT_SELECT_RELS['response-type']).toBe('rdf:type');
  });

  it('types the response resource from the response-type select and keeps the risk untyped', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <tbody><tr typeof="dpv:Risk">
          <td property="dcterms:description">Bad thing. Details.</td>
          <td><select data-select="response-type"><option value=""></option><option selected="selected" value="https://w3id.org/dpv/risk#ReduceLikelihood">Reduce</option></select></td>
          <td rel="dpv:isMitigatedByMeasure" resource="#response-bad-thing"><p>Do good.</p></td>
        </tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    const typeCell = out.querySelector('td[about="#response-bad-thing"]');
    const typeAnchor = typeCell.querySelector('a');
    expect(typeAnchor.getAttribute('rel')).toBe('rdf:type');
    expect(typeAnchor.getAttribute('href')).toBe('https://w3id.org/dpv/risk#ReduceLikelihood');
    expect(typeAnchor.textContent).toBe('Reduce');

    const span = out.querySelector('td[rel="dpv:isMitigatedByMeasure"] span');
    expect(span.getAttribute('about')).toBe('#response-bad-thing');
    expect(span.getAttribute('typeof')).toBe('dpv:RiskMitigationMeasure');
  });

  it('an Accept choice carries a risk acceptance instead of a mitigation measure', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <tbody><tr typeof="dpv:Risk">
          <td property="dcterms:description">Residual thing. Details.</td>
          <td><select data-select="response-type"><option value=""></option><option selected="selected" value="${RISK_ACCEPTANCE}">Accept</option></select></td>
          <td rel="dpv:isMitigatedByMeasure" resource="#response-residual-thing"><p>Lived with.</p></td>
        </tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    expect(out.querySelector('td[rel="dpv:isMitigatedByMeasure"]')).toBeNull();
    const td = out.querySelector('td[rel="risk:hasRiskAcceptance"]');
    const span = td.querySelector('span');
    expect(span.getAttribute('about')).toBe('#response-residual-thing');
    expect(span.getAttribute('typeof')).toBe('risk:RiskAcceptance');
    expect(span.getAttribute('property')).toBe('dcterms:description');
    expect(out.querySelector('td[about="#response-residual-thing"] a').getAttribute('rel')).toBe('rdf:type');
  });

  it('switching an Accept row back re-types its saved acceptance as a measure', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <tbody><tr typeof="dpv:Risk" about="#risk-residual-thing">
          <td property="dcterms:description">Residual thing. Details.</td>
          <td><select data-select="response-type"><option value=""></option><option selected="selected" value="https://w3id.org/dpv/risk#TransferControl">Transfer</option></select></td>
          <td rel="risk:hasRiskAcceptance"><p><span about="#response-residual-thing" id="response-residual-thing" property="dcterms:description" typeof="risk:RiskAcceptance">Now theirs.</span></p></td>
        </tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    const td = out.querySelector('td[rel="dpv:isMitigatedByMeasure"]');
    expect(td.querySelector('span').getAttribute('typeof')).toBe('dpv:RiskMitigationMeasure');
    expect(out.querySelector('td[rel="risk:hasRiskAcceptance"]')).toBeNull();
  });

  it('drops the rdf:type rel when the row has no response resource to type', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <table typeof="schema:Table">
        <tbody><tr typeof="dpv:Risk">
          <td property="dcterms:description">Bad thing. Details.</td>
          <td><select data-select="response-type"><option value=""></option><option selected="selected" value="https://w3id.org/dpv/risk#ReduceLikelihood">Reduce</option></select></td>
          <td rel="dpv:isMitigatedByMeasure" resource="#response-bad-thing"><p></p></td>
        </tr></tbody>
      </table>`;
    const out = normalizeHTML(root, {});

    const anchor = out.querySelector('tbody a[href="https://w3id.org/dpv/risk#ReduceLikelihood"]');
    expect(anchor.hasAttribute('rel')).toBe(false);
    expect(out.querySelector('td[about]')).toBeNull();
  });
});
