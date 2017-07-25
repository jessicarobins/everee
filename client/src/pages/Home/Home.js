import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getMyLists, getRecentLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getSystemMessage, getShowAddEmptyList, getPageIndex, getShowSpinner, HOME_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'
import { getTemplates } from '../../reducers/TemplateReducer'
import * as templateActions from '../../actions/TemplateActions'

import AppBar from '../../components/AppBar/AppBar'
import BottomNav from '../../components/BottomNav/BottomNav'
import CreateListForm from '../../components/CreateListForm/CreateListForm'
import NoLists from './NoLists/NoLists'
import ListList from '../../components/ListList/ListList'
import SystemMessage from '../../components/SystemMessage/SystemMessage'

class Home extends Component {

  componentDidMount() {
    this.props.appActions.changePage(HOME_INDEX)
  }

  showListList = () => {
    return this.props.list &&
      this.props.list.length &&
      this.props.spinner
  }

  handleChangeList = (list, canEdit) => {
    this.props.listActions.setList(list)
    this.props.listActions.setCanEditList(canEdit)
    this.props.pushState(`/list/${list._id}`)
  }

  render() {
    return (
      <div>
        <Paper zDepth={2}>
          <AppBar auth={this.props.auth} />
          <CreateListForm
            fetchTemplates={this.props.templateActions.fetchTemplates}
            templates={this.props.templates}
            showAddEmptyList={this.props.showAddEmptyList}
            toggleAddEmptyList={this.props.appActions.toggleAddEmptyList}
            addMessage={this.props.appActions.addMessage}
            addList={this.props.listActions.addListRequest} />
        </Paper>
        {
          this.showListList() &&
            <div className="container">
              <Paper className="list-list-container">
                <ListList
                  subheaderText='I want to...'
                  showPercentComplete={true}
                  handleChangeList={(list) => this.handleChangeList(list, true)}
                  lists={this.props.lists}
                  getLists={this.props.listActions.fetchLists} />
              </Paper>
            </div>
        }
        {
          !this.showListList() && !this.props.spinner &&
          <NoLists
            handleChangeList={(list) => this.handleChangeList(list, false)}
            pushState={this.props.appActions.pushState}
            lists={this.props.recentLists}
            fetchLists={this.props.listActions.fetchRecentLists} />
        }
        <BottomNav
          changePage={this.props.pushState}
          index={this.props.pageIndex} />
        <SystemMessage
          addMessage={this.props.appActions.addMessage}
          message={this.props.message} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: getMyLists(state),
    templates: getTemplates(state),
    message: getSystemMessage(state),
    showAddEmptyList: getShowAddEmptyList(state),
    pageIndex: getPageIndex(state),
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
