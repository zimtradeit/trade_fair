import { useState, useCallback } from 'react';

import { Map, MapControls } from 'src/components/map';

import { MapControlPanel } from './control-panel';

// ----------------------------------------------------------------------

export function MapInteraction({ sx, ...other }) {
  const [settings, setSettings] = useState({
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85,
    dragPan: true,
    boxZoom: true,
    keyboard: true,
    touchZoom: true,
    dragRotate: true,
    scrollZoom: true,
    touchPitch: true,
    touchRotate: true,
    doubleClickZoom: true,
    touchZoomRotate: true,
  });

  const updateSettings = useCallback((name, value) => {
    setSettings((prevSettings) => ({ ...prevSettings, [name]: value }));
  }, []);

  return (
    <Map
      {...settings}
      initialViewState={{
        latitude: 37.729,
        longitude: -122.36,
        zoom: 11,
        bearing: 0,
        pitch: 50,
      }}
      sx={sx}
      {...other}
    >
      <MapControls />

      <MapControlPanel settings={settings} onChange={updateSettings} />
    </Map>
  );
}
