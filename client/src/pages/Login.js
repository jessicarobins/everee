import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {
  render() {
    return (
      <div>
        Login page!!
        <RaisedButton
          href='/auth/google'
          label='Login with Google'
          primary={true} />
      </div>
    )
  }
}

export default Login
