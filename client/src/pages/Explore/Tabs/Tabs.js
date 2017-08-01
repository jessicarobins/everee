import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import {Tabs, Tab} from 'material-ui/Tabs'
import HotIcon from 'material-ui/svg-icons/social/whatshot'
import NewIcon from 'material-ui/svg-icons/av/new-releases'
import CompleteIcon from 'material-ui/svg-icons/action/done'

import logo from '../../../assets/everee2.svg'

class ExploreTabs extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sticky: this.isSticky()
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    if (this.isSticky() !== this.state.sticky) {
      this.setState({
        sticky: !this.state.sticky
      })
    }
  }

  isSticky = () => {
    return document.body.scrollTop > this.props.muiTheme.appBar.height
  }

  render() {

    const styles = {
      container: {
        backgroundColor: this.props.muiTheme.palette.primary1Color,
        position: 'sticky',
        top: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center'
      },
      tabs: {
        flex: 1
      }
    }

    return (
      <div style={styles.container}>
        {
          this.state.sticky && <img src={logo} alt="logo" className="small-logo" />
        }
        <Tabs className="container" style={styles.tabs}>
          <Tab
            icon={<NewIcon />}
            label="RECENT"
          />
          <Tab
            icon={<HotIcon />}
            label="POPULAR"
          />
          <Tab
            icon={<CompleteIcon />}
            label="COMPLETE"
          />
        </Tabs>
      </div>
    )
  }
}

export default muiThemeable()(ExploreTabs)