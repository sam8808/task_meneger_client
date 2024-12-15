import React, { useState } from 'react'
import TodoList from './TodoList'
import { useAppContext } from '../hooks/context'
import clsx from 'clsx'
import { Modal } from 'antd'
import Button from '../components/Button'

const Content = () => {
  const {theme, token} = useAppContext()
  const [open, setOpen] = useState(token ? true : false)

  const [value, setValue] = useState("")
  
  const logIn = async () => {
    console.log("Logging in...")
    // async actions
  }

  return (
    <div className={clsx(
      theme === "light" ? 'bg-gray-100' : 'bg-stone-800',
      'flex-grow flex justify-center pt-12'
    )}>
      <TodoList />

      <Modal
        open={open}
        footer={false}
        closable={false}
      >
        <div className='px-12 py-8 rounded-md flex flex-col items-center gap-4'>

          <div className='text-center'>
            Log in Your Account!
          </div>

          <input 
            type="text" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='border border-black rounded-md w-[280px] h-[45px] pl-5'
            placeholder='Your private key...'
          />

          <div className='self-end mt-4'>
            <Button text="Log In" onClick={logIn}/>
          </div>

        </div>

      </Modal>
    </div>
  )
}

export default Content