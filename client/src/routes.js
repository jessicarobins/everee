import React from 'react'

import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { Switch } from 'react-router-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import Callback from './pages/Callback/Callback'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import List from './pages/List/List'
import Explore from './pages/Explore/Explore'
import Spinner from './pages/Spinner/Spinner'
import NotFound from './pages/NotFound/NotFound'

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
  return !!localStorage.getItem('id_token')
}

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
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
          <Route path="/explore" component={Explore} />
          <Route path="/callback" component={Callback} />
          <Route component={NotFound} />
          <Spinner />
        </Switch>
      </ConnectedRouter>
     </Provider>
  )
}

export default makeMainRoutes