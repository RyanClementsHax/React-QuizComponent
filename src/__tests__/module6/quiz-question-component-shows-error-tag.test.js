import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import { shallow } from 'enzyme';
import { assert } from 'chai';

let quizQuestionComponentExists = false;
let QuizQuestion;
try {
  QuizQuestion = require('../../QuizQuestion.js').default;
  quizQuestionComponentExists = true;
} catch (e) {
  quizQuestionComponentExists = false;
}

describe('QuizQuestion Component', () => {
  it('shows error paragraph tag if (!isAnswerCorrect && selectedIndex != null) @quiz-question-component-shows-error-tag', () => {
    assert(quizQuestionComponentExists, "The QuizQuestion component hasn't been created yet.")

    let mock_prop = {
      instruction_text: "How many continents are there on Planet Earth?",
      answer_options: ["5", "6", "7", "8"]
    }

    let quizQuestion;
    try {
      quizQuestion = shallow(<QuizQuestion quiz_question={mock_prop} />)
    } catch (e) {
      assert(false, "We weren't able to mount the QuizQuestion component.")
    }

    assert(quizQuestion.state() != null, "The QuizQuestion component isn't starting with the correct default state declared in the constructor function.")

    assert(quizQuestion.state().isAnswerCorrect === false && quizQuestion.state().selectedIndex === null, "The QuizQuestion component's state should start out with a key of `isAnswerCorrect` set to `false` and a key of `selectedIndex` set to `null`.")

    quizQuestion.setState({ isAnswerCorrect: false, selectedIndex: 0 })

    const errorShouldShow = quizQuestion.state().isAnswerCorrect === false
      && quizQuestion.state().selectedIndex !== null

    assert(errorShouldShow && quizQuestion.find('.error').length == 1, "When the QuizQuestion component's state has a key of `isAnswerCorrect` with a value of `false` and a key of `selectedIndex` not equal to `null`, a paragraph tag with the className `error` should be displayed.")

    assert(quizQuestion.find('.error').text() != '', "When the QuizQuestion component's state has a key of `isAnswerCorrect` with a value of `false` and a key of `selectedIndex` not equal to `null`, a paragraph tag with the className `error` with some error message text should be displayed.")
  })
})