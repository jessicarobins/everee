import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getMyLists } from '../reducers/ListReducer'
import * as listActions from '../actions/ListActions'

import AppBar from '../components/AppBar/AppBar'
import CreateListForm from '../components/CreateListForm/CreateListForm'
import ListList from '../components/ListList/ListList'

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar logout={this.props.auth.logout} />
        <CreateListForm addList={this.props.listActions.addListRequest} />
        <ListList />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getMyLists(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
