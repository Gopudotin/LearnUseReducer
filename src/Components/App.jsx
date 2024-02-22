import React, { useEffect, useReducer } from 'react';
//import DateCounter from './DateCounter';
import Header from './Header';
import './index.css';
import Main from '../Components/Main';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import StartScreen from '../Components/StartScreen';
import Questions from '../Components/Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from '../Timer';
import Footer from '../Footer';

const SECS_PER_QUESTION=30;

const initialState= {
  questions:[],
  status : "Loading",
  index : 0,
  answer : null,
  points:0,
  highscore:0,
  secondsRemaining:null,
  
};

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
    case "start":
      return {
        ...state,
        status:"active",
        secondsRemaining:state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question=state.questions.at(state.index);
      return{
        ...state,
        answer:action.payload,
        points:
        action.payload===question.correctOption
        ?state.points + question.points
        :state.points,
      };
    case "nextQuestion":
      return {...state,index : state.index + 1,answer:null};
    case "finish":
      return {...state,status : "finished",
      highscore:
      state.points > state.highscore ? state.points :
      state.highscore,
    };

    case "restart":
  return {
    ...initialState,
    questions: state.questions,
    status: "ready"
  };

case "tick":
  return {
    ...state,
    secondsRemaining: state.secondsRemaining - 1,
    status:state.secondsRemaining === 0 ? "finished" : state.status,
  };




    default:
      throw new Error("Action unknown");
    }
}

function App() {

  //we need to display the state in the ui,so we need  a state

  //const [state,dispatch] = useReducer(reducer,initialState);

  //now we need to destructre the qustions and status here so that in Main component,
  //we can render different ui according to different status
  const [{questions,status,index,answer,points,highscore,secondsRemaining}, dispatch] = useReducer(reducer,initialState);
  const numberOfQuestions=questions.length;
  const maxPossiblePoints=questions.reduce(
    (prev,cur) => prev + cur.points,0
  )

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
        {/* here we can render different ui according to different status */}
        {status==='loading' && <Loader/>}
        {status==='error' && <Error/>}
        {status==="ready" && (
          <StartScreen 
          numberOfQuestions={numberOfQuestions}
          dispatch={dispatch} 
          />)}
        {status==='active' && (
        <>
        <Progress 
          index={index} 
          numsQuestions={numberOfQuestions}
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          answer={answer}  
        />

        <Questions
          question={questions[index]}
          dispatch={dispatch} 
          answer={answer} 
        />
        
        <Footer>
          <Timer
            dispatch={dispatch}
            secondsRemaining={secondsRemaining}
          
          />

          <NextButton
            dispatch={dispatch} 
            answer={answer} 
            numQuestions={numberOfQuestions}
            index={index}
          />
          </Footer>
       </> 
        )}
        {status === 'finished' && ( 
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highscore={highscore}
          dispatch={dispatch}
        /> )}

      </Main>


    </div>
  );
}

export default App;
