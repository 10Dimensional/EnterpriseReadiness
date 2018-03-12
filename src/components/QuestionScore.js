import React, { Component } from 'react';
import { choicePointScore, selectedChoice } from '../utilities'
import Score from './Score'

class QuestionScore extends Component {
    render() {
        return (
            <Score circle={this.props.circle} score={choicePointScore(selectedChoice(this.props.question))} />
        )
    }
}

export default QuestionScore;