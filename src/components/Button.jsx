import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <button 
      onClick={onClick}
      className='h-full max-h-[35px] border border-black px-8 rounded-md'
    >
      {text}
    </button>
  )
}

export default Button