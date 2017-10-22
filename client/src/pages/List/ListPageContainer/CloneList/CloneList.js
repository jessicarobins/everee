import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'

class CloneList extends Component {

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

  render() {
    if (!this.props.canEdit && this.props.authenticated && !this.props.myRelevantList) {
      return this.renderCloneList()
    }

    return null
  }
}

export default CloneList