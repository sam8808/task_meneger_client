import React from 'react'

const Input = ({type, placeholder, value, setValue}) => {
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={ (event) => setValue(event.target.value) }  
      className='w-full h-full px-4 border-b border-black '
    />
  )
}

export default Input