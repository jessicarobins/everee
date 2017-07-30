import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getSystemMessage, getPageIndex, LIST_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'

import Page from '../Page'

import './NotFound.css'

class NotFound extends Component {

  componentDidMount() {
    this.props.appActions.changePage(LIST_INDEX)
  }

  render() {
    return (
      <Page>
        <div className="not-found-container container">
          <div className="huge-text">404</div>
          <h1>Uh oh. Something's gone wrong.</h1>
        </div>
      </Page>
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
