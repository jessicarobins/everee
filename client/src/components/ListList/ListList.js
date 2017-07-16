import React, { Component } from 'react'

import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'

import * as _ from 'lodash'

import './ListList.css'

class ListList extends Component {

  componentDidMount() {
    this.props.getLists()
  }

  render() {

    return (
      <div className='container'>
        <Paper className='list-list-container'>
          <List>
            {
              _.map(this.props.lists, (list, index) => {
                return (
                  <div key={index}>
                    <ListItem  primaryText={list.name} />
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
