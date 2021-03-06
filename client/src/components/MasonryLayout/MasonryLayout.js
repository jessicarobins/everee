import React, { Component } from 'react'
import Masonry from 'react-masonry-layout'

import Progress from '../Progress/Progress'
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

  componentWillReceiveProps(nextProps) {
    if (this.props.tab !== nextProps.tab) {
      this.setState({
        page: 1
      })

      nextProps.fetchLists()
    }
  }

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    })

    this.props.fetchLists(this.state.page)
  }

  render() {

    return (
      <div>
        { !this.props.spinner &&
          <Masonry
            id="items"
            infiniteScroll={this.loadMore}
            infiniteScrollLoading={this.props.isLoading}
            infiniteScrollEnd={this.props.isOutOfPages}
            infiniteScrollSpinner={<Progress displayed />}
            infiniteScrollEndIndicator={<div></div>}
            className="masonry-layout"
            sizes={sizes}>
            {
              this.props.lists.map( (list, index) => (
                <ListCard
                  hideGo={this.props.hideGo}
                  hideClone={this.props.hideClone}
                  cloneList={this.props.cloneList}
                  header={this.props.cardHeader}
                  hideProgress={this.props.hideProgress}
                  pushState={this.props.pushState}
                  key={index}
                  list={list} />
              ))
            }
          </Masonry>
        }
      </div>
    )
  }
}

export default MasonryLayout