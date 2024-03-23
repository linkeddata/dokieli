
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

