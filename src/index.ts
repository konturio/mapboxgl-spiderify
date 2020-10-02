import { MapBoxMapInstance, Point, Leg, Spider, SpiderifyOptions } from './types';
import { generateSpiderElement } from './renderers/domRenderer';
import { generateMarker } from './renderers/mapBoxRenderer';
import { Renderer } from './renderer';

const renderer = new Renderer({
  markerGenerator: generateMarker,
  DOMGenerator: generateSpiderElement,
});

export interface MapboxglSpiderify {
  init: (map: MapBoxMapInstance) => void;
  addSpider: (point: Point, legs: Leg[]) => void;
  removeSpider: (point?: Point) => void;
}

export function mapboxglSpiderify(options: SpiderifyOptions): MapboxglSpiderify {
  let spiders: Spider[] = [];
  const refresh = () => renderer.render(spiders, options);

  return {
    init(map: MapBoxMapInstance) {
      renderer.setMap(map);
    },
    addSpider(point: Point, legs: Leg[], onClick?: (e: MouseEvent, leg: Leg) => void ) {
      spiders.push({
        id: point.toString(),
        position: point,
        legs,
        onClick
      });
      refresh();
    },
    removeSpider(point?: Point) {
      if (point) {
        spiders = spiders.filter(spider => spider.id !== point.toString());
      } else {
        spiders = [];
      }
      refresh();
    },
  }
}