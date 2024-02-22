import React, { useReducer } from "react";


const initialState= {count:0,step:1}
//now outside the component,we need to create this reducer function
//this function reducer takes two arguments 1.state which is the current state and 2.action
//but the real question is when this reducer function come into play?there comes the dispatch we created earlier
//note that this dispatch can also be used to update the state,
//but slightly in a different manner
function reducer(state,action){
  console.log(state,action);
  
  switch(action.type){
    case "dec":
      return {...state,count : state.count - state.step};
    case "inc":
      return {...state,count:state.count + state.step };
    case "setCount":
      return {...state,count:action.payload};
    case "setStep":
      return {...state,step:action.payload};
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown error");
  }
  
  
  // so the idea of the useReducer is that it basically takes the  current state and the action
  //and returns the next state
 // return state + action;
  //ie.the  whatever returning from here is the new state.

  //if(action.type === "inc") return state + action.payload;
  //if(action.type === "dec") return state - action.payload;
  //if(action.type === "setCount") return action.payload;
  
}

function DateCounter() {
  //const [count, setCount] = useState(0);
  //const [count , dispatch] = useReducer(reducer,0);
  


  //const [step, setStep] = useState(1);
  
  const [state,dispatch]=useReducer(reducer,initialState);
  const {count,step} = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
    dispatch({type:"dec"});
  };

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
    dispatch({type : "inc"});
    //as i said,the dispatch can be used similar to setState function.
    //so basically state is the current state which is 0 and action is the value 1
  };

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({type :"setCount", payload: Number(e.target.value)});
    //we dispatch this action to the reducer and  that action contains this value and based
    //our state value updated
  };

  const defineStep = function (e) {
    //setStep(Number(e.target.value));
    dispatch({type : "setStep",payload:Number(e.target.value)});
  };

  const reset = function () {
    dispatch({type : "reset"});
    //setCount(0);
    //setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
