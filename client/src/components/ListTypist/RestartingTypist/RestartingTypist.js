import React, { Component } from 'react'
import Typist from 'react-typist'

class RestartingTypist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      typing: true
    }
  }

  done = () => {
    this.props.onTypingDone()
    this.timeouts.push(
      setTimeout( () => {
        this.setState({
          typing: false
        }, () => {
          this.timeouts.push(
            setTimeout(() => this.setState({
              typing: true
            }), this.props.timeout || 1200)
          )
        })
      }, this.props.timeout || 3600)
    )
  }

  componentWillMount() {
    this.timeouts = []
  }

  componentWillUnmount() {
    this.timeouts.forEach(window.clearTimeout)
  }

  render() {
    const {children, timeout, ...props} = this.props
    return this.state.typing ?
      <Typist {...props} onTypingDone={this.done}>{children}</Typist>
      : <span className="blink">|</span>
  }
}

export default RestartingTypist