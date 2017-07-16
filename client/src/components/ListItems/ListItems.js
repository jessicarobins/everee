import React, { Component } from 'react'

import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'

import * as _ from 'lodash'

class ListItems extends Component {

  render() {

    return (
      <Paper className='list-items-container'>
        <List>
          {
            _.map(this.props.list.items, (item, index) => {
              return (
                <div key={index}>
                  <ListItem
                    leftCheckbox={<Checkbox />}
                    primaryText={item.text} />
                  {(index !== this.props.list.items.length-1) && <Divider />}
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
