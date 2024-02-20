import React, { useEffect, useReducer } from 'react';
//import DateCounter from './DateCounter';
import Header from "./Header";
import './index.css';
import Main from './Main';

const initialState= {}
function reducer(state ,action){
 switch (action.type) {
  case 'dataReceived':
    //here we need to return a new state object
    //and we will assign this data to the questions..ie 
    //initailly the questions array is set to empty.
    return{
      ...state,
      //so basically we updated two pieces data in one dispatch
      //which is one of the advantage of the useReducer.

      questions:action.payload,
      status:"ready",  
    };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
    }
}

function App() {

  //we need to display the state in the ui,so we need  a state
  const [state,dispatch] = useReducer(reducer,initialState);

  useEffect( function() {
    fetch("http://localhost:8000/questions")
    .then( (res) => res.json())
    .then ((data) => dispatch({type:'dataReceived',payload : data}))
    .catch((err) => dispatch({type: 'dataFailed'}));
  }, []);


  return (
    <div className='app'>
      {/*<DateCounter/>*/}
      <Header/>

      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>


    </div>
  );
}

export default App;
