import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'

import './CreateListForm.css'

class CreateListForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      verb: '',
      action: ''
    }
  }

  addList = () => {
    if (this.state.verb.length && this.state.action.length) {
      this.props.addList({
        verb: this.state.verb,
        action: this.state.action
      })
    }
  }

  render() {

    const { muiTheme } = this.props

    const styles = {
      container: {
        backgroundColor: muiTheme.palette.primary1Color,
        color: muiTheme.palette.alternateTextColor
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
          margin: '0 10px'
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

    return (
      <div style={styles.container}>
        <div className="create-list-form container">
          <div className="create-list-text-fields">
            I want to
            <TextField
              onChange={(event, newValue) => this.setState({verb: newValue})}
              style={styles.textField.container}
              underlineStyle={styles.textField.underlineStyle}
              underlineFocusStyle={styles.textField.underlineFocusStyle}
              hintStyle={styles.textField.hintStyle}
              hintText="climb"
              inputStyle={styles.textField.inputStyle}
            />
            every
            <TextField
              onChange={(event, newValue) => this.setState({action: newValue})}
              style={styles.textField.container}
              underlineStyle={styles.textField.underlineStyle}
              hintStyle={styles.textField.hintStyle}
              underlineFocusStyle={styles.textField.underlineFocusStyle}
              hintText="mountain"
              inputStyle={styles.textField.inputStyle}
            />
          </div>
          <FloatingActionButton
            onClick={this.addList}
            secondary
            className="create-list-btn">
            <AddIcon />
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

export default muiThemeable()(CreateListForm)
