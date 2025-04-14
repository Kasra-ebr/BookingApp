import React from 'react'
type IInput = ComponentProps<"input">


function Input({...rest}:IInput) {
  return (
    <input {...rest}></input>
  )
}

export default Input