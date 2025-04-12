import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Hotels() {
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const options = JSON.parse(searchParams.get("options"))?.room
    console.log(options,'des')
  return (
    <div>Hotels</div>
  )
}

export default Hotels