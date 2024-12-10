import React from 'react'
import TodoList from './TodoList'
import { useAppContext } from '../hooks/context'
import clsx from 'clsx'

const Content = () => {
  const {theme} = useAppContext()

  return (
    <div className={clsx(
      theme === "light" ? 'bg-gray-100' : 'bg-stone-800',
      'flex-grow flex justify-center pt-12'
    )}>
      <TodoList />
    </div>
  )
}

export default Content