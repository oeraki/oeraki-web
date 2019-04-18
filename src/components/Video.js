import React, { Component } from 'react'
import ReactPlayer from 'react-player'
 
class Video extends Component {
  render () {
    return <ReactPlayer url='https://www.youtube.com/watch?v=bqzDuRz_P7g' playing />
  }
}

export default Video;