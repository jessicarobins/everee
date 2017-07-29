import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getPaginatedLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getSystemMessage, getPageIndex, getMasonryLoading, EXPLORE_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'

import AppBar from '../../components/AppBar/AppBar'
import BottomNav from '../../components/BottomNav/BottomNav'
import ExploreTabs from '../../components/ExploreTabs/ExploreTabs'
import MasonryLayout from '../../components/MasonryLayout/MasonryLayout'
import SystemMessage from '../../components/SystemMessage/SystemMessage'

class Explore extends Component {

  componentDidMount() {
    this.props.appActions.changePage(EXPLORE_INDEX)
  }

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <AppBar auth={this.props.auth} />
        </Paper>
        <MasonryLayout
          isLoading={this.props.isLoading}
          fetchLists={this.props.listActions.fetchPaginatedLists}
          pushState={this.props.pushState}
          lists={this.props.lists} />
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
    lists: getPaginatedLists(state),
    message: getSystemMessage(state),
    pageIndex: getPageIndex(state),
    isLoading: getMasonryLoading(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
