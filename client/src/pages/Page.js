import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getSystemMessage, getPageIndex, getShowSpinner } from '../reducers/AppReducer'
import * as appActions from '../actions/AppActions'
import * as userActions from '../actions/UserActions'

import AppBar from '../components/AppBar/AppBar'
import BottomNav from '../components/BottomNav/BottomNav'
import SystemMessage from '../components/SystemMessage/SystemMessage'

class Page extends Component {

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <AppBar
            doAuthentication={this.props.userActions.doAuthentication}
            login={this.props.userActions.login}
            logout={this.props.userActions.logout}
            auth={this.props.auth} />
          {this.props.topPaper}
        </Paper>
        {this.props.children}
        <BottomNav
          changePage={this.props.pushState}
          index={this.props.pageIndex} />
        <SystemMessage
          addMessage={this.props.appActions.addMessage}
          message={this.props.message} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: getSystemMessage(state),
    pageIndex: getPageIndex(state),
    spinner: getShowSpinner(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    pushState: bindActionCreators(push, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Page)
