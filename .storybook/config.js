import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import { GlobalStyles } from '../src/webapp/styling/global'
import { theme } from '../src/webapp/styling/theme'

const GlobalStylesDecorator = storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
)
const ThemeDecorator = storyFn => <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>

addDecorator(GlobalStylesDecorator)
addDecorator(ThemeDecorator)

configure(require.context('../src', true, /\.stories\.tsx$/), module)
