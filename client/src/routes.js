import React from 'react'

import createHistory from 'history/createBrowserHistory'
import { Route, Redirect } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'

import Home from './pages/Home'
import Login from './pages/Login'
import Progress from './components/Progress/Progress'
import Auth from './services/Auth'

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
            return <Progress {...props} />
          }}/>
        </div>
      </ConnectedRouter>
     </Provider>
  )
}

export default makeMainRoutes