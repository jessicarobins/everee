import React, { Component } from 'react'

import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'

import * as _ from 'lodash'

class ListItems extends Component {

  deleteButton = () => {
    return (
      <IconButton>
        <DeleteIcon />
      </IconButton>
    )
  }

  toggleListItem(item) {
    this.props.toggleListItem({
      listId: this.props.list._id,
      listItemId: item._id
    })
  }

  render() {

    return (
      <Paper className='list-items-container'>
        <List>
          {
            _.map(this.props.list.items, (item, index) => {
              return (
                <div key={index}>
                  <ListItem
                    onClick={() => this.toggleListItem(item)}
                    rightIconButton={this.deleteButton()}
                    leftCheckbox={<Checkbox defaultChecked={item.complete} />}
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
}

export default ListItems
