import * as React from 'react'
import DeckGL from '@deck.gl/react'
import { StaticMap } from 'react-map-gl'

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const INITIAL_VIEW_STATE = {
  longitude: 139.6214299,
  latitude: 35.4548166,
  zoom: 12,
  pitch: 60,
  bearing: 0,
}

const Deck: React.FC = () => {
  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller>
      <StaticMap
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
      />
    </DeckGL>
  )
}

export default Deck
