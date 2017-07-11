import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import AddIcon from 'material-ui/svg-icons/content/add'

import './CreateListForm.css'

class CreateListForm extends Component {
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
      <div style={styles.container} className="create-list-form">
        <div className="create-list-text-fields">
          I want to
          <TextField
            style={styles.textField.container}
            underlineStyle={styles.textField.underlineStyle}
            underlineFocusStyle={styles.textField.underlineFocusStyle}
            hintStyle={styles.textField.hintStyle}
            hintText="climb"
            inputStyle={styles.textField.inputStyle}
          />
          every
          <TextField
            style={styles.textField.container}
            underlineStyle={styles.textField.underlineStyle}
            hintStyle={styles.textField.hintStyle}
            underlineFocusStyle={styles.textField.underlineFocusStyle}
            hintText="mountain"
            inputStyle={styles.textField.inputStyle}
          />
        </div>
        <FloatingActionButton secondary className="create-list-btn">
          <AddIcon />
        </FloatingActionButton>
      </div>
    );
  }
}

export default muiThemeable()(CreateListForm)
