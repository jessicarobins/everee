import React, { Component } from 'react'

import Chip from 'material-ui/Chip'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'

class ListProgress extends Component {

  renderProgress = () => {
    const { list } = this.props
    return (
      <Card className="list-progress">
        <CardHeader subtitle="Progress"/>
        <CardText>
          <LinearProgress
            style={{height: 10}}
            mode="determinate"
            value={list.percentComplete || 1} />
          <div className="list-chips">
            <Chip>{list.percentComplete}% complete</Chip>
            <Chip>{list.fractionComplete.total} items</Chip>
          </div>
        </CardText>
      </Card>
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