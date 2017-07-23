import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import AppBar from '../../components/AppBar/AppBar'
import LoginHero from './LoginHero/LoginHero'
import About from './About/About'

import { getDemoLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'

import './Login.css'

class Login extends Component {

  render() {
    return (
      <div className="login-page">
        <AppBar auth={this.props.auth} appBarStyle={{position: 'fixed', top: 0}} />
        <LoginHero
          auth={this.props.auth}
          lists={this.props.demoLists}
          fetchDemoLists={this.props.listActions.fetchDemoLists} />
        <About />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    demoLists: getDemoLists(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
