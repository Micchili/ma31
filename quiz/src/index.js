import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let data = require("./data.json");

class Answer extends React.Component {
  render() {
    return (
      <li
        key={this.props.key}
        onClick={() => this.props.clickItem(this.props.text)}
      >
        {this.props.text}
      </li>
    );
  }
}

class CorrectAnswer extends React.Component {
  render() {
    return (
      <div className="sample">
        <div>{this.props.is_correct ? "正解" : "不正解"}</div>
        <div>答え: {this.props.correct_text}</div>
      </div>
    );
  }
}
class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz_list: this.props.data,
      number: 0,
      is_answer: false,
      is_correct: false
    };
  }
  render() {
    let quiz = this.state.quiz_list[this.state.number];

    return (
      <section>
        <h1> {quiz.title} </h1>
        <ul>
          {quiz.answer.map(item => {
            return (
              <Answer
                key={item}
                text={item}
                clickItem={choice => this.answer(choice)}
              />
            );
          })}
        </ul>
        {this.state.is_answer && (
          <CorrectAnswer
            is_correct={this.state.is_correct}
            correct_text={quiz.answer[quiz.correct]}
          />
        )}
        <button onClick={() => this.next()}>次へ</button>
      </section>
    );
  }

  answer(choice) {
    let quiz = this.state.quiz_list[this.state.number];
    let choice_index = quiz.answer.indexOf(choice);
    this.setState({
      quiz_list: this.props.data,
      number: 0,
      is_answer: true,
      is_correct: choice_index === quiz.correct
    });
  }
  next() {
    this.setState({
      quiz_list: this.props.data,
      number: this.state.number + 1,
      is_answer: false,
      is_correct: false
    });
  }
}

ReactDOM.render(<Quiz data={data.quiz} />, document.getElementById("root"));
