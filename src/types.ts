export type MapBoxMapInstance = any;
export type Point = [number, number];
export type Leg = { id: string | number, value: string | number };

export interface Marker {
  remove: () => void;
  addTo: (map: any) => void
};

export interface Spider {
  id: string;
  position: Point;
  legs: Leg[];
  onClick?: (e: MouseEvent, leg: Leg) => void;
}

export interface SpiderElement {
  position: Point;
  element: HTMLElement;
}

export interface SpiderifyOptions {
  legLength?: number;
  markerDiameter?: number;
}

export type MarkerGenerator = (spiderElement: SpiderElement, options: SpiderifyOptions) => Marker;
export type DOMGenerator = (spider: Spider, options: SpiderifyOptions) => SpiderElement;