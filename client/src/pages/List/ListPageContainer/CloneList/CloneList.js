import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import CopyIcon from 'material-ui/svg-icons/content/content-copy'
import ViewIcon from 'material-ui/svg-icons/action/view-list'

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

  renderViewList = () => {
    return (
      <Paper className="list-detail clone-list">
        <div className="clone-list-container">
          <div className="do-this-too">You want to do this too!</div>
          <RaisedButton
            labelPosition="before"
            icon={<ViewIcon />}
            onClick={this.props.viewMyList}
            label="View your list"
            secondary={true} />
        </div>
      </Paper>
    )
  }

  render() {
    if (!this.props.canEdit && this.props.authenticated && !this.props.myRelevantList) {
      return this.renderCloneList()
    } else if (this.props.myRelevantList) {
      return this.renderViewList()
    }

    return null
  }
}

export default CloneList