import React, { Component } from 'react'

import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import * as _ from 'lodash'

import './ListList.css'

class ListList extends Component {

  componentDidMount() {
    if (this.props.getLists) {
      this.props.getLists()
    }
  }

  renderListItem(item) {
    return (
      <div className="list-item">
        {item.name}
        {
          this.props.showPercentComplete &&
          <Chip>
            {item.percentComplete} %
          </Chip>
        }
      </div>
    )
  }

  render() {

    const { lists, max, avatar } = this.props

    const displayLists = max ? _.take(lists, max) : lists



    return (
      <List>
        {
          this.props.subheaderText &&
          <Subheader>{this.props.subheaderText}</Subheader>
        }
        {
          _.map(displayLists, (list, index) => {
           const listItemProps = {
              onClick: () => this.props.handleChangeList(list),
              primaryText: this.renderListItem(list)
            }

            if (avatar) {
              listItemProps.leftAvatar = <Avatar src={list._users[0].picture} />
            }

            return (
              <div key={index}>
                <ListItem {...listItemProps} />
                {(index !== displayLists.length-1) && <Divider />}
              </div>
            )
          })
        }
      </List>
    )
  }
}

export default ListList
