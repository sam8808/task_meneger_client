import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useAppContext } from '../hooks/context'
import { IoIosAddCircle } from "react-icons/io";
import { Modal, Select } from 'antd';
import AddForm from './AddForm';
import { MdDeleteForever } from "react-icons/md";
import { FaPenToSquare } from 'react-icons/fa6';


const TodoApp = () => {
  const {theme, todos, setTodos} = useAppContext()

  const [showTodos, setShowTodos] = useState(todos)

  const [modal, setModal] = useState(false)
  const [select, setSelect] = useState('all')

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [id, setId] = useState(void 0)
  const [btnText, setBtnText] = useState('Add')

  useEffect(() => {
    switch(select) {
      case "all":
        setShowTodos(todos)
        break
      case "completed":
        setShowTodos(todos.filter((todo) => todo.completed === true))
        break
      case "incomplete":
        setShowTodos(todos.filter((todo) => todo.completed === false))
        break
    }
  }, [select, todos])

  const showCreateFormModal = () => {
    setText('')
    setTitle('')
    setBtnText('Add')
    setModal(true)
  }

  const showUpdateFormModal = (index) => {
    const todo = todos[index]
    setText(todo.text)
    setTitle(todo.title)
    setBtnText('Update')
    setId(todo.id)
    setModal(true)
  }

  const handleOnDragEnd = (result) => {
    const { destination, source } = result

    if (!destination) return

    if (destination.index === source.index) return

    const reorderedTodos = Array.from(showTodos)
    const [movedItem] = reorderedTodos.splice(source.index, 1) 
    reorderedTodos.splice(destination.index, 0, movedItem) 

    setShowTodos(reorderedTodos)
    setTodos(reorderedTodos) 
  }

  const handleOnCheck = (event, id) => {
    // const updatedArray = [...todos]
    // updatedArray[index].completed = event.target.checked
    // setTodos(updatedArray)
    const updatedArray = [...todos]
    setTodos(updatedArray.map((todo) => {
      if(todo.id !== id) return todo
      else return {
        ...todo,
        completed: event.target.checked
      }
    }))
  }

  const convertDate = (date) => {
    const d = new Date(date)
    const result = `${d.toLocaleDateString()} ${d.getHours()}:${d.getMinutes()}`

    return result
  }

  const removeTodo = (index) => {
    const updatedArray = [...todos]
    updatedArray.splice(index, 1)
    setTodos(updatedArray)
  }

  return (
    <div className={
      clsx(
        'h-fit w-[70vw] min-h-24 px-8 py-4 border-2 rounded-md select-none',
        theme === "dark" ? 'text-white' : '',
        
      )
    }>
      <div className='select-none flex justify-between mb-8'>
        <div className='flex items-center gap-2'>

          <div>
            Your todos
          </div>

          <div>
            <Select 
              options={[
                {value: 'all', label: 'All'},
                {value: 'completed', label: 'Completed'},
                {value: 'incomplete', label: 'Incomplete'}
              ]}
              value={select}
              onChange={(value) => setSelect(value)}
              className='h-[20px] w-[120px] !text-[12px]'
              dropdownRender={(menu) => (
                <div className=''>
                  {menu}
                </div>
              )}
            />
          </div>

        </div>

        <div className='flex items-center gap-1'>
          <div className='text-[14px]'>
            Add a todo
          </div>
          <div className='translate-y-[2px] cursor-pointer' onClick={showCreateFormModal}>
            <IoIosAddCircle className='text-green-500 text-[25px]' />
          </div>
        </div>
      </div>
      {
        todos.length > 0 
          &&
        <div>
          {JSON.stringify({list: showTodos})}
        </div>
        // <DragDropContext onDragEnd={handleOnDragEnd}>
        //   <Droppable droppableId='list'>
        //     {(provided) => (
        //       <div
        //         {...provided.droppableProps}
        //         ref={provided.innerRef}
        //       >
        //       {
        //           showTodos.map((todo, index) => (
        //             <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
        //               {(provided) => (
        //                 <div 
        //                   className='flex gap-4 items-end mb-6 justify-between'
        //                   {...provided.draggableProps}
        //                   {...provided.dragHandleProps}
        //                   ref={provided.innerRef}
        //                 >
                          
        //                   <div className='max-w-[85%]'>
        //                     <div className='text-lg'>{todo.title}</div>
        //                     <div className='text-sm'>{todo.text}</div>
        //                   </div>
        
        //                   <div className='flex flex-col items-end'>
        //                     <div className='mb-2 flex items-center gap-2'>
        //                       <div className='cursor-pointer text-blue-600' onClick={() => showUpdateFormModal(index)}>
        //                         <FaPenToSquare />
        //                       </div>

        //                       <div onClick={() => removeTodo(index)}>
        //                         <MdDeleteForever className='text-red-700 cursor-pointer text-[22px]' />
        //                       </div>
        //                     </div>
                            
        //                     <div>
        //                       <div className='text-sm'>
        //                         {convertDate(todo.date)}
        //                       </div>

        //                       <div className='flex gap-2 cursor-pointer'>
        //                         <div className='cursor-pointer'>Completed</div>
        //                         <div>
        //                           <input className='translate-y-[2px] cursor-pointer' type="checkbox" checked={todo.completed} onChange={(event) => handleOnCheck(event, todo.id)} />
        //                         </div>
        //                       </div>
        //                     </div>
        //                   </div>  

        //                 </div>
        //               )}
        //             </Draggable>
        //           ))
        //         }
        //         {provided.placeholder}
        //       </div>
        //     )}
        //   </Droppable>
        // </DragDropContext>
      }

      {
        todos.length === 0 
          &&
        <div className='text-[14px]'>No todos yet...</div>
      }

      {
        showTodos.length === 0 && todos.length !== 0
          &&
        <div>
          {select.charAt(0).toUpperCase() + select.slice(1)} todos not found...
        </div>
      }

      <Modal  
        open={modal} 
        footer={false} 
        onCancel={() => setModal(false)}
      >
        <AddForm setModal={setModal} btnText={btnText} text={text} title={title} id={id} />
      </Modal>
    </div>
  )
}

export default TodoApp
