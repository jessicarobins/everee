import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getMyLists, getRecentLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getShowAddEmptyList, getShowSpinner, HOME_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'
import { getTemplates } from '../../reducers/TemplateReducer'
import * as templateActions from '../../actions/TemplateActions'

import Page from '../Page'
import CreateListForm from '../../components/CreateListForm/CreateListForm'
import NoLists from './NoLists/NoLists'
import ListList from '../../components/ListList/ListList'
import RecentListCard from '../../components/ListListCard/RecentListCard/RecentListCard'

class Home extends Component {

  componentDidMount() {
    this.props.listActions.fetchLists()
    this.props.appActions.changePage(HOME_INDEX)
  }

  showListList = () => {
    return this.props.lists &&
      !!this.props.lists.length &&
      !this.props.spinner
  }

  showNoLists = () => {
    return !this.showListList() && !this.props.spinner
  }

  handleChangeList = (list, canEdit) => {
    this.props.listActions.setList(list)
    this.props.listActions.setCanEditList(canEdit)
    this.props.pushState(`/list/${list._id}`)
  }

  render() {
    return (
      <Page
        topPaper={
          <CreateListForm
            fetchTemplates={this.props.templateActions.fetchTemplates}
            templates={this.props.templates}
            showAddEmptyList={this.props.showAddEmptyList}
            hideAddEmptyList={this.props.appActions.hideAddEmptyList}
            addMessage={this.props.appActions.addMessage}
            addList={this.props.listActions.addListRequest} />}>
        {
          this.showListList() &&
            <div className="container list-list-container">
              <Paper className="list-list-paper">
                <ListList
                  subheaderText='I want to...'
                  showPercentComplete={true}
                  handleChangeList={(list) => this.handleChangeList(list, true)}
                  lists={this.props.lists} />
              </Paper>
              <RecentListCard
                pushState={this.props.pushState}
                handleChangeList={(list) => this.handleChangeList(list, false)}
                subheaderText='Recently Created Lists'
                fetchLists={this.props.listActions.fetchRecentLists}
                lists={this.props.recentLists} />
            </div>
        }
        {
          this.showNoLists() &&
          <NoLists
            handleChangeList={(list) => this.handleChangeList(list, false)}
            pushState={this.props.pushState}
            lists={this.props.recentLists}
            fetchLists={this.props.listActions.fetchRecentLists} />
        }
      </Page>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getMyLists(state),
    templates: getTemplates(state),
    showAddEmptyList: getShowAddEmptyList(state),
    spinner: getShowSpinner(state),
    recentLists: getRecentLists(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    listActions: bindActionCreators(listActions, dispatch),
    templateActions: bindActionCreators(templateActions, dispatch),
    pushState: bindActionCreators(push, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
