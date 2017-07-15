import auth0 from 'auth0-js'
import createHistory from 'history/createBrowserHistory'

import api from './Api'

const history = createHistory({
  forceRefresh: true
})

export default class Auth {

  auth0 = new auth0.WebAuth({
    audience: 'http://everee-jrobins.c9users.io:8081/api',
    domain: 'jrobins.auth0.com',
    clientID: 'rwFEnmblzq90XMcfNAjxRzcLd6T4HCOM',
    redirectUri: 'http://everee-jrobins.c9users.io:8080/callback',
    responseType: 'token id_token',
    scope: 'openid profile read:lists'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        history.replace('/login')
        console.log(err)
      }
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    const scopes = authResult.scope || this.requestedScopes || ''

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('scopes', JSON.stringify(scopes))

    api('users/login')
      .then(response => {
        console.log(response)
        // navigate to the home route
        history.replace('/')
      })
      .catch(err => {
        history.replace('/login')
      })
  }

  logout() {
    // navigate to the home route
    history.replace('/login')

    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return accessToken
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  userHasScopes(scopes) {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ')
    return scopes.every(scope => grantedScopes.includes(scope))
  }
}
