import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import {GridList} from 'material-ui/GridList'
import CircularProgress from 'material-ui/CircularProgress'
import Dimensions from 'react-dimensions'

import ListTile from './ListTile/ListTile'

import './GridLayout.css'

class GridLayout extends Component {

  componentDidMount() {
    this.props.fetchLists()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tab !== nextProps.tab) {
      nextProps.fetchLists()
    }
  }

  isSmall = () => {
    return (this.props.containerWidth < 736)
  }

  render() {
    const styles = {
      container: {
        marginTop: '5px',
        marginBottom: '70px',
        overflow: 'hidden'
      }
    }

    return (
      <div className='container' style={styles.container}>
        { !this.props.spinner &&
          <InfiniteScroll
            pageStart={1}
            loadMore={this.props.fetchLists}
            hasMore={!this.props.isOutOfPages && !this.props.isLoading}
            initialLoad={false}>
            <GridList
              cols={!this.isSmall() ? 4 : 1}
              cellHeight={200}
              padding={1}>

                {
                  this.props.lists.map((list, index) => {
                    const isFeatured = (index % 9 === 0) && !this.isSmall()
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
        }
        {
          this.props.isLoading && !this.props.spinner &&
            <div className="grid-layout-spinner-container">
              <CircularProgress size={40} thickness={5}/>
            </div>
        }
      </div>
    )
  }
}

export default Dimensions()(GridLayout)