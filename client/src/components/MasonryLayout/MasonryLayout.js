import React, { Component } from 'react'
import MasonryInfiniteScroller from 'react-masonry-infinite'

import ListCard from '../ListCard/ListCard'

class MasonryLayout extends Component {
  render() {

    return (
      <div>
      {
        this.props.lists.map( (list, index) => <ListCard key={index} list={list} />)
      }
      </div>
    )
  }
}

export default MasonryLayout