import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

import ListItems from '../../../components/ListItems/ListItems'
import CreateListItemForm from '../../../components/CreateListItemForm/CreateListItemForm'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    const { list } = this.props

    return (
      <div className="list-page-container container">
        <Paper className="list-name list-detail">
          <div>
            I want to {list.name}
          </div>
          <div className="list-users">
            {
              list._users.map(user => {
                return <Avatar key={user} src={user.picture} />
              })
            }
          </div>
        </Paper>
        <Paper className="list-progress list-detail">
          <LinearProgress
            mode="determinate"
            value={list.percentComplete} />
          <div className="list-chips">
            <Chip>{list.percentComplete} %</Chip>
            <Chip>{list.fractionComplete.total} items</Chip>
          </div>
        </Paper>
        <Paper className="list-item-form list-detail">
          <CreateListItemForm
            addMessage={this.props.addMessage}
            addListItem={this.props.addListItem}
            list={list} />
        </Paper>
        <ListItems
          deleteListItem={this.props.deleteListItem}
          toggleListItem={this.props.toggleListItem}
          list={list} />
      </div>
    )
  }
}

export default ListPageContainer
