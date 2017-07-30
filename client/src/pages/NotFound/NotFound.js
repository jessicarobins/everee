import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getSystemMessage, getPageIndex, LIST_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'

import AppBar from '../../components/AppBar/AppBar'
import BottomNav from '../../components/BottomNav/BottomNav'
import SystemMessage from '../../components/SystemMessage/SystemMessage'

import './NotFound.css'

class NotFound extends Component {

  componentDidMount() {
    this.props.appActions.changePage(LIST_INDEX)
  }

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <AppBar auth={this.props.auth} />
        </Paper>
        <div className="not-found-container container">
          <div className="huge-text">404</div>
          <h1>Uh oh. Something's gone wrong.</h1>
        </div>
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
    pageIndex: getPageIndex(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
