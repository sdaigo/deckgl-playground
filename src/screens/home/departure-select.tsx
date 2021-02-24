import * as React from 'react'
import { uniq } from 'ramda'
import Select, { ValueType } from 'react-select'

import { styled } from '@components/foundations'

interface Props {
  cities: string[]
  onChange: (value: string) => void
}

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  width: 320px;
  background-color: ${({ theme }) => theme.color.neutral[800]};
  padding: ${({ theme }) => theme.spacing(1)};
`

const Label = styled.label`
  padding: ${({ theme }) => theme.spacing(0.5, 0)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.color.white};
`

interface SelectOption {
  value: string
  label: string
}

const DepartureSelect: React.FC<Props> = ({ cities, onChange }) => {
  const handleChange = (option: ValueType<SelectOption, false>) => {
    onChange(option ? option.value : '')
  }
  return (
    <Container>
      <Label>出発地</Label>
      <Select
        options={uniq(cities.map(c => ({ value: c, label: c })))}
        onChange={handleChange}
        isClearable
      />
    </Container>
  )
}

export default DepartureSelect
