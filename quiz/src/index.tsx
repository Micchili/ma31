import * as React from 'react';
import { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import data from './data.json'

type AnswerProps = {
  key: number
  text: string
  clickItem: (text: string) => void
}

type CorrectProps = {
  is_correct: boolean
}

type QuizProps = {
  data: any //JSONの型闇では？？
}

const Answer: React.FC<AnswerProps> = props => {
  return (
    <li
      key={props.key}
      onClick={() => props.clickItem(props.text)}
    >
      {props.text}
    </li>
  )
}

const CorrectAnswer: React.FC<CorrectProps> = props => {
  return (
    <div className="sample">
      <div>{props.is_correct ? "正解" : "不正解"}</div>
      <div>答え: {props.children}</div>
    </div>
  )
}

const Quiz: React.FC<QuizProps> = props => {
  const [quizList, setQuizList] = useState(props.data);
  const [pageNumber, setPageNumber] = useState(0);
  const [isAnswer, setIsAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useCallback(() => {
    setQuizList(props.data);
    setIsAnswer(false);
    setIsCorrect(false);
  }, [props.data]);

  const judgeAnswer = (choice: string) => {
    const choice_index = data.quiz[pageNumber].answer.indexOf(choice);

    setIsAnswer(true);
    setIsCorrect(choice_index === data.quiz[pageNumber].correct);
  };

  const chanageNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <section>
      <h1> {data.quiz[pageNumber].title} </h1>
      <ul>
        {data.quiz[pageNumber].answer.map((item: any) => {
          return (
            <Answer
              key={item}
              clickItem={(choice: string) => judgeAnswer(choice)}
              text={item}
            ></Answer>
          );
        })}
      </ul>
      {isAnswer && (
        <CorrectAnswer
          is_correct={isCorrect}
        >{data.quiz[pageNumber].answer[data.quiz[pageNumber].correct]}</CorrectAnswer>
      )}
      {
        quizList.length - 1 !== pageNumber && (
          <button onClick={() => chanageNextPage()}>次へ</button>
        )
      }
    </section>
  )
}

ReactDOM.render(<Quiz data={data}/>, document.getElementById('root'));
