import React, { Component } from 'react'

import { ShareButtons, generateShareIcon } from 'react-share'

import './Sharebar.css'

const {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const RedditIcon = generateShareIcon('reddit')

class Sharebar extends Component {

  render() {
    const shareUrl = String(window.location)
    const shareTitle = this.props.title || document.title
    const iconSize = 44

    return (
      <div className={`sharebar ${this.props.className}`}>
        <FacebookShareButton
          url={shareUrl}
          quote={shareTitle}
          picture={`${process.env.REACT_APP_BASE_URL}logo-solid.svg`}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={shareTitle}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>
        <RedditShareButton
          url={shareUrl}
          title={shareTitle}>
          <RedditIcon size={iconSize} round />
        </RedditShareButton>
      </div>
    )
  }
}

export default Sharebar
