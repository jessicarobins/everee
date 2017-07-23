import React, { Component } from 'react'
import MasonryInfiniteScroller from 'react-masonry-infinite'

import ListCard from '../ListCard/ListCard'

import './MasonryLayout.css'

const sizes = [{
  columns: 1,
  gutter: 20
}, {
  mq: '768px',
  columns: 2,
  gutter: 20
}, {
  mq: '1024px',
  columns: 3,
  gutter: 20
}, {
  mq: '1200px',
  columns: 4,
  gutter: 20
}]

class MasonryLayout extends Component {

  componentDidMount() {
    this.props.fetchLists()
  }

  render() {

    return (
      <MasonryInfiniteScroller
        className="masonry-layout"
        sizes={sizes}
        hasMore={true}
        loadMore={() => console.log('loading more!')}>
        {
          this.props.lists.map( (list, index) => (
            <ListCard
              pushState={this.props.pushState}
              key={index}
              list={list} />
          ))
        }
      </MasonryInfiniteScroller>
    )
  }
}

export default MasonryLayout