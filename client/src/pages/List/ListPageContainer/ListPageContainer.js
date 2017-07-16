import React, { Component } from 'react'

import Paper from 'material-ui/Paper'

import ListItems from '../../../components/ListItems/ListItems'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    return (
      <div className="list-page-container container">
        <Paper className="list-name list-detail">
          I want to {this.props.list.name}
        </Paper>
        <ListItems
          list={this.props.list} />
      </div>
    )
  }
}

export default ListPageContainer
