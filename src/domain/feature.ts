export interface Feature {
  geometry: {
    coordinates: [[number, number], [number, number]]
    type: string
  }
  properties: {
    departure: string
    arrival: string
    distance: number
    frequency: number
    passengers: number
    freight: number
  }
}
