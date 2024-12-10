import React from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useAppContext } from '../hooks/context';
import Mode from './Mode';
import clsx from 'clsx';

const Header = () => {
  const {theme, setTheme} = useAppContext()

  const changeTheme = () => setTheme((prev) => prev === "light" ? "dark" : "light")

  return (
    <div className={clsx(
      'w-full flex items-center justify-between px-10 py-4',
      theme === "light" ? 'bg-gray-300 text-gray-800' : 'bg-gray-700 text-slate-400'
    )}>
      <div className='flex flex-col items-center select-none'>
        <div className='text-[30px] font-bold'>ToDo App</div>
        <div className='tracking-wider'>Your notes here</div>
      </div>

      <div> {/* change theme  */}
        <div className='select-none cursor-pointer' onClick={changeTheme}>
          {
            theme === "light" 
              ? 
            <Mode icon={<MdOutlineLightMode />} text="Light" />
              : 
            <Mode icon={<MdDarkMode />} text="Dark" />
          }
        </div>
      </div>
    </div>
  )
}

export default Header