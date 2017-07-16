import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'
import Avatar from 'material-ui/Avatar'

import ListItems from '../../../components/ListItems/ListItems'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    return (
      <div className="list-page-container container">
        <Paper className="list-name list-detail">
          <div>
            I want to {this.props.list.name}
          </div>
          {
            this.props.list._users.map(user => {
              return <Avatar key={user} src={user.picture} />
            })
          }
        </Paper>
        <Paper className="list-progress list-detail">
          <LinearProgress
            mode="determinate"
            value={this.props.list.percentComplete} />
        </Paper>
        <ListItems
          list={this.props.list} />
      </div>
    )
  }
}

export default ListPageContainer
