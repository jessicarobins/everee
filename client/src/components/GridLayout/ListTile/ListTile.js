import React, { Component } from 'react'

import {GridTile} from 'material-ui/GridList'
import muiThemeable from 'material-ui/styles/muiThemeable'

import logo from '../../../assets/logo-light.svg'

class ListTile extends Component {

  title = () => {
    const { isFeatured, list } = this.props
    return (isFeatured && !!list.fullName) ? list.fullName : `${list.verb} every ${list.action}`
  }

  subtitle = () => {
    return `${this.props.list.items.length} item${this.props.list.items.length === 1 ? '' : 's'}`
  }

  image = () => {
    if(this.props.list.image) {
      return <img src={this.props.list.image} alt={this.props.list.fullName} />
    }

    const logoContainerStyles = {
      backgroundColor: this.props.muiTheme.palette.primary1Color,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <div style={logoContainerStyles}>
        <img src={logo} alt={this.props.list.fullName} />
      </div>
    )
  }

  handleClickList = () => {
    this.props.pushState(`/list/${this.props.list._id}`)
  }

  render() {
    const styles = {
      gridTile: {
        cursor: 'pointer'
      }
    }

    return (
      <GridTile
        style={styles.gridTile}
        onClick={this.handleClickList}
        title={this.title()}
        subtitle={this.subtitle()}
        titlePosition="bottom"
        cols={this.props.cols}
        rows={this.props.rows}>
        {this.image()}
      </GridTile>
    )
  }
}

export default muiThemeable()(ListTile)