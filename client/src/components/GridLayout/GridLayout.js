import React, { Component } from 'react'

import {GridList} from 'material-ui/GridList'

import ListTile from './ListTile/ListTile'

class GridLayout extends Component {

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
    const styles = {
      container: {
        marginTop: '5px',
        marginBottom: '70px'
      }
    }

    return (
      <div className='container' style={styles.container}>
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
      </div>
    )
  }
}

export default GridLayout