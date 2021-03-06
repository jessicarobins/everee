import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
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
      <IconButton
        onTouchTap={(e) => this.deleteListItem(e, item)}>
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
    const styles = {
      fill: this.props.muiTheme.palette.accent1Color
    }

    return (
      <Checkbox
        iconStyle={styles}
        disabled={!this.props.canEdit}
        defaultChecked={item.complete} />
    )
  }

  render() {

    if( this.props.list.items.length) {
      return (
        <Paper className='list-items-container'>
          <List>
            {
              _.map(this.props.list.items, (item, index) => {
                const listItemProps = {
                  leftCheckbox: this.checkbox(item),
                  primaryText: item.text
                }

                if (this.props.canEdit) {
                  Object.assign(listItemProps, {
                    rightIconButton: this.deleteButton(item),
                    onTouchTap: () => this.toggleListItem(item)
                  })
                }

                return (
                  <div key={index}>
                    <ListItem {... listItemProps} />
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

export default muiThemeable()(ListItems)
