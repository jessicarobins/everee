import React, { Component } from 'react'
import Masonry from 'react-masonry-layout'

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

  constructor(props) {
    super(props)

    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.fetchLists()
  }

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    })
    console.log('loading more!')

    this.props.fetchLists()
  }

  render() {

    return (
      <Masonry
        id="items"
        infiniteScroll={this.loadMore}
        infiniteScrollLoading={this.props.isLoading}
        className="masonry-layout"
        sizes={sizes}>
        {
          this.props.lists.map( (list, index) => (
            <ListCard
              pushState={this.props.pushState}
              key={index}
              list={list} />
          ))
        }
      </Masonry>
    )
  }
}

export default MasonryLayout