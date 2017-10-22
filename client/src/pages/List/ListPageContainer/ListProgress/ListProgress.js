import React, { Component } from 'react'

import Chip from 'material-ui/Chip'
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import muiThemeable from 'material-ui/styles/muiThemeable'

class ListProgress extends Component {
  renderMyProgress = () => {
    const { list, myRelevantList, muiTheme } = this.props

    const styles = {
      topProgress: {
        height: 10
      },
      bottomProgress: {
        height: 10,
        marginTop: 2,
        backgroundColor: muiTheme.palette.borderColor
      },
      chipContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 8
      },
      chipLeft: {
        marginRight: 4
      }
    }
    return (
      <Card className="list-progress">
        <CardHeader
          subtitle="Compare Your Progress" />
        <CardText>
          <LinearProgress
            style={styles.topProgress}
            mode="determinate"
            value={myRelevantList.percentComplete || 1} />
          <LinearProgress
            color={muiTheme.palette.accent1Color}
            style={styles.bottomProgress}
            mode="determinate"
            value={list.percentComplete || 1} />
          <div style={styles.chipContainer}>
            <Chip
              style={styles.chipLeft}
              labelColor={muiTheme.palette.alternateTextColor}
              backgroundColor={muiTheme.palette.primary1Color}>
              <Avatar src={myRelevantList._users[0].picture} />
              {myRelevantList.percentComplete}%
            </Chip>
            <Chip
              labelColor={muiTheme.palette.alternateTextColor}
              backgroundColor={muiTheme.palette.accent1Color}>
              <Avatar src={list._users[0].picture} />
              {list.percentComplete}%
            </Chip>
          </div>
        </CardText>
      </Card>
    )
  }

  renderProgress = () => {
    const { list } = this.props
    return (
      <Card className="list-progress">
        <CardHeader subtitle="Progress"/>
        <CardText>
          <LinearProgress
            style={{height: 10}}
            mode="determinate"
            value={list.percentComplete || 1} />
          <div className="list-chips">
            <Chip>{list.percentComplete}% complete</Chip>
          </div>
        </CardText>
      </Card>
    )
  }

  render() {
    if (this.props.list.items.length && this.props.myRelevantList) {
      return this.renderMyProgress()
    } else if (this.props.list.items.length) {
      return this.renderProgress()
    }

    return null
  }
}

export default muiThemeable()(ListProgress)