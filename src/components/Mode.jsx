import React from 'react'

const Mode = ({icon, text}) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='translate-y-[2px]'>
        {icon}
      </div>
      <div>
        {text}
      </div>
    </div>
  )
}

export default Mode