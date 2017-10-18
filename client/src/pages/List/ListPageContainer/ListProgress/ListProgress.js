import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import LinearProgress from 'material-ui/LinearProgress'

class ListProgress extends Component {

  renderProgress = () => {
    const { list } = this.props
    return (
      <Paper className="list-progress list-detail">
        <LinearProgress
          mode="determinate"
          value={list.percentComplete} />
        <div className="list-chips">
          <Chip>{list.percentComplete} %</Chip>
          <Chip>{list.fractionComplete.total} items</Chip>
        </div>
      </Paper>
    )
  }

  render() {
    if (this.props.list.items.length) {
      return this.renderProgress()
    }

    return null
  }
}

export default ListProgress