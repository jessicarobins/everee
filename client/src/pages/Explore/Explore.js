import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { getPaginatedLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import {
  getExploreTab,
  getMasonryLoading,
  getOutOfPages,
  getShowSpinner,
  EXPLORE_INDEX,
  POPULAR_TAB,
  COMPLETE_TAB } from '../../reducers/AppReducer'
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

  renderMasonry = () => {
    const masonryProps = {
      isOutOfPages: this.props.isOutOfPages,
      isLoading: this.props.isLoading,
      pushState: this.props.pushState,
      lists: this.props.lists,
      spinner: this.props.spinner,
      tab: this.props.tab
    }

    if (this.props.tab === COMPLETE_TAB) {
      masonryProps.fetchLists = (page) => this.props.listActions.fetchPaginatedLists(page, {complete: true})
    }
    else {
      masonryProps.fetchLists = this.props.listActions.fetchPaginatedLists
    }

    return <MasonryLayout {...masonryProps} />
  }

  handleChangeTab = (tab) => {
    this.props.appActions.showSpinner()
    this.props.appActions.changeTab(tab)
  }

  render() {
    return (
      <Page>
        <Tabs
          tab={this.props.tab}
          changeTab={this.handleChangeTab}
          picture={this.props.user.picture}
          logout={this.props.userActions.logout} />
        {this.renderMasonry()}
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getPaginatedLists(state),
    isLoading: getMasonryLoading(state),
    isOutOfPages: getOutOfPages(state),
    spinner: getShowSpinner(state),
    tab: getExploreTab(state),
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
