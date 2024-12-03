import { useEffect, useMemo } from "react";
import { useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import NextQuestion from "./NextQuestion";
import Timer from "./Timer";
// import TextExpander
//  from "./TextExpander";
// const content = [
//   {
//     summary: "React is a library for building UIs",
//     details:
//       "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
//   {
//     summary: "State management is like giving state a home",
//     details:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
//   {
//     summary: "We can think of props as the component API",
//     details:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   },
// ];
const SECPERQUESTION = 30;
const initialState = {
  questions: [],
  // loading  ,error , ready , active , finished
  status: "loading",
  answer: null,
  highscore: 0,
  index: 0,
  points: 0,
  timeRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECPERQUESTION,
      };
    case "newAnswered":
      const currentQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };

    case "next":
      return { ...state, index: state.index + 1, answer: null };

    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finish" : state.status, 
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        timeRemaining: 0,
      };

    case "restart":
      return { ...state, index: 0, answer: null, status: "ready", points: 0 };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, answer, points, index, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  
  useEffect(function () {
    fetch("http://localhost:3100/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);
  const totalPoints = useMemo(
    () => questions.reduce((prev, cur) => prev + cur.points, 0),
    [questions]
  );
  
  const qNums = questions.length;
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen qNums={qNums} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={qNums}
              points={points}
              total={totalPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions.at(index)}
              qNums={qNums}
              index={index}
            />
            <Footer>
              <Timer {...{ timeRemaining, dispatch }} />
              <NextQuestion
                qNums={qNums}
                index={index}
                dispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            total={totalPoints}
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>

      {/* <Tabbed content={content} />

      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander> */}
    </div>
  );
}
