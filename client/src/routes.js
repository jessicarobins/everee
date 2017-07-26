import React from 'react'

import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import List from './pages/List/List'
import Explore from './pages/Explore/Explore'
import Callback from './pages/Callback/Callback'
import Spinner from './pages/Spinner/Spinner'

import Auth from './services/Auth'

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

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/login"/>
              ) : (
                <Home auth={auth} {...props} />
              )
            )} />
          <Route path="/login" render={(props) => (
              auth.isAuthenticated() ? (
                <Redirect to="/"/>
              ) : (
                <Login auth={auth} {...props} />
              )
            )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props)
            return <Callback {...props} />
          }}/>
          <Route path="/list/:id" render={(props) => (
            <List auth={auth} {...props} />
          )}/>
          <Route path="/explore" render={(props) => (
            <Explore auth={auth} {...props} />
          )}/>
          <Spinner />
        </div>
      </ConnectedRouter>
     </Provider>
  )
}

export default makeMainRoutes