import React, { Component } from 'react'

import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

import * as _ from 'lodash'

class ListList extends Component {

  componentDidMount() {
    // this.props.getLists()
  }

  render() {

    const items = ['a', 'b', 'c', 'd', 'e']
    return (
     <Paper className='container'>
      {
        _.map(items, (item, index) => {
          return (
            <div key={index}>
              {item}
              {
                (index !== items.length-1) && <Divider />
              }
            </div>
          )
        })
      }
     </Paper>
    )
  }
}

export default ListList
