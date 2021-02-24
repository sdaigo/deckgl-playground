import * as React from 'react'
import DeckGL from '@deck.gl/react'
import { FlyToInterpolator } from '@deck.gl/core'
import { StaticMap } from 'react-map-gl'

import { Feature } from '@domain/feature'

import { createRoutesLayer } from './layers/routes'

interface Props {
  centerCoords: [number, number]
  features: Feature[]
}

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const INITIAL_VIEW_STATE = {
  longitude: 139.6214299,
  latitude: 35.4548166,
  zoom: 5,
  pitch: 60,
  bearing: 0,
  transitionDuration: 300,
  transitionInterpolator: new FlyToInterpolator(),
}

const Deck: React.FC<Props> = ({ centerCoords, features }) => {
  const [viewState, setViewState] = React.useState(INITIAL_VIEW_STATE)

  React.useEffect(() => {
    if (centerCoords) {
      setViewState({
        ...viewState,
        longitude: centerCoords[0],
        latitude: centerCoords[1],
      })
    }
  }, [centerCoords])

  return (
    <DeckGL
      initialViewState={viewState}
      layers={[
        createRoutesLayer({
          data: features,
        }),
      ]}
      controller
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        reuseMaps
        preventStyleDiffing={true}
      />
    </DeckGL>
  )
}

export default Deck
