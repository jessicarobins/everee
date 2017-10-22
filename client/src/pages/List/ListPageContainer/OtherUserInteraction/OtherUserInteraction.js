import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import {Card, CardText} from 'material-ui/Card'
import muiThemeable from 'material-ui/styles/muiThemeable'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'

class OtherUserInteraction extends Component {

  renderCloneList = () => {
    return (
      <Paper className="list-detail clone-list">
        <div className="clone-list-container">
          <div className="do-this-too">Want to do this too?</div>
          <RaisedButton
            labelPosition="before"
            icon={<CopyIcon />}
            onClick={this.props.cloneList}
            label="Copy this list"
            secondary={true} />
        </div>
      </Paper>
    )
  }

  renderMyProgress = () => {
    const { theirList, myRelevantList, muiTheme } = this.props

    const styles = {
      topProgress: {
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        height: '10px'
      },
      bottomProgress: {
        borderTopLeftRadius: '0',
        borderTopRightRadius: '0',
        height: '10px',
        backgroundColor: muiTheme.palette.borderColor
      },
      chipContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '8px 0'
      },
      chipLeft: {
        marginRight: 4
      }
    }
    return (
      <Card className="clone-list">
        <CardText>
          <div className="do-this-too">You want to do this too!</div>
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
              <Avatar src={theirList._users[0].picture} />
              {theirList.percentComplete}%
            </Chip>
          </div>
          <LinearProgress
            style={styles.topProgress}
            mode="determinate"
            value={myRelevantList.percentComplete || 1} />
          <LinearProgress
            color={muiTheme.palette.accent1Color}
            style={styles.bottomProgress}
            mode="determinate"
            value={theirList.percentComplete || 1} />
        </CardText>
      </Card>
    )
  }

  render() {
    if (!this.props.canEdit && this.props.authenticated && !this.props.myRelevantList) {
      return this.renderCloneList()
    } else if (!this.props.canEdit && this.props.authenticated && this.props.myRelevantList) {
      return this.renderMyProgress()
    }

    return null
  }
}

export default muiThemeable()(OtherUserInteraction)