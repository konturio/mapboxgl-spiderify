import { SpiderifyOptions, SpiderElement, MapBoxMapInstance, Marker, Spider, MarkerGenerator, DOMGenerator } from './types'

export class Renderer {
  private mapInstance: MapBoxMapInstance | null = null;
  private markersOnMap: Marker[] = [];

  constructor( public readonly engines: { markerGenerator: MarkerGenerator, DOMGenerator: DOMGenerator } ) {}

  public setMap(map: MapBoxMapInstance): void {
    this.mapInstance = map;
  }

  public render(spiders: Spider[], options: SpiderifyOptions): void {
    if (this.mapInstance === null) throw new Error('[Spiderify] Set map before render');

    /* 1. Clear prev render */
    while (this.markersOnMap.length > 0) {
      (this.markersOnMap.pop() as Marker).remove();
    }

    /* 2. Generate DOM elements */
    const spidersElements: SpiderElement[] = spiders
      .map(spider => this.engines.DOMGenerator(spider, options));

    /* 3. Generate markers */
    const spidersMarkers: Marker[] = spidersElements
      .map(spiderElement => this.engines.markerGenerator(spiderElement, options));

    /* 4. Attach to map */
    spidersMarkers.forEach((marker) => {
      marker.addTo(this.mapInstance);
      this.markersOnMap.push(marker);
    });
  }
}