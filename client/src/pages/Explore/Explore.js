import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { getPaginatedLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getMasonryLoading, getOutOfPages, EXPLORE_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'
import { getUser } from '../../reducers/UserReducer'
import * as userActions from '../../actions/UserActions'

import Page from '../Page'
import Tabs from './Tabs/Tabs'

import MasonryLayout from '../../components/MasonryLayout/MasonryLayout'

class Explore extends Component {

  componentDidMount() {
    this.props.appActions.changePage(EXPLORE_INDEX)
  }

  render() {
    return (
      <Page>
        <Tabs
          picture={this.props.user.picture}
          logout={this.props.userActions.logout} />
        <MasonryLayout
          isOutOfPages={this.props.isOutOfPages}
          isLoading={this.props.isLoading}
          fetchLists={this.props.listActions.fetchPaginatedLists}
          pushState={this.props.pushState}
          lists={this.props.lists} />
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getPaginatedLists(state),
    isLoading: getMasonryLoading(state),
    isOutOfPages: getOutOfPages(state),
    user: getUser(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Explore)
