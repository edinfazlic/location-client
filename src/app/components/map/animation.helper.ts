import { View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';

export default class AnimationHelper {

  private static ANIMATION_DURATION = 1000;
  private static ZOOM_EXTENT_PADDING = 40;

  public static zoomTo(view: View, layer: VectorLayer): void {
    const extent = layer.getSource().getExtent();
    view.fit(extent, {
      duration: this.ANIMATION_DURATION,
      padding: [this.ZOOM_EXTENT_PADDING, this.ZOOM_EXTENT_PADDING, this.ZOOM_EXTENT_PADDING, this.ZOOM_EXTENT_PADDING],
    });
  }

  public static flyTo(view: View, coordinate: Coordinate): void {
    this.moveTo(view, coordinate);
    this.jump(view);
  }

  private static moveTo(view: View, coordinate: Coordinate): void {
    view.animate({
      center: coordinate,
      duration: this.ANIMATION_DURATION,
    });
  }

  private static jump(view: View): void {
    const zoom = view.getZoom();
    view.animate({
      zoom: zoom - 1, // todo: zoom out depending on the distance?
      duration: this.ANIMATION_DURATION / 2,
    }, {
      zoom,
      duration: this.ANIMATION_DURATION / 2,
    });
  }
}
