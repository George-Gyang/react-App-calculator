import React from "react";
import { ACTION } from "../App";

import "../App.css"

export default function OperatorBtn({distributtor, operator}){
    return (
    <button className="digits" onClick={()=> distributtor({ operationType: ACTION.CHOOSE_OPERATION, payload:{operator} })}>{operator}</button>
)
}
