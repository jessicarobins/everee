import React, { Component } from 'react'

import {Card, CardTitle, CardMedia, CardHeader} from 'material-ui/Card'
import Paper from 'material-ui/Paper'

import Sharebar from '../../../components/Sharebar/Sharebar'
import ListItems from '../../../components/ListItems/ListItems'
import CreateListItemForm from '../../../components/CreateListItemForm/CreateListItemForm'
import ListListCard from '../../../components/ListListCard/ListListCard'
import LinkActions from './LinkActions/LinkActions'
import ListProgress from './ListProgress/ListProgress'
import CloneList from './CloneList/CloneList'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    const { list } = this.props
    const styles = {
      cardText: {
        fontSize: '1em',
        lineHeight: '1em'
      },
      cardTitleSubtitle: {
        fontWeight: 400,
        textAlign: 'right'
      },
      cardHeader: {
        lineHeight: '24px'
      }
    }

    const cardTitle =
      <CardTitle
        subtitleStyle={styles.cardTitleSubtitle}
        titleStyle={styles.cardText}
        title={`I want to ${list.name}`}
        subtitle={`${list.fractionComplete.denominator} items`} />
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
            addMessage={this.props.addMessage}
            list={list}
            removeListLink={this.props.removeListLink}
            addListLink={this.props.addListLink} />
        </Card>
        <ListProgress
          list={list}
          myRelevantList={this.props.myRelevantList}
          authenticated={this.props.authenticated} />
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
          <CloneList
            list={list}
            viewMyList={() => this.props.handleChangeList(this.props.myRelevantList)}
            canEdit={this.props.canEdit}
            authenticated={this.props.authenticated}
            myRelevantList={this.props.myRelevantList}
            cloneList={this.props.cloneList} />
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
