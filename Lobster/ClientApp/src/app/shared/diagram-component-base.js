"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiagramComponentBase = /** @class */ (function () {
    function DiagramComponentBase() {
        this.elements = [];
        this._zoom = 1.0;
    }
    Object.defineProperty(DiagramComponentBase.prototype, "zoom", {
        get: function () { return this._zoom; },
        enumerable: true,
        configurable: true
    });
    DiagramComponentBase.prototype.setZoom = function (zoom) {
        this._zoom = zoom;
        var mapWidth = 0;
        var mapHeight = 0;
        // Apply zoom to locations
        this.elements.forEach(function (e) {
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
    };
    DiagramComponentBase.prototype.zoomOut = function () {
        this.setZoom(this._zoom - 0.2);
    };
    DiagramComponentBase.prototype.zoomIn = function () {
        this.setZoom(this._zoom + 0.2);
    };
    DiagramComponentBase.prototype.trackByIndex = function (index, item) {
        return index;
    };
    return DiagramComponentBase;
}());
exports.DiagramComponentBase = DiagramComponentBase;
var ElementVM = /** @class */ (function () {
    function ElementVM(element) {
        this.element = element;
    }
    return ElementVM;
}());
exports.ElementVM = ElementVM;
//# sourceMappingURL=diagram-component-base.js.map