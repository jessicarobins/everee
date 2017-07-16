import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getList } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getSystemMessage } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'

import AppBar from '../../components/AppBar/AppBar'
import SystemMessage from '../../components/SystemMessage/SystemMessage'
import ListPageContainer from './ListPageContainer/ListPageContainer'

class List extends Component {

  constructor(props) {
    super(props)

    if (!props.list) {
      this.props.listActions.fetchList(props.match.params.id)
    }
  }

  render() {
    return (
      <div>
        <AppBar
          zDepth={2}
          logout={this.props.auth.logout} />
        { this.props.list &&
          <ListPageContainer list={this.props.list} />
        }
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
    message: getSystemMessage(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)
