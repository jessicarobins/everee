import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getMyLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getSystemMessage, getShowAddEmptyList } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'

import AppBar from '../../components/AppBar/AppBar'
import CreateListForm from '../../components/CreateListForm/CreateListForm'
import ListList from '../../components/ListList/ListList'
import SystemMessage from '../../components/SystemMessage/SystemMessage'

class Home extends Component {

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <AppBar
            logout={this.props.auth.logout} />
          <CreateListForm
            showAddEmptyList={this.props.showAddEmptyList}
            toggleAddEmptyList={this.props.appActions.toggleAddEmptyList}
            addMessage={this.props.appActions.addMessage}
            addList={this.props.listActions.addListRequest} />
        </Paper>
        <ListList
          setList={this.props.listActions.setList}
          pushState={this.props.pushState}
          lists={this.props.lists}
          getLists={this.props.listActions.fetchLists} />
        <SystemMessage
          addMessage={this.props.appActions.addMessage}
          message={this.props.message} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getMyLists(state),
    message: getSystemMessage(state),
    showAddEmptyList: getShowAddEmptyList(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
