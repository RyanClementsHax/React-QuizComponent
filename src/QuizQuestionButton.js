import React, { Component } from 'react';

class QuizQuestionButton extends Component {
    handleClick() {
        this.props.clickHandler(this.props.button_text, this.props.id);
    }

    render() {
        return (
            <li>
                <button className={ this.props.className } onClick={ this.handleClick.bind(this) }>
                    { this.props.button_text }
                </button>
            </li>
        );
    }
}

export default QuizQuestionButton;
