import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class Video extends Component {
  render() {
    return <ReactPlayer url='https://www.youtube.com/watch?v=L0MK7qz13bU'
      width={600}
      playing={false} />
  }
}

export default Video;