import React, { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { useAppContext } from '../hooks/context'

const AddForm = ({setModal, title, text, btnText, id}) => {
  const [form, setForm] = useState({
    title: title,
    text: text
  })

  useEffect(() => {
    setForm({
      title: title,
      text: text  
    })
  }, [title, text])

  const {setTodos} = useAppContext()

  const resetAndCloseForm = () => {
    const resetForm = {}
    for(const field in form) {
      resetForm[field] = ''
    }
    setForm(resetForm)

    setModal(false)
  }

  const handleAddTodo = (event) => {
    event.preventDefault()

    setTodos((prev) => ([...prev, {
      date: Date.now(),
      completed: false,
      title: form.title,  
      text: form.text,
      id: Date.now()
    }]))

    resetAndCloseForm()
  }

  const handleUpdateTodo = (event) => {
    event.preventDefault()

    setTodos((prev) => 
      prev.map(
        (todo) => {
          if(todo.id !== id) return todo
          else return {
            ...todo,
            text: form.text,
            title: form.title
          }
        }
      )
    )

    resetAndCloseForm()
  }

  return (
    <div className='pt-8'>
      <form>
        <div className='grid grid-rows-[45px,auto,45px] gap-4'>

          <div>
            <Input type='text' placeholder='Todo title...' value={form.title} setValue={(val) => setForm((prev) => ({...prev, title: val}))} />
          </div>

          <div className='max-w-[450px]'>
            <textarea 
              id="textarea" 
              placeholder='Todo text' 
              className='border border-black resize w-[400px] h-[120px] max-w-full p-2 rounded-md'
              value={form.text}
              onChange={(event) => setForm((prev) => ({...prev, text: event.target.value}))}
            >

            </textarea>
          </div>

          <div>
            <Button text={btnText} onClick={btnText === 'Add' ? handleAddTodo : handleUpdateTodo} />
          </div>

        </div>
      </form>
    </div>
  )
}

export default AddForm