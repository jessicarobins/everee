import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {GridList} from 'material-ui/GridList'

import ListTile from './ListTile/ListTile'

class GridLayout extends Component {

  componentDidMount() {
    this.props.fetchLists()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tab !== nextProps.tab) {
      nextProps.fetchLists()
    }
  }

  render() {
    const styles = {
      container: {
        marginTop: '5px',
        marginBottom: '70px'
      }
    }

    return (
      <div className='container' style={styles.container}>
        <InfiniteScroll
          pageStart={1}
          loadMore={this.props.fetchLists}
          hasMore={!this.props.isOutOfPages && !this.props.isLoading}
          initialLoad={false}
          loader={<div className="loader">Loading ...</div>}>
          <GridList
            cols={4}
            cellHeight={200}
            padding={1}>

              {
                this.props.lists.map((list, index) => {
                  const isFeatured = index % 9 === 0
                  return (
                    <ListTile
                      pushState={this.props.pushState}
                      key={index}
                      list={list}
                      cols={isFeatured ? 2 : 1}
                      isFeatured={isFeatured}
                      rows={1} />
                    )
                })
              }

          </GridList>
        </InfiniteScroll>
      </div>
    )
  }
}

export default GridLayout