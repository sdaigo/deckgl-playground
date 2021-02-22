import * as React from 'react'

import { styled } from '@components/foundations'

import Deck from './deck'

interface Props {}

const Container = styled.div``

const IndexPage: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Deck />
    </Container>
  )
}

export default IndexPage
