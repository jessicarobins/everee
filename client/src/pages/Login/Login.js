import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import AppBar from '../../components/AppBar/AppBar'
import LoginHero from './LoginHero/LoginHero'
import About from './About/About'
import Explore from './Explore/Explore'
import HowDoesItWork from './HowDoesItWork/HowDoesItWork'

import { getDemoLists, getRecentLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import * as userActions from '../../actions/UserActions'

import './Login.css'

class Login extends Component {

  render() {
    return (
      <div className="login-page">
        <AppBar
          doAuthentication={this.props.userActions.doAuthentication}
          login={this.props.userActions.login}
          auth={this.props.auth}
          appBarStyle={{position: 'fixed', top: 0}} />
        <LoginHero
          auth={this.props.auth}
          lists={this.props.demoLists}
          fetchDemoLists={this.props.listActions.fetchDemoLists} />
        <About />
        <HowDoesItWork />
        <Explore
          fetchLists={this.props.listActions.fetchRecentLists}
          pushState={this.props.pushState}
          lists={this.props.recentLists} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    demoLists: getDemoLists(state),
    recentLists: getRecentLists(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch),
    pushState: bindActionCreators(push, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
