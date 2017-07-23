import React, { Component } from 'react'
import Progress from '../../components/Progress/Progress'

import './Callback.css'

class Callback extends Component {
  render() {
    return (
      <div className="callback-container">
        <Progress size={80} thickness={5} />
      </div>
    )
  }
}

export default Callback