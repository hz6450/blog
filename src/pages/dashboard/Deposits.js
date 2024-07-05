import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './Deposits.css';

import TicTacto from "../../assets/TicTacTo.png"



export default function Deposits() {
  const navigate = useNavigate();
function TicTacTo() {

  navigate("/TicTacTo");
}
  return (
    <React.Fragment>
      <h1 class="Title">게임하러가기</h1>
        <img src={TicTacto} onClick={TicTacTo} ></img>
    </React.Fragment>
  );
}

