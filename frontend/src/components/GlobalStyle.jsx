import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    /* Offsets fixed navbar */
    padding-top: 50px;
    font-size: 15px;
    box-sizing: border-box;
    * {
      box-sizing: border-box;
      &:before, &:after {
        box-sizing: border-box;
      }
    }
  }
`
