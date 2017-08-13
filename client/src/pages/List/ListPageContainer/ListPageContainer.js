import React, { Component } from 'react'

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
