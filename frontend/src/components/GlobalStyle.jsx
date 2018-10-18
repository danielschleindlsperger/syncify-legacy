import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    box-sizing: border-box;
    * {
      box-sizing: border-box;
      &:before, &:after {
        box-sizing: border-box;
      }
    }
  }
`
