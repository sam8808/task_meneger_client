import React, { useState } from 'react'

const Login = () => {
  const [value, setValue] = useState("")
  
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='border border-black px-12 py-8 rounded-md'>

        <input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='border border-black rounded-md w-[280px] h-[45px] pl-5'
        />

        

      </div>
    </div>
  )
}

export default Login