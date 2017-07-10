import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Home from './pages/Home'
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme, createPalette } from 'material-ui/styles'
import lime from 'material-ui/colors/lime'
import green from 'material-ui/colors/green'
import pink from 'material-ui/colors/pink'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

const theme = createMuiTheme({
  palette: createPalette({
    primary: green,
    accent: lime,
    error: pink,
  })
})

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
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={App}/>
          <Route path="/home" component={Home}/>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
