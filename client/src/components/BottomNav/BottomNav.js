import React, { Component } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import ListIcon from 'material-ui/svg-icons/action/list'
import ExploreIcon from 'material-ui/svg-icons/action/explore'

import './BottomNav.css'

class BottomNav extends Component {
  render() {
    return (
       <Paper zDepth={1} className="bottom-nav">
        <BottomNavigation selectedIndex={this.props.index}>
          <BottomNavigationItem
            onTouchTap={() => this.props.changePage('/')}
            label="My Lists"
            icon={<ListIcon />}
          />
          <BottomNavigationItem
            label="Explore"
            icon={<ExploreIcon />}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}

export default BottomNav