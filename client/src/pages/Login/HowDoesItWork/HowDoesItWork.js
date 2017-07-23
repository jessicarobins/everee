import React, { Component } from 'react'

import {grey200} from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import SearchIcon from 'material-ui/svg-icons/action/search'
import UpdateIcon from 'material-ui/svg-icons/action/update'

import './HowDoesItWork.css'

class HowDoesItWork extends Component {

  step = ({text, description, icon}) => {
    const { muiTheme } = this.props

    const styles = {
      description: {
        color: muiTheme.palette.accent3Color,
        backgroundColor: muiTheme.palette.shadowColor,
        opacity: .7,
        flex: 1,
        padding: '20px',
        position: 'absolute',
        bottom: 0,
        height: '76px',
        display: 'flex',
        alignItems: 'center'
      }
    }

    return (
      <Paper className="step-card">
        <div style={{backgroundColor: grey200}} className="step-title">
          <h3>{text}</h3>
        </div>
        {icon}
        <div style={styles.description}>{description}</div>
      </Paper>
    )
  }

  render() {
    const { muiTheme } = this.props

    const styles = {
      container: {
        backgroundColor: muiTheme.palette.primary3Color,
      },
      icon: {
        width: '70%',
        height: 'auto',
        color: muiTheme.palette.accent1Color,
        alignSelf: 'center'
      }
    }

    return (
      <Paper className="how-does-it-work" style={styles.container} zDepth={0}>
        <div className="container">
          <div className="title">How does it work?</div>
          <div className="steps">
            {this.step({
              text: 'Step 1: Add a new list',
              icon: <AddIcon style={styles.icon} />,
              description: 'Think of an action and a collection of things. For example, visit every continent, or say hello in every language.'
            })}
            {this.step({
              text: 'Step 2: everee searches for your list',
              icon: <SearchIcon style={styles.icon} />,
              description: 'everee looks at existing lists that others have made to see if we have a collection of items that matches.'
            })}
            {this.step({
              text: 'Step 3: Your list stays up-to-date',
              icon: <UpdateIcon style={styles.icon} />,
              description: 'When others add items to their list, the items get added to yours too.'
            })}
          </div>
        </div>
      </Paper>
    )
  }
}

export default muiThemeable()(HowDoesItWork)