import React, { Component } from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'

import './ListCard.css'

class ListCard extends Component {

  handleClickList = () => {
    this.props.pushState(`/list/${this.props.list._id}`)
  }

  render() {
    const { list } = this.props

    return (
      <Card className="list-card">
        <CardTitle title={list.fullName} subtitle={`${list.fractionComplete.denominator} items`} />
        <CardText>
          <LinearProgress mode="determinate" value={list.percentComplete} />
        </CardText>
        <CardText>
        {
          list.items.map( (item, index) => {
            return `${item.text}${index === list.items.length - 1 ? '' : ', '}`
          })
        }
        </CardText>
        <CardActions>
          <FlatButton label="Go!" onClick={this.handleClickList} />
        </CardActions>
      </Card>
    )
  }
}

export default ListCard