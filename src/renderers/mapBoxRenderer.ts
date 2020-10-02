import mapboxgl from 'mapbox-gl';
import { SpiderifyOptions, SpiderElement } from '../types'

export function generateMarker(
  { position, element }: SpiderElement,
  options: SpiderifyOptions
) {
  const marker = new mapboxgl.Marker(element).setLngLat(position);
  return marker;
}