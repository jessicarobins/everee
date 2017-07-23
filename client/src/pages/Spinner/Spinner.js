import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getShowSpinner } from '../../reducers/AppReducer'

import Progress from '../../components/Progress/Progress'

class Spinner extends Component {

  render() {
    return <Progress displayed={this.props.showSpinner} />
  }
}

function mapStateToProps(state, props) {
  return {
    showSpinner: getShowSpinner(state)
  }
}

export default connect(mapStateToProps)(Spinner)
