import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getSystemMessage, getPageIndex, getShowSpinner } from '../reducers/AppReducer'
import * as appActions from '../actions/AppActions'
import { isAuthenticated, getUser } from '../reducers/UserReducer'
import * as userActions from '../actions/UserActions'

import AppBar from '../components/AppBar/AppBar'
import BottomNav from '../components/BottomNav/BottomNav'
import SystemMessage from '../components/SystemMessage/SystemMessage'
import Progress from '../components/Progress/Progress'

class Page extends Component {

  constructor(props) {
    super(props)
    props.userActions.doAuthentication()
  }

  componentWillUnmount() {
   this.props.userActions.removeLockListeners()
  }

  renderAppBar = () => {
    return (
      <AppBar
        user={this.props.user}
        authenticated={this.props.isAuthenticated}
        appBarStyle={this.props.appBarStyle}
        login={this.props.userActions.login}
        logout={this.props.userActions.logout} />
    )
  }

  render() {
    const {
      children,
      topPaper,
      hideTopPaper,
      hideBottomBar,
      className
    } = this.props

    return (
      <div className={className}>
        { !hideTopPaper ?
          <Paper zDepth={2}>
            {this.renderAppBar()}
            {topPaper}
          </Paper> : this.renderAppBar()
        }
        {children}
        { !hideBottomBar &&
          <BottomNav
            changePage={this.props.pushState}
            index={this.props.pageIndex} />
        }
        <SystemMessage
          addMessage={this.props.appActions.addMessage}
          message={this.props.message} />
        <Progress displayed={this.props.spinner} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: getSystemMessage(state),
    pageIndex: getPageIndex(state),
    spinner: getShowSpinner(state),
    isAuthenticated: isAuthenticated(state),
    user: getUser(state)
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
