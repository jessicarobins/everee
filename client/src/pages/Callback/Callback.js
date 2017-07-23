import React, { Component } from 'react'
import Progress from '../../components/Progress/Progress'

import './Callback.css'

class Callback extends Component {
  render() {
    return (
      <div className="callback-container">
        <Progress displayed={true} />
      </div>
    )
  }
}

export default Callback