import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const db = firestore();

export default function Notice() {
  const [notices, setNotices] = React.useState([]); // State to hold the notices data

  React.useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "notice"));
      const fetchedNotices = [];
      querySnapshot.forEach((doc) => {
        // Extract data from each document
        const { name, title,  timestamp } = doc.data();
        // Push into fetchedNotices array
        fetchedNotices.push({ name, title,  timestamp });
      });
      // Set the state with fetched notices
      setNotices(fetchedNotices);
    }
    fetchData(); // Call fetchData() when component mounts
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Notices</Title>
      <div align="right">
        <Button variant="contained" component={Link} to="/NoticeGenerate">글쓰기</Button>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성시간</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice, index) => (
            <TableRow key={index} component={Link} to="/NoticeDetail">
              <TableCell>{notice.name}</TableCell>
              <TableCell>{notice.title}</TableCell>
              <TableCell>{notice.timestamp.toDate().toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
