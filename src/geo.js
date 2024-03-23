
function getXPathValue(rootNode, xpathExpression, contextNode, namespaceResolver, resultType) {
  var xpathResult = evaluateXPath(rootNode, xpathExpression, contextNode, namespaceResolver, resultType);
// console.log(xpathResult);

  switch(xpathResult.resultType) {
    case 0:
    default: //ANY_TYPE
      return xpathResult;
    case 1: //NUMBER_TYPE
      return xpathResult.numberValue;
    case 2: //STRING_TYPE
      return xpathResult.stringValue;
    case 3: //BOOLEAN_TYPE
      return xpathResult.booleanValue;
  }
}

function getGPXActivityHTML(rootNode, contextNode, options) {
  options = options || {};
  var html = '';
  var data = {};

  data['minLat'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt/@lat[not(. > ../../gpx:trkpt/@lat)][1]", contextNode, null, 'NUMBER_TYPE');
  data['minLon'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt/@lon[not(. > ../../gpx:trkpt/@lon)][1]", contextNode, null, 'NUMBER_TYPE');
  data['maxLat'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt/@lat[not(. < ../../gpx:trkpt/@lat)][1]", contextNode, null, 'NUMBER_TYPE');
  data['maxLon'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt/@lon[not(. < ../../gpx:trkpt/@lon)][1]", contextNode, null, 'NUMBER_TYPE');

  data['minEle'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt/gpx:ele[not(. > ../../gpx:trkpt/gpx:ele)][1]", contextNode, null, 'NUMBER_TYPE');
  data['maxEle'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt/gpx:ele[not(. < ../../gpx:trkpt/gpx:ele)][1]", contextNode, null, 'NUMBER_TYPE');
// console.log(data['maxEle'])
// console.log(data['minEle'])


  //Works but data is not always available
  // data['minLat'] = getXPathValue(rootNode, "/gpx:gpx/gpx:metadata/gpx:bounds/@minlat", contextNode, null, 'NUMBER_TYPE');
  // data['minLon'] = getXPathValue(rootNode, "/gpx:gpx/gpx:metadata/gpx:bounds/@minlon", contextNode, null, 'NUMBER_TYPE');
  // data['maxLat'] = getXPathValue(rootNode, "/gpx:gpx/gpx:metadata/gpx:bounds/@maxlat", contextNode, null, 'NUMBER_TYPE');
  // data['maxLon'] = getXPathValue(rootNode, "/gpx:gpx/gpx:metadata/gpx:bounds/@maxlon", contextNode, null, 'NUMBER_TYPE');

  data['startDate'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt[1]/gpx:time", contextNode, null, 'STRING_TYPE');
  data['endDate'] = getXPathValue(rootNode, "/gpx:gpx/gpx:trk/gpx:trkseg/gpx:trkpt[last()]/gpx:time", contextNode, null, 'STRING_TYPE');

  data['metadataBounds'] = data.minLon + ',' + data.minLat + ',' + data.maxLon + ',' + data.maxLat;
  data['dataset'] = data.startDate + ',' + data.endDate + ',' + data.metadataBounds;
  data['centreLat'] = (data.minLat + data.maxLat) / 2.0;
  data['centreLon'] = (data.minLon + data.maxLon) / 2.0;

  data['metadataBoundsURL'] = `https://www.openstreetmap.org/?minlon=${data.minLon}&amp;minlat=${data.minLat}&amp;maxlon=${data.maxLon}&amp;maxlat=${data.maxLat}`;

// console.log(data.metadataTime);
// console.log(data.minLat)
// console.log(data.minLon)
// console.log(data.maxLat)
// console.log(data.maxLon)
// console.log(data.startDate)
// console.log(data.endDate)
// console.log(data.metadataBounds)
// console.log(data.dataset)
// console.log(data.centreLat)
// console.log(data.centreLon)


  var start = new Date(data['startDate']).getTime();
  var end = new Date(data['endDate']).getTime();
  var seconds = Math.floor((end - start) / 1000);
  var date = new Date(null);
  date.setSeconds(seconds);
  var utc = date.toUTCString();
  data['duration'] = utc.substr(utc.indexOf(':') - 2, 8)
// [${data.startDate} ~ ${data.endDate}]

  data['datasetPublisher'] = (Config.User.IRI) ? Config.User.IRI : null;


  var trksegContextNode = contextNode.querySelector('gpx trk trkseg');
// var trksegs = contextNode.querySelectorAll('gpx trk trkseg')
// console.log(trksegs);

  options['hrExists'] = getXPathValue(rootNode, "gpx:trkpt[1]/gpx:extensions/gpxtpx:TrackPointExtension/gpxtpx:hr", trksegContextNode, null, 'BOOLEAN_TYPE');

  var hrTH = '', hrDD = '', datasetPublisher = '';

  if (data['datasetPublisher']) {
    datasetPublisher = `
          <dl>
            <dt>Publisher</dt>
            <dd rel="dcterms:publisher">${getAgentHTML({'omitImage': true})}</dd>
          </dl>`;
  }

  //XXX: The user is not necessarily the performer of this activity! Is there a way to automatically find out?
  //TODO: as:origin, as:target
  var performedBy = '', performedByName = '';
  if (Config.User.IRI) {
    performedBy = `
          <dl rel="schema:hasPart" resource="#activity" typeof="as:Travel">
            <dt>Actor</dt>
            <dd rel="as:actor">${getAgentHTML()}</dd>
          </dl>`;
  }

  var tfootColSpan = 4;
  if (options['hrExists']) {
    tfootColSpan = 5;
    hrTH = `
          <th rel="qb:component" resource="#component/${data.dataset}/measure/heart-rate" typeof="qb:ComponentSpecification"><span rel="qb:componentProperty" resource="qudt-unit:HeartBeatsPerMinute" typeof="qb:MeasureProperty"><span property="skos:prefLabel" rel="rdfs:subPropertyOf" resource="sdmx-measure:obsValue">Heart rate</span></span></th>`;

    hrDD = `
              <dd><a href="http://qudt.org/vocab/unit#HeartBeatsPerMinute">Heart rate</a> (beats per minute)</dd>`;
  }

  var mapId = generateAttributeId();
  html = `
    <figure>
      <figcaption>Activity at <a href="https://render.openstreetmap.org/cgi-bin/export?bbox=${data.metadataBounds}&amp;scale=12000&amp;format=png&amp;layers=C">https://render.openstreetmap.org/cgi-bin/export?bbox=${data.metadataBounds}&amp;scale=12000&amp;format=png&amp;layers=C</a> .</figcaption>
      <div id="${mapId}" rel="schema:hasMap" resource="#${mapId}" typeof="schema:Map"></div>
      <details>
        <summary>More details about GPS and extension data</summary>
        <table id="cube/${data.dataset}">
          <caption>Activity at <a href="${data.metadataBoundsURL}">${data.metadataBounds}</a> .</caption>
          <thead about="#structure/${data.dataset}" id="structure/${data.dataset}" typeof="qb:DataStructureDefinition">
            <tr>
              <th rel="qb:component" resource="#component/${data.dataset}/dimension/time" typeof="qb:ComponentSpecification"><span rel="qb:componentProperty" resource="sdmx-dimension:timePeriod" typeof="qb:DimensionProperty"><span property="skos:prefLabel">Time Period</span></span></th>
              <th rel="qb:component" resource="#component/${data.dataset}/measure/latitude" typeof="qb:ComponentSpecification"><span rel="qb:componentProperty" resource="wgs:lat" typeof="qb:MeasureProperty"><span property="skos:prefLabel" rel="rdfs:subPropertyOf" resource="sdmx-measure:obsValue">Latitude</span></span></th>
              <th rel="qb:component" resource="#component/${data.dataset}/measure/longitude" typeof="qb:ComponentSpecification"><span rel="qb:componentProperty" resource="wgs:lon" typeof="qb:MeasureProperty"><span property="skos:prefLabel" rel="rdfs:subPropertyOf" resource="sdmx-measure:obsValue">Longitude</span></span></th>
              <th rel="qb:component" resource="#component/${data.dataset}/measure/altitude" typeof="qb:ComponentSpecification"><span rel="qb:componentProperty" resource="wgs:alt" typeof="qb:MeasureProperty"><span property="skos:prefLabel" rel="rdfs:subPropertyOf" resource="sdmx-measure:obsValue">Altitude</span></span></th>${hrTH}
            </tr>
          </thead>
          <tbody about="#dataset/${data.dataset}" id="dataset/${data.dataset}" typeof="qb:DataSet">` +
getGPXtrkptHTML(rootNode, trksegContextNode, data, options) + `
          </tbody>
          <tfoot>
            <tr>
              <td>
                <dl>
                  <dt>Distance</dt>
                  <dd>${roundValue(gpxTrkptDistance, 2)} km</dd>
                  <dt>Time</dt>
                  <dd><time>${data.duration}</time></dd>
                </dl>
              </td>
              <td>` +
createDateHTML({ 'id': 'dataset-published', 'property': 'schema:datePublished', 'title': 'Published' }) + datasetPublisher +
performedBy + `
              </td>
              <td about="#dataset/${data.dataset}" colspan="${tfootColSpan - 2}">
                <p>The <a href="#structure/${data.dataset}">structure</a> of the <a href="#dataset/${data.dataset}">dataset</a>:</p>

                <dl>
                  <dt>Dimensions</dt>
                  <dd><a href="http://purl.org/linked-data/sdmx/2009/dimension#timePeriod">Time</a> (ISO 8601)</dd>
                  <dt>Measures</dt>
                  <dd><a href="http://www.w3.org/2003/01/geo/wgs84_pos#lat">Latitude</a> (decimal degrees)</dd>
                  <dd><a href="http://www.w3.org/2003/01/geo/wgs84_pos#lon">Longitude</a> (decimal degrees)</dd>
                  <dd><a href="http://www.w3.org/2003/01/geo/wgs84_pos#alt">Altitude</a> (meters)</dd>${hrDD}
                </dl>
              </td>
            </tr>
          </tfoot>
        </table>
      </details>
    </figure>
`;
      // <img alt="" src="https://localhost:8443/proxy?uri=https://render.openstreetmap.org/cgi-bin/export?bbox=${data.metadataBounds}&amp;scale=12724&amp;format=svg&amp;layers=C" />
      // <object type="image/svg+xml" data="https://render.openstreetmap.org/cgi-bin/export?bbox=${data.metadataBounds}&amp;scale=12724&amp;format=svg&amp;layers=C"></object>

//TODO gpx/wpt, gpx/rte
// console.log(html)
  return html;
}

function getGPXtrkptHTML(rootNode, contextNode, data, options) {
  var html = '';
  var trkpt = getXPathValue(rootNode, "gpx:trkpt", contextNode, null, 'ORDERED_NODE_ITERATOR_TYPE');

  try {
    var xR = trkpt.iterateNext();
// console.log(xR)

    var lat1, lon1, lat2, lon2;
    gpxTrkptDistance = 0;

    while (xR) {
// console.log(xR)
      data['lat'] = getXPathValue(rootNode, "@lat", xR, null, 'NUMBER_TYPE');
      data['lon'] = getXPathValue(rootNode, "@lon", xR, null, 'NUMBER_TYPE');
      data['time'] = getXPathValue(rootNode, "gpx:time", xR, null, 'STRING_TYPE');
      // <!-- XXX: Is elevation value always present in GPX? -->
      data['ele'] = getXPathValue(rootNode, "gpx:ele", xR, null, 'NUMBER_TYPE');
      data['timePeriod'] = data.time.replace(/Z/, '');

      html += `
            <tr about="#dataset/${data.dataset}/${data.time};${data.lat},${data.lon};${data.ele}" typeof="qb:Observation">
              <td rel="sdmx-dimension:timePeriod" resource="gi:${data.timePeriod}">${data.time}</td>
              <td datatype="xsd:decimal" property="wgs:lat">${data.lat}</td>
              <td datatype="xsd:decimal" property="wgs:lon">${data.lon}</td>
              <td datatype="xsd:decimal" property="wgs:alt">${data.ele}</td>` +
((options['hrExists']) ? getGPXextensionsHTML(rootNode, xR, data, options) : '') + `
              <td rel="qb:dataSet" resource="#dataset/${data.dataset}"></td>
            </tr>`;

      if (typeof lat1 !== 'undefined' && typeof lon1 !== 'undefined') {
        gpxTrkptDistance = gpxTrkptDistance + calculateDistance(lat1, lon1, data['lat'], data['lon']);
      }
      lat1 = data['lat'];
      lon1 = data['lon'];

      xR = trkpt.iterateNext();
    }

    gpxTrkptDistance = gpxTrkptDistance + calculateDistance(lat1, lon1, data['lat'], data['lon']);
  }
  catch (e) {
    console.log('Error: Document tree modified during iteration ' + e);
  }

  return html;
}

function getGPXextensionsHTML(rootNode, contextNode, data, options) {
  var extensionsContextNode = contextNode.querySelector('extensions');
  return getGPXTrackPointExtensionhrHTML(rootNode, extensionsContextNode, data, options);
}

function getGPXTrackPointExtensionhrHTML(rootNode, contextNode, data, options) {
  var hr =  getXPathValue(rootNode, "gpxtpx:TrackPointExtension/gpxtpx:hr", contextNode, null, 'NUMBER_TYPE');
  var html = `
          <td property="qudt-unit:HeartBeatsPerMinute" datatype="xsd:nonNegativeInteger">` + hr + `</td>`;

  return html;
}

function namespaceMap(prefix) {
  var ns = {
    'xhtml' : 'http://www.w3.org/1999/xhtml',
    'mathml': 'http://www.w3.org/1998/Math/MathML',
    'gpx': 'http://www.topografix.com/GPX/1/1',
    'gpxx': 'http://www.garmin.com/xmlschemas/GpxExtensions/v3',
    'gpxtpx': 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1'
  };
  return ns[prefix] || 'http://www.topografix.com/GPX/1/1';
}

// function normalisePath(xpathExpression) {
//   return xpathExpression.replace(/\//g, '/gpx:');
// },

function evaluateXPath(rootNode, xpathExpression, contextNode, namespaceResolver, resultType, result) {
  rootNode = rootNode || document;
  // xpathExpression = normalisePath(xpathExpression);
// console.log(xpathExpression)
  contextNode = contextNode || document;
  namespaceResolver = (typeof namespaceResolver == 'function') ? namespaceResolver : namespaceMap;
  // namespaceResolver = document.createNSResolver( contextNode.ownerDocument == null ? contextNode.documentElement : contextNode.ownerDocument.documentElement );
// console.log(namespaceResolver)
  resultType = XPathResult[resultType] || XPathResult.ANY_TYPE;
  // result = result || null;
// console.log(xpathExpression);
// console.log(contextNode);
// console.log(namespaceResolver);
// console.log(resultType);
// console.log(result);
  return rootNode.evaluate(xpathExpression, contextNode, namespaceResolver, resultType);
}

//From https://stackoverflow.com/a/21623206
function calculateDistance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function roundValue(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

