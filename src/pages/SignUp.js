import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Timestamp } from 'firebase/firestore';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore, setDoc, doc } from '../firebaseConfig'


const defaultTheme = createTheme();
const db = firestore(); // db를 firestore()로 설정합니다.


export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [birth, setBirth] = React.useState(null); // birth를 초기값으로 null로 설정합니다.

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const onRegister = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Convert birth from Day.js object to Firestore Timestamp object
      const birthTimestamp = birth ? Timestamp.fromDate(new Date(birth.year(), birth.month(), birth.date())) : null;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        uid: user.uid,
        email: email,
        username: name,
        birth: birthTimestamp, // Use the Firestore Timestamp object
      });

      // 저장이 성공하면 성공 alert를 사용자에게 보여줍니다.
      alert('회원가입에 성공하셨습니다. 로그인 해주세요.');

      navigate('/'); // Redirect to login page
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          alert('이메일을 바르게 입력해주세요.');
          break;
        case 'auth/weak-password':
          alert('비밀번호가 너무 쉬워요.');
          break;
        case 'auth/email-already-in-use':
          alert('등록된 이메일 입니다.');
          break;
        default:
          alert('회원가입 실패');
          console.log(err);
          break;
      }
    }
  };

  function CheckAcount() {
    navigate("/SignIn");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography class='title' component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={birth}
                    onChange={(newValue) => setBirth(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Name"
                  label="이름"
                  name="Name"
                  autoComplete="family-name"
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일 주소"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
             
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onRegister}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={CheckAcount}>
                  {"이미 계정이 존재하나요?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
