import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import {Card, CardTitle, CardMedia, CardHeader, CardActions} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'
import LinkIcon from 'material-ui/svg-icons/content/link'

import Sharebar from '../../../components/Sharebar/Sharebar'
import ListItems from '../../../components/ListItems/ListItems'
import CreateListItemForm from '../../../components/CreateListItemForm/CreateListItemForm'
import ListListCard from '../../../components/ListListCard/ListListCard'
import AddLinkButton from './AddLinkButton/AddLinkButton'

import './ListPageContainer.css'

class ListPageContainer extends Component {

  render() {
    const { list, muiTheme } = this.props
    const styles = {
      cardText: {
        fontSize: '1em',
        lineHeight: '1em'
      },
      cardHeader: {
        lineHeight: '24px'
      },
      link: {
        color: muiTheme.palette.accent3Color
      },
      linkIcon: {
        color: muiTheme.palette.accent3Color,
        marginLeft: '15px'
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
          <CardActions style={{textAlign: 'right'}}>
            { list.link ?
              <a
                style={styles.link}
                className="list-link"
                href={list.link.url}
                target="_blank">{list.link.text}<LinkIcon style={styles.linkIcon}/></a> :
              <AddLinkButton
                addListLink={this.props.addListLink}
                list={list} />
            }
          </CardActions>
        </Card>
        <Paper className="list-progress list-detail">
          <LinearProgress
            mode="determinate"
            value={list.percentComplete} />
          <div className="list-chips">
            <Chip>{list.percentComplete} %</Chip>
            <Chip>{list.fractionComplete.total} items</Chip>
          </div>
        </Paper>
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
        <Sharebar className="list-detail" />
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

export default muiThemeable()(ListPageContainer)
