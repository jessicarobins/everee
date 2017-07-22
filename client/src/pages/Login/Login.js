import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import RaisedButton from 'material-ui/RaisedButton'

import ListTypist from '../../components/ListTypist/ListTypist'

import { getDemoLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'

class Login extends Component {

  render() {
    return (
      <div>
        <ListTypist
          lists={this.props.demoLists}
          fetchDemoLists={this.props.listActions.fetchDemoLists} />
        <RaisedButton
          onClick={() => this.props.auth.login()}
          label='Login with Google'
          primary={true} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    demoLists: getDemoLists(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(listActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
