import React from 'react'
import { Global, css } from '@emotion/core'

const fonts = css`
  html,
  body {
    font-family: Heebo, sans-serif;
    font-size: 18px;
  }
`

export const GlobalStyles = () => <Global styles={[fonts]} />
