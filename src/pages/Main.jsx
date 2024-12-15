import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'

const Main = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Content />
    </div>
  )
}

export default Main