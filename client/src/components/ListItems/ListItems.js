import React, { Component } from 'react'

import {grey400} from 'material-ui/styles/colors'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'

import * as _ from 'lodash'

class ListItems extends Component {

  deleteListItem(e, item) {
    e.preventDefault()
    e.stopPropagation()
    this.props.deleteListItem({
      id: this.props.list._id,
      list_item_id: item._id
    })
  }

  deleteButton = (item) => {
    return (
      <IconButton onClick={(e) => this.deleteListItem(e, item)}>
        <DeleteIcon color={grey400} />
      </IconButton>
    )
  }

  toggleListItem(item) {
    this.props.toggleListItem({
      listId: this.props.list._id,
      listItemId: item._id
    })
  }

  checkbox(item) {
    return (
      <Checkbox defaultChecked={item.complete} />
    )
  }

  render() {

    if( this.props.list.items.length) {
      return (
        <Paper className='list-items-container'>
          <List>
            {
              _.map(this.props.list.items, (item, index) => {
                return (
                  <div key={index}>
                    <ListItem
                      onTouchTap={() => this.toggleListItem(item)}
                      rightIconButton={this.deleteButton(item)}
                      leftCheckbox={this.checkbox(item)}
                      primaryText={item.text} />
                    {(index !== this.props.list.items.length-1) && <Divider inset={true} />}
                  </div>
                )
              })
            }
          </List>
        </Paper>
      )
    }

    return null
  }
}

export default ListItems
