import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import LoginHero from './LoginHero/LoginHero'

import { getDemoLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'

class Login extends Component {

  render() {
    return (
      <LoginHero
        auth={this.props.auth}
        lists={this.props.demoLists}
        fetchDemoLists={this.props.listActions.fetchDemoLists} />
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
