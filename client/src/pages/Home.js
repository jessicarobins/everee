import React, { Component } from 'react'

import AppBar from '../components/AppBar/AppBar'
import CreateListForm from '../components/CreateListForm/CreateListForm'
import ListList from '../components/ListList/ListList'

class Home extends Component {
  render() {
    return (
      <div>
        <AppBar logout={this.props.auth.logout} />
        <CreateListForm />
        <ListList />
      </div>
    )
  }
}

export default Home
