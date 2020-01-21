import * as _ from "lodash";
import { DiagramModel } from "../models/diagram.model";

export abstract class DiagramComponentBase<T extends DiagramModel> {
  constructor() {
  }

  public elements: ElementVM<T>[] = [];

  private _zoom: number = 1.0;
  public get zoom(): number { return this._zoom; }
  public mapWidth: number;
  public mapHeight: number;

  public setZoom(zoom: number) {
    this._zoom = zoom;
    let mapWidth = 0;
    let mapHeight = 0;

    // Apply zoom to locations
    this.elements.forEach(e => {
      e.zoomX = e.element.x * zoom;
      e.zoomY = e.element.y * zoom;
      e.zoomW = e.element.w * zoom;
      e.zoomH = e.element.h * zoom;

      if ((e.zoomX + e.zoomW) > mapWidth) {
        mapWidth = (e.zoomX + e.zoomW);
      }
      if ((e.zoomY + e.zoomH) > mapHeight) {
        mapHeight = (e.zoomY + e.zoomH);
      }
    });

    // Update map size
    this.mapWidth = mapWidth + (50 * zoom);
    this.mapHeight = mapHeight + (50 * zoom);
  }

  public zoomOut() {
    this.setZoom(this._zoom - 0.2);
  }

  public zoomIn() {
    this.setZoom(this._zoom + 0.2);
  }

  public trackByIndex(index: number, item: any): number {
    return index;
  }
}

export class ElementVM<T extends DiagramModel> {
  constructor(public element: T) { }
  zoomX: number;
  zoomY: number;
  zoomW: number;
  zoomH: number;
}
