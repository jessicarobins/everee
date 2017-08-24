import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

class Analytics extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      this.sendPageView(this.context.router.history.location)
      this.context.router.history.listen(this.sendPageView)
    }
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }

  render() {
    return this.props.children
  }
}

export default Analytics