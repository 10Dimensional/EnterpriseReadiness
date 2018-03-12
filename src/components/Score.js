import React, { Component } from 'react';
import { scoreLabel } from '../utilities'


class Score extends Component {
    render() {
        const label = scoreLabel(this.props.score)
        return (
            <span className={(this.props.circle ? 'circle-' : '') + 'score-' + label}>
                {label}
            </span>
        )
    }
}

export default Score;