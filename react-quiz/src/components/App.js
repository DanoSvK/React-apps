import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SEC_PER_QUESTION = 30;

function filterQuetionsByMode(mode, originalList) {
  switch (mode) {
    case "easy":
      return originalList.filter((question) => question.points === 10);

    case "medium":
      return originalList.filter((question) => question.points === 20);

    case "hard":
      return originalList.filter((question) => question.points === 30);

    default:
      return originalList;
  }
}

const initialState = {
  allQuestions: [],
  filteredQuestions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  questionsLimit: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        allQuestions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "changeMode":
      return {
        ...state,
        filteredQuestions: filterQuetionsByMode(
          action.payload,
          state.allQuestions
        ),
        mode: action.payload,
      };
    case "start":
      // if (action.payload <= 0) {
      //   action.payload = 1;
      // } else if (action.payload > 15) {
      //   action.payload = 15;
      // }
      // const userLimit = action.payload;
      let userLimit = Math.max(1, Math.min(action.payload, 15));

      // INCORRECT (mutation)
      // if (!state.mode) state.filteredQuestions = state.allQuestions;

      // CORRECT (copy)
      const questionsToUse =
        state.mode === null ? state.allQuestions : state.filteredQuestions;

      return {
        ...state,
        status: "active",
        questionsLimit: userLimit,
        secondsRemaining: userLimit * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.allQuestions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        allQuestions: state.allQuestions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      filteredQuestions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      questionsLimit,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questionsLimit ?? filteredQuestions.length;
  const userQuestions = filteredQuestions.slice(0, questionsLimit);
  const userNumQuestions = userQuestions.length;
  const maxPossiblePoints = userQuestions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  console.log(filteredQuestions);
  console.log(userQuestions);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              userNumQuestions={userNumQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={filteredQuestions[index]}
              dispatch={dispatch}
              answer={answer}
              userQuestions={userQuestions}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                userNumQuestions={userNumQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
