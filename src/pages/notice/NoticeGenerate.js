import React from "react";

import Button from '@mui/material/Button';

import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'
import { useNavigate } from "react-router-dom";

const db = firestore(); // db를 firestore()로 설정합니다.

export default function NoticeGenerate() {
    const [name, setName] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [detail, setDetail] = React.useState("")

    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
      const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
    
      const handleDetailChange = (event) => {
        setDetail(event.target.value);
      };

    const onsubmit = async () => {
        try {

            // Save additional user data to Firestore
            await addDoc(collection(db, 'notice'), {
              name: name,
              title: title,
              detail: detail, // Use the Firestore Timestamp object
            });
      
            // 저장이 성공하면 성공 alert를 사용자에게 보여줍니다.
            alert('데이터 저장 성공.');
      
            navigate('/Notice'); // Redirect to login page
          } catch (err) {
            console.log(err);
            }
            
          
    }

    return(
        <>
              <input placeholder="이름" value={name} onChange={handleNameChange}/>
              <input placeholder="제목" value={title} onChange={handleTitleChange}/>
              <input placeholder="내용" value={detail} onChange={handleDetailChange}/>
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onsubmit}
            >
              Sign Up
            </Button>
        </>
    )
}