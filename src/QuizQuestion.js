import React, { Component } from 'react';
import QuizQuestionButton from './QuizQuestionButton';

class QuizQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAnswerCorrect: false,
            selectedIndex: null
        }
    }

    handleClick(buttonText, index) {
        if(buttonText === this.props.quiz_question.answer) {
            this.setState({
                isAnswerCorrect: true,
                selectedIndex: index
            });
        } else {
            this.setState({
                isAnswerCorrect: false,
                selectedIndex: index
            });
        }
    }

    handleContinueClick() {
        if(this.state.isAnswerCorrect) {
            this.setState({
                isAnswerCorrect: false,
                selectedIndex: null
            });
            this.props.showNextQuestionHandler()
        }
    }

    render() {
        return (
            <main>
                <section>
                    <p>{ this.props.quiz_question.instruction_text }</p>
                </section>
                <section>
                    <ul>
                        {
                            this.props.quiz_question.answer_options.map((answer_option, index) => {
                                const buttonClass = 
                                this.state.selectedIndex === index ? 
                                    (this.state.isAnswerCorrect ?
                                        'correct' :
                                        'incorrect') :
                                    '';

                                return <QuizQuestionButton
                                            id={ index }
                                            key={ index }
                                            button_text={ answer_option }
                                            clickHandler={ this.handleClick.bind(this) }
                                            className={ buttonClass } />
                            })
                        }
                    </ul>
                </section>
                { (!this.state.isAnswerCorrect && this.state.selectedIndex != null) && <p className='error'>Sorry, that's not right</p> }
                <button disabled={ !this.state.isAnswerCorrect } onClick={ this.handleContinueClick.bind(this) }>Continue</button>
            </main>
        );
    }
}

export default QuizQuestion;
