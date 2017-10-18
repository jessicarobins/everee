import React, { Component } from 'react'

import {grey200} from 'material-ui/styles/colors'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Paper from 'material-ui/Paper'

import step1 from '../../../assets/step1.png'
import step2 from '../../../assets/step2.png'
import step3 from '../../../assets/step3.png'

import './HowDoesItWork.css'

class HowDoesItWork extends Component {

  step = ({text, description, image}) => {
    const { muiTheme } = this.props

    const styles = {
      title: {
        backgroundColor: muiTheme.palette.accent3Color,
        color: muiTheme.palette.alternateTextColor
      },
      image: {
        width: '100%',
        height: 'auto',
        alignSelf: 'center'
      }
    }

    return (
      <Paper className="step-card">
        <div style={styles.title} className="step-title">
          {text}
        </div>
        <img src={image.src} style={styles.image} alt={image.alt}/>
        <div className="step-description">{description}</div>
      </Paper>
    )
  }

  render() {
    const styles = {
      container: {
        backgroundColor: grey200,
      }
    }

    return (
      <Paper className="how-does-it-work" style={styles.container} zDepth={0}>
        <div className="container">
          <div className="title">How does it work?</div>
          <div className="steps">
            {this.step({
              text: 'Add a new list',
              image: {
                src: step1,
                alt: 'person thinking about eating different flavors of cookies'
              },
              description: 'Think of an action and a collection of things. For example, visit every continent, or say hello in every language.'
            })}
            {this.step({
              text: 'everee searches for your list',
              image: {
                src: step2,
                alt: 'a list of all the different cookies the person was thinking of'
              },
              description: 'everee looks at existing lists that others have made to see if we have a collection of items that matches.'
            })}
            {this.step({
              text: 'Your list stays up-to-date',
              image: {
                src: step3,
                alt: 'a new flavor of cookie at the top of the list'
              },
              description: 'When others add items to their list, the items get added to yours too.'
            })}
          </div>
        </div>
      </Paper>
    )
  }
}

export default muiThemeable()(HowDoesItWork)