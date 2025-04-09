import { Layer, Source } from 'react-map-gl';
import { useMemo, useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Map, MapPopup, MapControls } from 'src/components/map';

// ----------------------------------------------------------------------

const countiesLayer = (theme) => ({
  id: 'counties',
  type: 'fill',
  'source-layer': 'original',
  paint: {
    'fill-outline-color': theme.palette.grey[900],
    'fill-color': theme.palette.grey[900],
    'fill-opacity': 0.12,
  },
});

const highlightLayer = (theme) => ({
  id: 'counties-highlighted',
  type: 'fill',
  source: 'counties',
  'source-layer': 'original',
  paint: {
    'fill-outline-color': theme.palette.error.main,
    'fill-color': theme.palette.error.main,
    'fill-opacity': 0.48,
  },
});

export function MapHighlightByFilter({ sx, ...other }) {
  const theme = useTheme();

  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback((event) => {
    const county = event.features && event.features[0];

    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: county && county.properties?.COUNTY,
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';

  const filter = useMemo(() => ['in', 'COUNTY', selectedCounty], [selectedCounty]);

  return (
    <Map
      initialViewState={{ latitude: 38.88, longitude: -98, zoom: 3 }}
      minZoom={2}
      onMouseMove={onHover}
      interactiveLayerIds={['counties']}
      sx={sx}
      {...other}
    >
      <MapControls />

      <Source type="vector" url="mapbox://mapbox.82pkq93d">
        <Layer beforeId="waterway-label" {...countiesLayer(theme)} />
        <Layer beforeId="waterway-label" {...highlightLayer(theme)} filter={filter} />
      </Source>

      {selectedCounty && hoverInfo && (
        <MapPopup longitude={hoverInfo.longitude} latitude={hoverInfo.latitude} closeButton={false}>
          <Typography variant="body2">{selectedCounty}</Typography>
        </MapPopup>
      )}
    </Map>
  );
}
