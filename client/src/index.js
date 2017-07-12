import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import Home from './pages/Home'
import Login from './pages/Login'

import registerServiceWorker from './registerServiceWorker'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Home}/>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker()
