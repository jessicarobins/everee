import React, { Component } from 'react'

import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'

import * as _ from 'lodash'

import './ListList.css'

class ListList extends Component {

  componentDidMount() {
    this.props.getLists()
  }

  renderListItem(item) {
    return (
      <div className="list-item">
        {item.name}
        <Chip>
          {item.percentComplete} %
        </Chip>
      </div>
    )
  }

  render() {

    return (
      <div className='container'>
        <Paper className='list-list-container'>
          <List>
            <Subheader>I want to...</Subheader>
            {
              _.map(this.props.lists, (list, index) => {
                return (
                  <div key={index}>
                    <ListItem primaryText={this.renderListItem(list)} />
                    {(index !== this.props.lists.length-1) && <Divider />}
                  </div>
                )
              })
            }
          </List>
        </Paper>
      </div>
    )
  }
}

export default ListList
