import styled from 'styled-components'
import { FONT_SIZES } from './style-constants'

export const HeadlineLarge = styled.h1`
  font-size: ${FONT_SIZES.LARGE};
  font-weight: 600;
`
export const HeadlineMedium = styled.h2`
  font-size: ${FONT_SIZES.MEDIUM};
  font-weight: 600;
`

export const HeadlineSmall = styled.h3`
  font-size: ${FONT_SIZES.SMALL};
  font-weight: 600;
`

export const HeadlineNormal = styled.h4`
  font-size: ${FONT_SIZES.BASE};
  font-weight: 600;
`

export const Text = styled.span`
  font-size: ${FONT_SIZES.BASE};
  font-weight: normal;
`
