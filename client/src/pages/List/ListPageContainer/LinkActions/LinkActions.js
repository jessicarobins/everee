import React, { Component } from 'react'

import {CardActions} from 'material-ui/Card'
import LinkIcon from 'material-ui/svg-icons/content/link'
import AddLinkButton from './AddLinkButton/AddLinkButton'
import muiThemeable from 'material-ui/styles/muiThemeable'
import {grey400} from 'material-ui/styles/colors'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'

class LinkActions extends Component {

  handleRemoveLink = () => {
    this.props.removeListLink({id: this.props.list.id})
  }

  renderLinkContainer = () => {
    const styles = {
      container: {
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }
    return (
      <div style={styles.container}>
        {
          this.renderLink()
        }
        {
          this.props.canEdit &&
            <IconButton
              onClick={this.handleRemoveLink}>
              <DeleteIcon color={grey400} />
            </IconButton>
        }
      </div>
    )
  }

  renderLink = () => {
    const {muiTheme, list} = this.props
    const styles = {
      link: {
        color: muiTheme.palette.accent3Color
      },
      linkIcon: {
        color: muiTheme.palette.accent3Color,
        margin: '0 15px'
      }
    }
    return (
      <a
        style={styles.link}
        className="list-link"
        href={list.link.url}
        target="_blank"><LinkIcon style={styles.linkIcon}/>{list.link.text}</a>
    )
  }

  renderAnything() {
    return this.props.canEdit || !!this.props.list.link
  }

  render() {
    const { list } = this.props

    if (this.renderAnything()) {
      const styles = !list.link ? {
        textAlign: 'right'
      } : {}

      return (
        <CardActions style={styles}>
          { list.link ?
            this.renderLinkContainer() :
            <AddLinkButton
              addListLink={this.props.addListLink}
              list={list} />
          }
        </CardActions>
      )
    }

    return null
  }
}

export default  muiThemeable()(LinkActions)