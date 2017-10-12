import React, { Component } from 'react'

import FlatButton from 'material-ui/FlatButton'
import LinkIcon from 'material-ui/svg-icons/content/link'
import Dialog from 'material-ui/Dialog'

class AddLinkButton extends Component {

  render() {
    return (
      <FlatButton
        icon={<LinkIcon />}
        label="Add Link"
        labelPosition="before"
        secondary={true} />
    )
  }
}

export default AddLinkButton