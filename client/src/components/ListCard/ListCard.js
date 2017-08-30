import React, { Component } from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'

import './ListCard.css'

class ListCard extends Component {

  handleClickList = () => {
    this.props.pushState(`/list/${this.props.list._id}`)
  }

  handleCloneList = () => {
    this.props.cloneList(this.props.list)
  }

  render() {
    const { list, hideProgress, header} = this.props

    const numItems = list.items.length
    const title = list.fullName || `${list.verb} every ${list.action}`
    const subtitle = `${numItems} item${numItems === 1 ? '' : 's'}`
    return (
      <Card className="list-card">
        {
          header ? header(title, subtitle, list.count) :
          <CardMedia
            overlay={<CardTitle title={title} subtitle={subtitle} />}>
            <img className="list-card-image" src={list.image} alt="" />
          </CardMedia>
        }
        { !hideProgress &&
          <CardText>
            <LinearProgress mode="determinate" value={list.percentComplete} />
          </CardText>
        }
        {
          !!list.items.length && <CardText className="list-card-text">
          {
            list.items.map( (item, index) => {
              return `${item.text}${index === list.items.length - 1 ? '' : ', '}`
            })
          }
          </CardText>
        }
        <CardActions>
        {
          !this.props.hideClone && <FlatButton label="Copy" secondary={true} onClick={this.handleCloneList} />
        }
        {
          !this.props.hideGo && <FlatButton label="Go!" secondary={true} onClick={this.handleClickList} />
        }
        </CardActions>
      </Card>
    )
  }
}

export default ListCard
