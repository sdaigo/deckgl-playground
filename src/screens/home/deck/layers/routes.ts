import AnimatedArcLayer from './animated-arc-layer'

import { Feature } from '@domain/feature'

function mapRange(
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1)
}

export const createRoutesLayer = ({ data }: { data: Feature[] }) => {
  const highestFrequency = Math.max(...data.map(d => d.properties.frequency))
  const highestDistance = Math.max(...data.map(d => d.properties.distance))

  return new AnimatedArcLayer({
    id: 'routes',
    data,
    getSourcePosition: d => d.geometry.coordinates[0],
    getTargetPosition: d => d.geometry.coordinates[1],
    getSourceColor: d => [
      255,
      92,
      mapRange(d.properties.frequency, 0, 255, 0, highestFrequency),
    ],
    getTargetColor: d => [
      255,
      92,
      mapRange(d.properties.distance, 0, 255, 0, highestDistance),
    ],
    getWidth: 2.0,
  })
}
