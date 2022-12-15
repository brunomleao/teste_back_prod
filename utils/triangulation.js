const Beacon = require("../models/beaconModel");

class Point {
  #coordX = 0;
  #coordY = 0;

  Point() {}
  put(x, y) {
    this.#coordX = x;
    this.#coordY = y;
  }

  getX() {
    return this.#coordX;
  }

  getY() {
    return this.#coordY;
  }
}

class Triangulation {
  pointsList = [];
  distancesList = [0, 0, 0];

  yPointA1toA2() {
    // Formula que calcula a coordenada y do Ponto B usando apenas A1 e A2
    let dA1to2 = Math.pow(this.distancesList[0], 2);
    let dA2to2 = Math.pow(this.distancesList[1], 2);
    let y2to2 = Math.pow(this.pointsList[1].getY(), 2);
    let y2toX2 = 2 * this.pointsList[1].getY();
    if (y2toX2 == 0) {
      y2toX2 = 1;
    }
    let yb = (dA1to2 - dA2to2 + y2to2) / y2toX2;
    return yb;
  }
  xPointA1toA2() {
    // Formula que calcula a coordenada x do Ponto B usando apenas A1 e A2
    let dA1to2 = Math.pow(this.distancesList[0], 2);
    let yb = this.yPointA1toA2();
    let xb = Math.sqrt(Math.abs(dA1to2 - yb));
    return xb;
  }
  yPointA1toA3() {
    // Formula que calcula a coordenada x do Ponto B usando apenas A1 e A3
    let dA1to2 = Math.pow(this.distancesList[0], 2);
    let dA2to2 = Math.pow(this.distancesList[2], 2);
    let y2to2 = Math.pow(this.pointsList[2].getX(), 2);
    let y2toX2 = 2 * this.pointsList[2].getX();
    if (y2toX2 == 0) {
      y2toX2 = 1;
    }
    let yb = (dA1to2 - dA2to2 + y2to2) / y2toX2;
    return yb;
  }
  xPointA1toA3() {
    // Formula que calcula a coordenada y do Ponto B usando apenas A1 e A3
    let dA1to2 = Math.pow(this.distancesList[0], 2);
    let yb = this.yPointA1toA3();
    let xb = Math.sqrt(Math.abs(dA1to2 - yb));
    return xb;
  }

  putPoint(nr, x, y) {
    const _point = new Point();
    _point.put(x, y);
    this.pointsList[nr] = _point;
  }

  putDistance(nrPoint, distance) {
    this.distancesList[nrPoint] = distance;
  }

  pointXMedian() {
    let xMedian = (this.xPointA1toA2() + this.xPointA1toA3()) / 2;
    return xMedian;
  }

  pointYMedian() {
    let yMedian = (this.yPointA1toA2() + this.yPointA1toA3()) / 2;
    return yMedian;
  }

  Triangulation(yA1, xA3, distance1, distance2, distance3) {
    this.putPoint(0, 0, 0);
    this.putPoint(1, 0, yA1);
    this.putPoint(2, xA3, 0);
    this.putDistance(0, distance1);
    this.putDistance(1, distance2);
    this.putDistance(2, distance3);
  }
}

module.exports = { Triangulation };
