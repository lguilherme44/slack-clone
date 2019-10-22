import React from 'react'
import { Progress } from 'semantic-ui-react'

function Progressbar({ uploadState, percentUploaded }) {
  return (
    uploadState === 'uploading' && (
      <Progress
        className='message__progressbar'
        percent={percentUploaded}
        progress
        indicating
        size='medium'
        inverted
      />
    )
  )
}
export default Progressbar
