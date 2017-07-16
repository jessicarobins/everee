import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Paper from 'material-ui/Paper'

import { getMyLists } from '../reducers/ListReducer'
import * as listActions from '../actions/ListActions'
import { getSystemMessage } from '../reducers/AppReducer'
import * as appActions from '../actions/AppActions'

import AppBar from '../components/AppBar/AppBar'
import CreateListForm from '../components/CreateListForm/CreateListForm'
import ListList from '../components/ListList/ListList'
import SystemMessage from '../components/SystemMessage/SystemMessage'

class Home extends Component {
  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <AppBar
            logout={this.props.auth.logout} />
          <CreateListForm
            addList={this.props.listActions.addListRequest} />
        </Paper>
        <ListList
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
    message: getSystemMessage(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
