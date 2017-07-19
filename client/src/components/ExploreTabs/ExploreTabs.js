import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import {Tabs, Tab} from 'material-ui/Tabs'
import HotIcon from 'material-ui/svg-icons/social/whatshot'
import NewIcon from 'material-ui/svg-icons/av/new-releases'

class ExploreTabs extends Component {
  render() {

    const styles = {
      backgroundColor: this.props.muiTheme.palette.primary1Color
    }

    return (
      <div style={styles}>
        <Tabs className="container">
          <Tab
            icon={<NewIcon />}
            label="RECENT"
          />
          <Tab
            icon={<HotIcon />}
            label="POPULAR"
          />
        </Tabs>
      </div>
    )
  }
}

export default muiThemeable()(ExploreTabs)