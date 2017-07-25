import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import registerServiceWorker from './registerServiceWorker'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Routes from './routes'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00a9f4',
    primary2Color: '#B3E5FC',
    accent1Color: '#651fff',
    accent2Color: '#a255ff',
    accent3Color: '#0100ca'
  }
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Routes />
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()