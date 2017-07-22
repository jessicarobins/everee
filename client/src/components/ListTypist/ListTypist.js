import React, { Component } from 'react'
import RestartingTypist from './RestartingTypist/RestartingTypist'
import * as _ from 'lodash'

class ListTypist extends Component {

  constructor(props) {
    super(props)

    this.state = {
      index: 0
    }
  }

  componentWillMount() {
    this.props.fetchDemoLists()
  }

  changeList = () => {
    const newIndex = _.random(this.props.lists.length-1)
    this.setState({
      index: newIndex
    })
  }

  currentList() {
    if (this.props.lists[this.state.index]) {
      return this.props.lists[this.state.index].name
    }
  }

  render() {

    return (
      <h1>
        {'I want to '}
        <RestartingTypist
          onTypingDone={this.changeList}>
          {this.currentList()}
        </RestartingTypist>
      </h1>
    )
  }
}

ListTypist.defaultProps = {
  lists: []
}

export default ListTypist