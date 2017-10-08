import React, { Component } from 'react'

import {GridTile} from 'material-ui/GridList'
import muiThemeable from 'material-ui/styles/muiThemeable'

import logo from '../../../assets/logo-light.svg'

class ListTile extends Component {

  title = () => {
    return this.props.list.fullName || `${this.props.list.verb} every ${this.props.list.action}`
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

  render() {
    const styles = {
      gridTile: {
        cursor: 'pointer'
      }
    }

    return (
      <GridTile
        style={styles.gridTile}
        onClick={this.props.handleClickList}
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