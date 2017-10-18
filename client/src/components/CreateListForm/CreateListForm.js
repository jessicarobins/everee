import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'

import AddEmptyListDialog from './AddEmptyListDialog/AddEmptyListDialog'

import './CreateListForm.css'

class CreateListForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      verb: '',
      action: ''
    }
  }

  componentDidMount() {
    this.props.fetchTemplates()
  }

  addList = () => {
    if (this.state.verb.length && this.state.action.length) {
      this.props.addList({
        verb: this.state.verb,
        action: this.state.action
      })
    }
    else {
      this.props.addMessage('All fields are required.')
    }
  }

  addEmptyList = () => {
    this.props.addList({
      verb: this.state.verb,
      action: this.state.action
    }, 'lists')
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.addList()
    }
  }

  render() {

    const { muiTheme } = this.props

    const styles = {
      container: {
        backgroundColor: muiTheme.palette.primary1Color,
        color: muiTheme.palette.alternateTextColor
      },
      menu: {
        maxHeight: '300px'
      },
      autocomplete: {
        width: '90%'
      },
      textField: {
        underlineStyle: {
          marginBottom: '-15px'
        },
        underlineFocusStyle: {
          marginBottom: '-15px',
          borderColor: muiTheme.palette.accent1Color,
        },
        container: {
          lineHeight: 'inherit',
          fontSize: 'inherit',
          height: 'inherit',
          margin: '0 10px 15px'
        },
        hintStyle: {
          marginBottom: '-15px',
          textAlign: 'center',
          width: '100%'
        },
        inputStyle: {
          textAlign: 'center'
        }
      }
    }

    const dataSourceConfig = {
      text: 'name',
      value: '_id'
    }

    return (
      <div style={styles.container}>
        <div className="create-list-form container">
          <div className="create-list-text-fields-container">
            <div className="create-list-text-fields">
              I want to
              <TextField
                onKeyPress={this.onKeyPress}
                onChange={(event, newValue) => this.setState({verb: newValue})}
                style={styles.textField.container}
                underlineStyle={styles.textField.underlineStyle}
                underlineFocusStyle={styles.textField.underlineFocusStyle}
                hintStyle={styles.textField.hintStyle}
                hintText="climb"
                inputStyle={styles.textField.inputStyle} />
              every
            </div>
            <AutoComplete
              onKeyPress={this.onKeyPress}
              style={styles.autocomplete}
              fullWidth={true}
              menuStyle={styles.menu}
              openOnFocus={true}
              onUpdateInput={(searchText) => this.setState({action: searchText})}
              textFieldStyle={styles.textField.container}
              underlineStyle={styles.textField.underlineStyle}
              hintStyle={styles.textField.hintStyle}
              underlineFocusStyle={styles.textField.underlineFocusStyle}
              hintText="mountain in the usa"
              inputStyle={styles.textField.inputStyle}
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.props.templates}
              dataSourceConfig={dataSourceConfig} />
          </div>
          <FloatingActionButton
            onClick={this.addList}
            secondary
            className="create-list-btn">
            <AddIcon />
          </FloatingActionButton>
        </div>
        <AddEmptyListDialog
          addEmptyList={this.addEmptyList}
          action={this.state.action}
          handleClose={this.props.hideAddEmptyList}
          open={this.props.showAddEmptyList} />
      </div>
    );
  }
}

export default muiThemeable()(CreateListForm)
