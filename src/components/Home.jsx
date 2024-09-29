import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Modal, TextField } from '@mui/material';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { fireStoreDb } from '../fb-config';



function Home() {
    const [open, setOpen] = useState(false);
    const [allDocs, setAllDocs] = useState([]);
    const [docName, setDocName] = useState('');
    const [reload, setReload] = useState('');
    const navigate = useNavigate();

    const docsCollectionRef = collection(fireStoreDb, 'notes');

    const getAllDocs = async () => {
        const docsData = await getDocs(docsCollectionRef);
        const data = docsData.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        setAllDocs(data);
    };

    useEffect(() => {
        getAllDocs();
    }, [reload]);

    const addData = async () => {
        await addDoc(docsCollectionRef, {
            title: docName,
            description: ''
        });
        setReload(Date.now());
    };

    const deleteDocs = async (id) => {
        await deleteDoc(doc(fireStoreDb, 'notes', id));
        setReload(Date.now()); 
    };

    const handleEdit = data => {
        navigate('/edit', { state: data });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = e => {
        setDocName(e.target.value);
    };

    const handleAdd = () => {
        addData();
        alert(`Document ${docName} added successfully`);
        setDocName('');
        setOpen(false);
    };

  return (
    <>

<div style={{ textAlign: 'center', marginTop: '80px' }}>
                <Button style={{backgroundColor:'darkgreen'}} onClick={handleOpen} variant="contained">
                    Upload Document
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                       bgcolor: 'background.paper',
                        p: 4,
                        width: 400,
                        maxWidth: '90%'
                    }}
                >
                    <form onSubmit={handleAdd}>
                        <TextField
                            id="outlined-basic"
                            label="Doc Name"
                            variant="outlined"
                            onChange={e => handleChange(e)}
                            value={docName}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ padding: '15px', marginLeft: '20px', backgroundColor:'darkgreen' }}
                        >
                            Upload
                        </Button>
                    </form>
                </Box>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {
                allDocs.map(note => (
                    <Card key={note.id} sx={{ minWidth: 250, maxWidth: 400}} style={{border:"1px solid black"}}>
                        <CardContent>
                            <h1 style={{textAlign:'center',marginTop:'5px'}}>{note.title}</h1>
                            <p style={{textAlign:'justify'}}>{note.description.replace(/<[^>]+>/g, '')}</p>
                        </CardContent>
                        <CardActions style={{display:'flex',justifyContent:'center', marginBottom:'10px'}}>
                            <Button onClick={() => handleEdit(note)} size="small"><i className="fa-solid fa-pen-to-square"></i></Button>
                            <Button style={{color:'red'}} onClick={() => deleteDocs(note.id)} size="small"><i className="fa-solid fa-trash"></i></Button>
                          
                        </CardActions>
                    </Card>
                ))}
            </div>

    
    
    </>
  )
}

export default Home