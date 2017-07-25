import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import ListList from '../ListList/ListList'

class ListListCard extends Component {

  render() {
    return (
      <Paper className="list-card">
        <ListList
          displayFullName={true}
          max={5}
          subheaderText={this.props.subheaderText}
          getLists={this.props.fetchLists}
          handleChangeList={this.props.handleChangeList}
          lists={this.props.lists} />
        <RaisedButton
          fullWidth={true}
          label='Explore More'
          secondary={true} />
      </Paper>
    )
  }
}

export default ListListCard