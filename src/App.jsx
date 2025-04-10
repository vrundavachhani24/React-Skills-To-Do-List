import { useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Input, Group, Text, Badge } from '@mantine/core';


function App() {

  const [skill, setSkill] = useState('')
  const [addData, setAddData] = useState([])
  const [isaddData, setisAddData] = useState(false)
  const [iseditData, setisEditData] = useState(false)
  const [editid, setEditId] = useState('')


  const handleTask = (event) => {
    setSkill(event.target.value)
  }

  const handleTaskAdd = () => {
    if(skill === ''){
      alert('Please enter your Value')
      return;
    }
    const duplicatValue = addData.find((ele) => ele.skill === skill)
    if(duplicatValue){
      alert('Please enter your different Value')
      return;
    }
    const obj = { id: uuidv4(), skill }
    setAddData([...addData, obj])
    setSkill('')
    setisAddData(false)
  }

  const handleDeleteTask = (id) => {
    const Deletetask = addData.filter((ele) => ele.id !== id)
    setAddData(Deletetask)
  }

  const handleEditTask = (id) => {
    const EditTask = addData.find((ele) => ele.id === id)
    setEditId(id)
    setSkill(EditTask?.skill)
    setisEditData(true)
  }

  const updateTask = () => {
    const updatedData = addData.map((ele) => {
      if (ele.id === editid) {
        return { id: ele.id, skill }
      }
      return ele;
    })
    setAddData(updatedData);
    setSkill('')
    setisEditData(false)
  }
  

  const handleModelCancel = () => {
    setSkill('')
    setisEditData(false)
    setisAddData(false)
  }

  return (
    <div className='text-center rounded-3xl text-white bg-linear-60 from-purple-600 to-pink-600 shadow-xl shadow-gray-400 mt-5 p-5 w-lg place-self-center'>
      <div className='p-3 flex justify-between'>
        <h1 className='text-4xl'>Skills</h1>

        <Modal opened={isaddData || iseditData} onClose={handleModelCancel} title={iseditData ? 'Edit Skill' : 'Add Skills'}>
          <div>
            <Input placeholder="Add Skills" value={skill} onChange={handleTask} className='p-2' />
            <Button variant="filled" onClick={iseditData ? updateTask : handleTaskAdd} className='ms-3 mt-3' color="rgba(5, 158, 33, 1)"> {isaddData ? 'Add Data' : 'Update Data'}</Button>
            <Button variant="filled" onClick={handleModelCancel} className='ms-3 mt-3' color="rgba(235, 30, 30, 1)">Cancel Data</Button>
          </div> 
        </Modal>
        <Button variant="default" onClick={() => { setisAddData(true) }}>+</Button>

      </div>
      {
        addData.map((ele) => {
          return (
            <div key={ele.id} className='p-2 mt-5 flex items-center justify-between bg-linear-60 from-purple-400 to-pink-400 shadow-xl'>{ele.skill}
              <div>
                <Button variant="filled" onClick={() => { handleEditTask(ele.id) }} className='ms-3' color="rgba(5, 158, 33, 1)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg></Button>
                <Button variant="filled" onClick={() => { handleDeleteTask(ele.id) }} className='ms-3' color="rgba(235, 30, 30, 1)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg></Button>
              </div>
            </div>
          )
        })
      }
    </div>

  )
}

export default App
