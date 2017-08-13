import React, { Component } from 'react'

import { ShareButtons, generateShareIcon } from 'react-share'

import './Sharebar.css'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  RedditShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const RedditIcon = generateShareIcon('reddit')

class Sharebar extends Component {

  render() {
    const shareUrl = String(window.location)
    const shareTitle = document.title
    const iconSize = 44

    return (
      <div className={`sharebar ${this.props.className}`}>
        <FacebookShareButton
          url={shareUrl}
          title={shareTitle}>
          <FacebookIcon size={iconSize} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={shareTitle}>
          <TwitterIcon size={iconSize} round />
        </TwitterShareButton>
        <GooglePlusShareButton
          url={shareUrl}>
          <GooglePlusIcon size={iconSize} round />
        </GooglePlusShareButton>
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
