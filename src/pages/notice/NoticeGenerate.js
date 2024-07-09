import React from "react";

import Button from '@mui/material/Button';

import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const db = firestore(); // db를 firestore()로 설정합니다.

export default function NoticeGenerate() {
  const [title, setTitle] = React.useState("")
  const [detail, setDetail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [user, setUser] = React.useState('')
  const [userReady, setUserReady] = React.useState('')



  React.useEffect(() => {
    async function fetchData() {
      const query = await getDocs(collection(db, "users"));
      query.forEach((doc) => {
        setUser(doc.data())
      });
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserReady(true)
      }
    })

    fetchData();
  }, [])



  const navigate = useNavigate();


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onsubmit = async () => {
    try {

      // Save additional user data to Firestore
      await addDoc(collection(db, 'notice'), {
        name: user.username,
        title: title,
        detail: detail, // Use the Firestore Timestamp object
        password: password, // Use the Firestore Timestamp object
        timestamp: serverTimestamp(),
      });

      // 저장이 성공하면 성공 alert를 사용자에게 보여줍니다.
      alert('데이터 저장 성공.');

      navigate('/Dashboard'); // Redirect to login page
    } catch (err) {
      console.log(err);
    }


  }

  return (
    <>
      <input placeholder="제목" value={title} onChange={handleTitleChange} />
      <input placeholder="내용" value={detail} onChange={handleDetailChange} />
      <input placeholder="password" value={password} onChange={handlePasswordChange} />
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