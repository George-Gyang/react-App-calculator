import React from "react";
import { ACTION } from "../App";

import "../App.css"

export default function DigitBtn({ distributtor, digit }) {
    return (
    <button className="digits" onClick={() => distributtor({ operationType: ACTION.ADD_DIGIT, payload: { digit } })} >{digit}</button>
)}
