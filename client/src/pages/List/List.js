import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getList, canEditList } from '../../reducers/ListReducer'
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

  render() {
    return (
      <Page>
        { this.showListContainer() &&
          <ListPageContainer
            authenticated={this.props.isAuthenticated}
            cloneList={() => this.props.listActions.cloneListRequest(this.props.list.id)}
            canEdit={this.props.canEdit}
            addMessage={this.props.appActions.addMessage}
            addListItem={this.props.listActions.addListItemRequest}
            deleteListItem={this.props.listActions.deleteListItemRequest}
            toggleListItem={this.props.listActions.toggleListItemRequest}
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
    spinner: getShowSpinner(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)
