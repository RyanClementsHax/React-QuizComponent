import React from 'react';
import { assert } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import QuizQuestion from '../../QuizQuestion.js';

describe('QuizQuestion Component', () => {
    let component, mockQuestion, answers, correctAnswer, nextQuestionHandlerSpy;

    beforeEach(() => {
        correctAnswer = 0;
        answers = ["5", "6", "7", "8"]
        mockQuestion = {
          instruction_text: "How many continents are there on Planet Earth?",
          answer_options: answers,
          answer: answers[correctAnswer]
        };
        nextQuestionHandlerSpy = sinon.spy()
        component = shallow(
            <QuizQuestion
                quiz_question={ mockQuestion }
                showNextQuestionHandler={ nextQuestionHandlerSpy } />
        );
    })

    describe('when a button is clicked', () => {
        it('sets the class of only that button to correct if the answer is correct', () => {
            component.setState({ isAnswerCorrect: true, selectedIndex: correctAnswer });
            const buttons = component.find('QuizQuestionButton');

            buttons.forEach(element => {
                if(element.key() == correctAnswer) {
                    assert(element.hasClass('correct'), "The correct button doesn't have the corresponding class");
                } else {
                    assert(!element.hasClass('correct'), "A non-selected button has the correct class")
                    assert(!element.hasClass('incorrect'), "A non-selected button has the incorrect class");
                }
            });
        });

        it('sets the class of only that button to incorrect if the answer is incorrect', () => {
            const incorrectAnswer = 1;
            component.setState({ isAnswerCorrect: false, selectedIndex: incorrectAnswer });
            const buttons = component.find('QuizQuestionButton');

            buttons.forEach(element => {
                if(element.key() == incorrectAnswer) {
                    assert(element.hasClass('incorrect'), "The incorrect button doesn't have the corresponding class");
                } else {
                    assert(!element.hasClass('correct'), "A non-selected button has the correct class")
                    assert(!element.hasClass('incorrect'), "A non-selected button has the incorrect class");
                }
            });
        });
    });

    describe('handleContinueClick()', () => {
        it('resets the state and calls handler when called', () => {
            const initialState = component.state();
            component.instance().handleClick(mockQuestion.answer_options[correctAnswer], correctAnswer);

            component.instance().handleContinueClick();

            const resultState = component.state();
            assert(JSON.stringify(initialState) == JSON.stringify(resultState), "The component did not reset the state");
            assert(nextQuestionHandlerSpy.calledOnce, "showNextQuestionHandler() was not called");
        });
    });
});