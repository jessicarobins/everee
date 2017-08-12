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
    const { list, hideProgress, header} = this.props

    const numItems = list.items.length
    const title = list.fullName || `${list.verb} every ${list.action}`
    return (
      <Card className="list-card">
        <div>
          {
            header && header()
          }
          <CardTitle
            title={title}
            subtitle={`${numItems} item${numItems === 1 ? '' : 's'}`} />
        </div>
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
          <FlatButton label="Go!" secondary={true} onClick={this.handleClickList} />
        </CardActions>
      </Card>
    )
  }
}

export default ListCard