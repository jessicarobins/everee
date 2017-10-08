import React, { Component } from 'react'

import {GridList, GridTile} from 'material-ui/GridList'

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
      gridTile: {
        cursor: 'pointer'
      },
      container: {
        display: 'flex',
        marginTop: '5px',
        marginBottom: '70px',
        marginLeft: '70px',
        marginRight: '70px'
      }
    }

    const halfIndex = Math.floor(this.props.lists.length / 2)
    const listOne = this.props.lists.slice(0, halfIndex)
    const listTwo = this.props.lists.slice(halfIndex)

    return (
      <div style={styles.container}>
        <div style={{flex: 1}}>
        <GridList
          cols={2}
          cellHeight={200}
          padding={1}>
          {listOne.map((list, index) => (
            <GridTile
              style={styles.gridTile}
              key={index}
              onClick={() => this.handleClickList(list)}
              title={list.fullName || `${list.verb} every ${list.action}`}
              subtitle={`${list.items.length} item${list.items.length === 1 ? '' : 's'}`}
              titlePosition="bottom"
              cols={index % 3 === 0 ? 2 : 1}
              rows={index % 3 === 0 ? 2 : 1}>
              <img src={list.image} alt={list.fullName} />
            </GridTile>
          ))}
        </GridList>
        </div>
        <div style={{flex: 1}}>
        <GridList
          cols={2}
          cellHeight={200}
          padding={1}>
          {listTwo.map((list, index) => (
            <GridTile
              style={styles.gridTile}
              key={index}
              onClick={() => this.handleClickList(list)}
              title={list.fullName || `${list.verb} every ${list.action}`}
              subtitle={`${list.items.length} item${list.items.length === 1 ? '' : 's'}`}
              titlePosition="bottom"
              cols={index % 3 === 2 ? 2 : 1}
              rows={index % 3 === 2 ? 2 : 1}>
              <img src={list.image} alt={list.fullName} />
            </GridTile>
          ))}
        </GridList>
        </div>
      </div>
    )
  }
}

export default GridLayout