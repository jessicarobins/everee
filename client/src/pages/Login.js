import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'

class Login extends Component {

  render() {
    return (
      <div>
        Login page!!
        <RaisedButton
          onClick={() => this.props.auth.login()}
          label='Login with Google'
          primary={true} />
      </div>
    )
  }
}

export default Login
