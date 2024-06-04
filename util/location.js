const mapKey = `rYWfBM6824oQQYi9PgV82gIOBaj2MJPt1tpgMH6BOeU`;
const polyline =
  "BGm6h0sDqv49tBlH6DnQ4I_dwM_EoB3IUUvMA3InB_JrE3hBzFzjBnBvHrOsOrTwWzKsO_OgU7kBk1B_T0U3S0ZsT4iDwCwMgFkXsJ8fwMgyBUgFoBgK4D0ZwCgPsEgZkDwRkD8Q4DsTsEoa4DkX8BwMwH8VwHkXoGoVsEoQ4DoLsEgKsE8G4D0UgFsYoB8GoB8GoBoGsJkwBsY09D8G8kB0P8xC4S4iDwHsnBoBoGoB8GoBoGoBoGoG8f8BgKwMw";


export function getMapPreview(volLat, volLng, donLat, donLng) {
  // const imagePreviewUri = `https://www.mapquestapi.com/staticmap/v5/map?key=${mapKey}&size=600,400@2x&start=${volLat},${volLng}&end=${donLat},${donLng}&zoom=11`;
  // console.log(imagePreviewUri);
  // return imagePreviewUri;

  const imagePreviewUri = `https://image.maps.hereapi.com/mia/v3/base/mc/overlay:padding=64/800x400/png?apiKey=${mapKey}&overlay=point:${volLat},${volLng};label=Departure|${donLat},${donLng};label=Arrival|size=large;text-color=%23972E2B;text-outline-color=%23FFF;outline-width=2&overlay=line:${polyline}&features=pois:disabled&style=lite.day&scaleBar=km`;
  console.log(imagePreviewUri);
  return imagePreviewUri;
  // Create a new Image element
  // const mapImage = new Image();

  // Set the source URL of the image to the constructed static map URL
  // mapImage.src = imagePreviewUri;
}

