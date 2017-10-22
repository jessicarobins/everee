import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { getList, canEditList, getMyRelevantList } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { LIST_INDEX, getShowSpinner } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'
import { isAuthenticated } from '../../reducers/UserReducer'

import Page from '../Page'

import ListPageContainer from './ListPageContainer/ListPageContainer'

class List extends Component {

  constructor(props) {
    super(props)
    this.props.appActions.showSpinner()
  }

  componentDidMount() {
    this.props.appActions.changePage(LIST_INDEX)
    this.fetchList(this.props.match.params.id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchList(nextProps.match.params.id)
    }
  }

  fetchList = (id) => {
    this.props.listActions.fetchList(id)
  }

  showListContainer = () => {
    return this.props.list && !this.props.spinner
  }

  handleChangeList = list => {
    this.props.pushState(`/list/${list._id}`)
  }

  pageTitle = () => {
    const { list } = this.props
    return list ? list.fullName : 'a bucket list for completionists'
  }

  render() {
    return (
      <Page>
        <Helmet>
          <title>everee &mdash; {this.pageTitle()}</title>
        </Helmet>
        { this.showListContainer() &&
          <ListPageContainer
            myRelevantList={this.props.myRelevantList}
            handleChangeList={this.handleChangeList}
            authenticated={this.props.isAuthenticated}
            cloneList={() => this.props.listActions.cloneListRequest(this.props.list.id)}
            canEdit={this.props.canEdit}
            addMessage={this.props.appActions.addMessage}
            addListItem={this.props.listActions.addListItemRequest}
            deleteListItem={this.props.listActions.deleteListItemRequest}
            toggleListItem={this.props.listActions.toggleListItemRequest}
            addListLink={this.props.listActions.addListLinkRequest}
            removeListLink={this.props.listActions.removeListLinkRequest}
            list={this.props.list} />
        }
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticated(state),
    list: getList(state),
    canEdit: canEditList(state),
    myRelevantList: getMyRelevantList(state),
    spinner: getShowSpinner(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)
