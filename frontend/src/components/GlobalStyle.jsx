import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { FONT_SIZES, NAV_HEIGHT } from './style-constants'

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    /* Offsets fixed navbar */
    padding-top: ${NAV_HEIGHT}px;
    font-size: ${FONT_SIZES.BASE};
    box-sizing: border-box;
    * {
      box-sizing: border-box;
      &:before, &:after {
        box-sizing: border-box;
      }
    }
  }
`
