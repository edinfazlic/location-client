import { Feature, Overlay } from 'ol';
import { Point } from 'ol/geom';
import { Vector } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import { OSM, Vector as sourceVector } from 'ol/source';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import View from 'ol/View';

export default class MapHelper {

  public static createMap(elementId: string, view: View): Map {
    return new Map({
      target: elementId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view,
    });
  }

  public static createView(): View {
    return new View({
      projection: 'EPSG:4326',
      center: [12.48292818260617, 41.894855491672004],
      zoom: 14,
    });
  }

  public static createPopup(elementId: string): Overlay {
    const container = document.getElementById(elementId);

    return new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
  }

  public static createClickPoint(clickPoint: Point): VectorLayer {
    return this.createPointLayer(clickPoint, 'gold');
  }

  public static createHighlightPoint(clickPoint: Point): VectorLayer {
    return this.createPointLayer(clickPoint, 'black');
  }

  private static createPointLayer(clickPoint: Point, fillColor: string): VectorLayer {
    return new Vector({
      source: new sourceVector({
        features: [
          new Feature({
            geometry: clickPoint,
          }),
        ],
      }),
      style: MapHelper.pointStyle(fillColor),
    });
  }

  public static createLocationsLayer(): VectorLayer {
    return new Vector({
      source: new sourceVector(),
      style: MapHelper.pointStyle(),
    });
  }

  private static pointStyle(fillColor: string = 'white'): Style {
    return new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: fillColor,
        }),
        stroke: new Stroke({
          color: '#ff5858',
          width: 2,
        }),
      }),
    });
  }
}
