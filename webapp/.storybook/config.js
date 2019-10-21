import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

console.log(preset)

const ThemeDecorator = storyFn => <ThemeProvider theme={preset}>{storyFn()}</ThemeProvider>

addDecorator(ThemeDecorator)

configure(require.context('../src', true, /\.stories\.tsx$/), module)
