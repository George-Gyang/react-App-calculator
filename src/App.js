import React, { useReducer } from "react"
import DigitBtn from "./components/digitBtn"
import OperatorBtn from "./components/operatorBtn"

import "./App.css"

export const ACTION = {
  ADD_DIGIT: "addDigit",
  CHOOSE_OPERATION: "chooseOperation",
  CLEAR: "clear",
  DELETE_NUMBER: "deleteNumber",
  EVALUATE: "evaluate"
}

console.log(ACTION)

function reducer(state, { operationType, payload }) {
  switch (operationType) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperation: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperation === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperation.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperation: `${state.currentOperation || ""}${payload.digit}`,
      }
    case ACTION.CHOOSE_OPERATION:
      if (state.currentOperation == null && state.previousOperation == null) {
        return state
      }

      // to update operator
      if (state.currentOperation == null) {
        return {
          ...state,
          operator: payload.operator,
        }
      }

      if (state.previousOperation == null) {
        return {
          ...state,
          operator: payload.operator,
          previousOperation: state.currentOperation,
          currentOperation: null
        }
      }

      return {
        ...state,
        previousOperation: evaluate(state),
        operator: payload.operator,
        currentOperation: null
      }

    case ACTION.CLEAR:
      return {}

    case ACTION.DELETE_NUMBER:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperation: null
        }
      }
      if (state.currentOperation == null) return state
      if (state.currentOperation.length === 1) {
        return { ...state, currentOperation: null }
      }
      return {
        ...state,
        currentOperation: state.currentOperation.slice(0, -1),
      }

    case ACTION.EVALUATE:
      // to check if all our output are are empty then return the current state
      if (state.operator == null ||
        state.currentOperation == null ||
        state.previousOperation == null
      ) {
        return state
      }
      // else it should evaluate and sum the answer on the current operation and also clear the operator and the previous operation
      return {
        ...state,
        overwrite: true,
        previousOperation: null,
        operator: null,
        currentOperation: evaluate(state),
      }
  }

}

function evaluate({ currentOperation, previousOperation, operator }) {
  const current = parseFloat(currentOperation)
  const prev = parseFloat(previousOperation)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operator) {
    case "+":
      computation = prev + current
      break
    case "×":
      computation = prev * current
      break
    case "-":
      computation = prev - current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperation(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperation, previousOperation, operator }, distributtor] = useReducer(reducer, {})


  return (
    <div className="calculator-body" >
      <p>AltSchool-Assignment</p>

      <div className="buttons-group" >
        <div className="display">
          <div className="previous-operation ">{formatOperation(previousOperation)} {operator}</div>
          <div className="current-operation ">{formatOperation(currentOperation)}</div>
        </div>
        <button className="digits double-space" onClick={() => distributtor({ operationType: ACTION.CLEAR })}>C</button>
        <button className="digits " onClick={() => distributtor({ operationType: ACTION.DELETE_NUMBER })}>DEL</button>

        <OperatorBtn operator="+" distributtor={distributtor} />
        <DigitBtn digit="1" distributtor={distributtor} />
        <DigitBtn digit="2" distributtor={distributtor} />
        <DigitBtn digit="3" distributtor={distributtor} />

        <OperatorBtn operator="-" distributtor={distributtor} />
        <DigitBtn digit="4" distributtor={distributtor} />
        <DigitBtn digit="5" distributtor={distributtor} />
        <DigitBtn digit="6" distributtor={distributtor} />

        <OperatorBtn operator="×" distributtor={distributtor} />
        <DigitBtn digit="7" distributtor={distributtor} />
        <DigitBtn digit="8" distributtor={distributtor} />
        <DigitBtn digit="9" distributtor={distributtor} />

        <OperatorBtn operator="÷" distributtor={distributtor} />
        <DigitBtn digit="0" distributtor={distributtor} />
        <DigitBtn digit="." distributtor={distributtor} />
        <button className="digits double-space" onClick={() => distributtor({ operationType: ACTION.EVALUATE })}>=</button>
      </div>

    </div>
  );
}

export default App;
