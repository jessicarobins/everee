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

  handleClickList = (list) => {
    this.props.pushState(`/list/${list._id}`)
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
          {this.props.lists.map((list, index) => (
            <ListTile
              key={index}
              onClick={() => this.handleClickList(list)}
              list={list}
              cols={index % 9 === 0 ? 2 : 1}
              rows={1} />
          ))}
        </GridList>
      </div>
    )
  }
}

export default GridLayout