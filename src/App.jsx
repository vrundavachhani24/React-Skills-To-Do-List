import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button, Input, NativeSelect } from '@mantine/core';


function App() {

  const [skill, setSkill] = useState('')
  const [addData, setAddData] = useState([])
  const [isaddData, setisAddData] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [iseditData, setisEditData] = useState(false)
  const [editid, setEditId] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [selectvalue, setSelectValue] = useState('Select Category')

  useEffect(() => {
    setCategoryData(addData)
  }, [addData])

  const handleTask = (event) => {
    setSkill(event.target.value)
  }

  const handleTaskAdd = () => {
    if (skill === '') {
      alert('Please enter your Skill')
      return;
    }
    const duplicatValue = addData.find((ele) => ele.skill === skill)
    if (duplicatValue) {
      alert('Please enter your different Skill')
      return;
    }
    const obj = { id: uuidv4(), skill , category:selectvalue}
    setAddData([...addData, obj])
    setSkill('')
    setIsDelete(false)
    setisAddData(false)
    setSelectValue('Select Category')
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setIsDelete(true)
  }

  const handleDeleteTask = () => {
    const Deletetask = addData.filter((ele) => ele.id !== deleteId)
    setAddData(Deletetask)
    setIsDelete(false)
  }

  const handleEditTask = (id) => {
    const EditTask = addData.find((ele) => ele.id === id)
    setEditId(id)
    setSkill(EditTask?.skill)
    setisEditData(true)
    setSelectValue(EditTask?.category)
  }

  const updateTask = () => {
    if(skill === '') {
      alert('Please Enter Your Skill')
      return;
    }
    if (selectvalue === 'Select Category') {
      alert('Please Select Your Category')
      return;
    }
    const updatedData = addData.map((ele) => {
      if (ele.id === editid) {
        return { id: ele.id, skill , category:selectvalue }
      }
      return ele;
    })
    setAddData(updatedData);
    setSkill('')
    setisEditData(false)
    setSelectValue('Select Category')
  }
  console.log(addData)

  const filterDataByCategory = (event) => {
    const categoryName = event.target.name;
    if (categoryName === 'All') {
      setCategoryData(addData)
    } else {
      const filteredData = addData.filter((ele) => ele.category === categoryName);
      setCategoryData(filteredData)
    }
  }

  const handleModelCancel = () => {
    setSkill('')
    setisEditData(false)
    setisAddData(false)
    setIsDelete(false)
    setSelectValue('Select Category')
  }

  return (
    <div className='text-center rounded-3xl text-white bg-linear-60 from-purple-600 to-pink-600 shadow-xl shadow-gray-400 mt-5 p-5 w-lg place-self-center'>
      <div className='p-3'>
        <div className='flex justify-between'>
          <h1 className='text-4xl'>Skills</h1>

          <Modal opened={isaddData} onClose={() => setisAddData(false)} title={'Add Skills'}>
            <div>
              <Input placeholder="Add Your Skills" value={skill} onChange={handleTask} />
              <NativeSelect value={selectvalue} onChange={(ele) => { setSelectValue(ele.target.value) }} data={['Select Category', 'Frontend', 'Backend']} className='mt-3' />
              <Button variant="filled" onClick={handleTaskAdd} className='ms-3 mt-3' color="rgba(5, 158, 33, 1)"> Add Data</Button>
              <Button variant="filled" onClick={handleModelCancel} className='ms-3 mt-3' color="rgba(235, 30, 30, 1)">Cancel Data</Button>
            </div>
          </Modal>

          <div>
            <Button variant="default" onClick={() => { setisAddData(true) }} className='shadow-xl'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
            </svg></Button>
          </div>
        </div>

        <div className='flex gap-10 mt-8 items-center justify-center'>
          <button name='All' onClick={filterDataByCategory} className='shadow-sm shadow-white p-3 rounded cursor-pointer'>All</button>
          <button name='Frontend' onClick={filterDataByCategory} className='shadow-sm shadow-white p-3 rounded cursor-pointer'>Frontend</button>
          <button name='Backend' onClick={filterDataByCategory} className='shadow-sm shadow-white p-3 rounded cursor-pointer'>Backend</button>
        </div>

        <Modal opened={isDelete} onClose={() => setIsDelete(false)} title={'Are you sure?'}>
          <Button variant="filled" onClick={handleDeleteTask} className='ms-3 mt-3' color="rgba(5, 158, 33, 1)">save</Button>
          <Button variant="filled" onClick={() => setIsDelete(false)} className='ms-3 mt-3' color="rgba(235, 30, 30, 1)">Cancel</Button>
        </Modal>

        <Modal opened={iseditData} onClose={handleModelCancel} title={'Edit Your Skill'}>
          <Input placeholder="Add Your Skills" value={skill} onChange={handleTask} name='value' />
          <NativeSelect value={selectvalue} onChange={(ele) => { setSelectValue(ele.target.value) }} data={['Frontend', 'Backend']} className='mt-3' />
          <Button variant="filled" onClick={updateTask} className='ms-3 mt-3' color="rgba(5, 158, 33, 1)">Update</Button>
          <Button variant="filled" onClick={handleModelCancel} className='ms-3 mt-3' color="rgba(235, 30, 30, 1)">Cancel</Button>
        </Modal>
      </div>
      {
        categoryData.map((ele) => {
          return (
            <div key={ele.id} className='p-2 mt-5 flex items-center justify-between bg-linear-60 from-purple-400 to-pink-400 shadow-xl'>{ele.skill}
              <div>
                <Button variant="filled" onClick={() => { handleEditTask(ele?.id) }} className='ms-3' color="rgba(5, 158, 33, 1)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg></Button>
                <Button variant="filled" onClick={() => { handleDeleteClick(ele?.id) }} className='ms-3' color="rgba(235, 30, 30, 1)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
                </Button>
              </div>
            </div>
          )
        })
      }
    </div>

  )
}

export default App
