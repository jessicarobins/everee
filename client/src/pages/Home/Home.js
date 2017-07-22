import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import { getMyLists } from '../../reducers/ListReducer'
import * as listActions from '../../actions/ListActions'
import { getSystemMessage, getShowAddEmptyList, getPageIndex, HOME_INDEX } from '../../reducers/AppReducer'
import * as appActions from '../../actions/AppActions'
import { getTemplates } from '../../reducers/TemplateReducer'
import * as templateActions from '../../actions/TemplateActions'

import AppBar from '../../components/AppBar/AppBar'
import BottomNav from '../../components/BottomNav/BottomNav'
import CreateListForm from '../../components/CreateListForm/CreateListForm'
import ListList from '../../components/ListList/ListList'
import SystemMessage from '../../components/SystemMessage/SystemMessage'

class Home extends Component {

  componentDidMount() {
    this.props.appActions.changePage(HOME_INDEX)
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
        <ListList
          setCanEditList={this.props.listActions.setCanEditList}
          setList={this.props.listActions.setList}
          pushState={this.props.pushState}
          lists={this.props.lists}
          getLists={this.props.listActions.fetchLists} />
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
    pageIndex: getPageIndex(state)
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
