import React, { Component } from 'react'
import Auth from '../services/Auth'

import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {

  constructor(props) {
    super(props)

    this.auth = new Auth()
  }

  render() {
    return (
      <div>
        Login page!!
        <RaisedButton
          onClick={() => this.auth.login()}
          label='Login with Google'
          primary={true} />
      </div>
    )
  }
}

export default Login
