class dummy {
  constructor(lat, lng) {
    this.lat = lat
    this.lng = lng

    this.object = new positionObject(this.lat, this.lng)
  }

  getPosition() {
    return this.object
  }
}

class positionObject {
  constructor(lat, lng) {
    this.la = lat
    this.lo = lng
  }

  lat() {
    return this.la
  }

  lng() {
    return this.lo
  }
}

export {dummy}