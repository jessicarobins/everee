import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { getList, canEditList } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getSystemMessage, getPageIndex, LIST_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'

import AppBar from '../../components/AppBar/AppBar'
import BottomNav from '../../components/BottomNav/BottomNav'
import SystemMessage from '../../components/SystemMessage/SystemMessage'
import ListPageContainer from './ListPageContainer/ListPageContainer'

class List extends Component {

  constructor(props) {
    super(props)

    if (!props.list) {
      this.props.listActions.fetchList(props.match.params.id)
    }
  }

  componentDidMount() {
    this.props.appActions.changePage(LIST_INDEX)
  }

  render() {
    return (
      <div>
        <AppBar
          zDepth={2}
          auth={this.props.auth} />
        { this.props.list &&
          <ListPageContainer
            authenticated={this.props.auth.isAuthenticated()}
            cloneList={() => this.props.listActions.cloneListRequest(this.props.list.id)}
            canEdit={this.props.canEdit}
            addMessage={this.props.appActions.addMessage}
            addListItem={this.props.listActions.addListItemRequest}
            deleteListItem={this.props.listActions.deleteListItemRequest}
            toggleListItem={this.props.listActions.toggleListItemRequest}
            list={this.props.list} />
        }
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

function mapStateToProps(state, props) {
  return {
    list: getList(state, props.match.params.id),
    canEdit: canEditList(state),
    message: getSystemMessage(state),
    pageIndex: getPageIndex(state)
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
