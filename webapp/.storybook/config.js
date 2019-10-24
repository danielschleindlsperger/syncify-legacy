import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import { GlobalStyles } from '../src/styling/global'

console.log(preset)

const GlobalStylesDecorator = storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
)
const ThemeDecorator = storyFn => <ThemeProvider theme={preset}>{storyFn()}</ThemeProvider>

addDecorator(GlobalStylesDecorator)
addDecorator(ThemeDecorator)

configure(require.context('../src', true, /\.stories\.tsx$/), module)
