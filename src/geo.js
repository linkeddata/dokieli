
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

