import * as React from 'react'
import unfetch from 'isomorphic-unfetch'

import { Feature } from '@domain/feature'

import { styled } from '@components/foundations'

import DepartureSelect from './departure-select'
import Deck from './deck'

type CityLocation = Record<string, [number, number]>

const Container = styled.div``

const IndexPage: React.FC = () => {
  const [cityLocations, setCityLocations] = React.useState<CityLocation>({})
  const [city, setCity] = React.useState('')
  const [data, setData] = React.useState<{
    name: string
    type: string
    features: Feature[]
  }>({
    name: '',
    type: '',
    features: [],
  })

  const fetchData = async () => {
    const resp = await unfetch('/S10b-14_BetAport.geojson')
    const json = await resp.json()

    const cities = json.features.reduce((acc: CityLocation, item: Feature) => {
      return {
        ...acc,
        [item.properties.departure]: item.geometry.coordinates[0],
      }
    }, {})
    setCityLocations(cities)
    setData(json)
  }

  const handleChangeCity = (city: string) => {
    setCity(city)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container>
      <DepartureSelect
        cities={data.features.map(f => f.properties.departure)}
        onChange={handleChangeCity}
      />
      {data.features.length > 0 && (
        <Deck
          centerCoords={cityLocations[city]}
          features={data.features.filter(f =>
            city !== '' ? f.properties.departure === city : true
          )}
        />
      )}
    </Container>
  )
}

export default IndexPage
