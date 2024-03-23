
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

