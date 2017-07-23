import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {lightblue700, lightblue500, lightBlue100, deepPurpleA200, deepPurpleA400, deepPurpleA700} from 'material-ui/styles/colors'

import Routes from './routes'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightblue500,
    primary2Color: lightblue700,
    primary3Color: lightBlue100,
    accent1Color: deepPurpleA400,
    accent2Color: deepPurpleA200,
    accent3Color: deepPurpleA700
  }
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()