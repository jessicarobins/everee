import React from 'react'

import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import ReactGA from 'react-ga'

import reducers from './reducers'

import Analytics from './components/Analytics/Analytics'
import Callback from './pages/Callback/Callback'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import List from './pages/List/List'
import Explore from './pages/Explore/Explore'
import NotFound from './pages/NotFound/NotFound'

ReactGA.initialize('UA-105322123-1', {
  debug: process.env.NODE_ENV === 'development'
})

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')

  middleware.push(logger)
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)

export function isAuthenticated() {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return (new Date().getTime() < expiresAt)
}

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Analytics>
          <Switch>
            <Route exact path="/" render={(props) => (
                !isAuthenticated() ? (
                  <Redirect to="/login"/>
                ) : (
                  <Home {...props} />
                )
              )} />
            <Route path="/login" render={(props) => (
                isAuthenticated() ? (
                  <Redirect to="/" />
                ) : (
                  <Login {...props} />
                )
              )} />
            <Route path="/list/:id" component={List} />
            <Route exact path="/explore" render={() => <Redirect to="/explore/recent" />} />
            <Route
              path="/explore/recent"
              render={(props) => <Explore tab='recent' {...props} />} />
            <Route
              path="/explore/popular"
              render={(props) => <Explore tab='popular' {...props} />} />
            <Route
              path="/explore/complete"
              render={(props) => <Explore tab='complete' {...props} />} />
            <Route path="/callback" component={Callback} />
            <Route component={NotFound} />
          </Switch>
        </Analytics>
      </ConnectedRouter>
     </Provider>
  )
}

export default makeMainRoutes