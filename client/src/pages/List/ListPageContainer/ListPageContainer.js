import React, { Component } from 'react'

import {Card, CardTitle, CardMedia, CardHeader} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

import Sharebar from '../../../components/Sharebar/Sharebar'
import ListItems from '../../../components/ListItems/ListItems'
import CreateListItemForm from '../../../components/CreateListItemForm/CreateListItemForm'
import ListListCard from '../../../components/ListListCard/ListListCard'
import LinkActions from './LinkActions/LinkActions'
import ListProgress from './ListProgress/ListProgress'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    const { list } = this.props
    const styles = {
      cardText: {
        fontSize: '1em',
        lineHeight: '1em'
      },
      cardHeader: {
        lineHeight: '24px'
      }
    }

    const cardTitle = <CardTitle titleStyle={styles.cardText} title={`I want to ${list.name}`} />
    return (
      <div className="list-page-container container">
        <Card className="list-name">
          <CardHeader
            subtitleStyle={styles.cardHeader}
            titleStyle={styles.cardHeader}
            title={list._users[0].name}
            subtitle={`${list._users[0].points} points`}
            avatar={list._users[0].picture} />
          {
            !!list.image ?
            <CardMedia
              overlay={cardTitle}>
              <img className="list-image" src={list.image} alt="" />
            </CardMedia> :
            cardTitle
          }
          <LinkActions
            canEdit={this.props.canEdit}
            list={list}
            removeListLink={this.props.removeListLink}
            addListLink={this.props.addListLink} />
        </Card>
        <ListProgress list={list} />
        <div className="right">
          {
            this.props.canEdit &&
            <Paper className="list-item-form list-detail">
              <CreateListItemForm
                addMessage={this.props.addMessage}
                addListItem={this.props.addListItem}
                list={list} />
            </Paper>
          }
          {
            !this.props.canEdit && this.props.authenticated &&
              <Paper className="list-detail clone-list">
                <div className="clone-list-container">
                  <div className="do-this-too">Want to do this too?</div>
                  <RaisedButton
                    onClick={this.props.cloneList}
                    label="Clone this list"
                    secondary={true} />
                </div>
              </Paper>
          }
          <ListItems
            canEdit={this.props.canEdit}
            deleteListItem={this.props.deleteListItem}
            toggleListItem={this.props.toggleListItem}
            list={list} />
        </div>
        <Sharebar
          title={list.fullName}
          className="list-detail" />
        {
          (this.props.list.related && this.props.list.related.length > 0) &&
          <ListListCard
            className="related-lists"
            handleChangeList={list => this.props.handleChangeList(list)}
            lists={this.props.list.related}
            subheaderText='Related Lists' />
        }
      </div>
    )
  }
}

export default ListPageContainer
