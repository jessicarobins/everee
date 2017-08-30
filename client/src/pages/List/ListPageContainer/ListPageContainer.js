import React, { Component } from 'react'

import {Card, CardTitle, CardMedia, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'

import Sharebar from '../../../components/Sharebar/Sharebar'
import ListItems from '../../../components/ListItems/ListItems'
import CreateListItemForm from '../../../components/CreateListItemForm/CreateListItemForm'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    const { list } = this.props
    const styles = {
      cardText: {
        fontSize: '1em'
      }
    }

    const cardTitle = <CardTitle titleStyle={styles.cardText} title={`I want to ${list.name}`} />
    return (
      <div className="list-page-container container">
        <Card className="list-name">
          <CardText>
            {
              list._users.map(user => {
                return <Avatar key={user} src={user.picture} />
              })
            }
          </CardText>
          {
            !!list.image ?
            <CardMedia
              overlay={cardTitle}>
              <img className="list-image" src={list.image} alt="" />
            </CardMedia> :
            cardTitle
          }
        </Card>
        <Paper className="list-progress list-detail">
          <LinearProgress
            mode="determinate"
            value={list.percentComplete} />
          <div className="list-chips">
            <Chip>{list.percentComplete} %</Chip>
            <Chip>{list.fractionComplete.total} items</Chip>
          </div>
        </Paper>
        {
          this.props.canEdit &&
          <Paper className="list-item-form list-detail">

            <CreateListItemForm
              addMessage={this.props.addMessage}
              addListItem={this.props.addListItem}
              list={list} />
          </Paper>
        }
        {
          !this.props.canEdit && this.props.authenticated &&
            <Paper className="list-detail">
              <div className="clone-list-container">
                <div className="do-this-too">Want to do this too?</div>
                <RaisedButton
                  onClick={this.props.cloneList}
                  label="Clone this list"
                  secondary={true} />
              </div>
            </Paper>
        }
        <Sharebar className="list-detail" />
        <ListItems
          canEdit={this.props.canEdit}
          deleteListItem={this.props.deleteListItem}
          toggleListItem={this.props.toggleListItem}
          list={list} />
      </div>
    )
  }
}

export default ListPageContainer
