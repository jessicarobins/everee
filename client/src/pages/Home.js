import React, { Component } from 'react'

import CreateListForm from '../components/CreateListForm/CreateListForm'
import ListList from '../components/ListList/ListList'

class Home extends Component {
  render() {
    return (
      <div>
        <CreateListForm />
        <ListList />
      </div>
    )
  }
}

export default Home
