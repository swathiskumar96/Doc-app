import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { fireStoreDb } from '../fb-config';
import { useLocation } from 'react-router-dom'
import { updateDoc,doc } from 'firebase/firestore';


function Edit() {

    const location = useLocation()
    const data = location.state
    const [displayValue,setDisplayValue] = useState(data.description)
  
    const handleChange =(e)=>{
      setDisplayValue(e)
    }
      
    const editDescription = async()=>{
      const oneDoc = doc(fireStoreDb,'notes',data.id)
      console.log(oneDoc);
      updateDoc(oneDoc,{description:displayValue})
    }
  
    useEffect(()=>{
      editDescription()
    },[displayValue])
  
  return (
    <>
        <div style={{marginTop:'80px'}}>
        <h1 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>{data.title}</h1>
        <ReactQuill style={{height:'100px'}} placeholder='Enter details here....' theme="snow" value={displayValue} onChange={(e)=>handleChange(e)} />
      </div>

    </>
  )
}

export default Edit