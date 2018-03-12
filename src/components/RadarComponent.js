import React, { Component } from 'react';
import Radar from 'react-d3-radar';
import { choicePointScore, selectedChoice } from '../utilities'

class RadarComponent extends Component {
    render() {
        return (
            <Radar
                width={485}
                height={450}
                padding={70}
                domainMax={4}
                highlighted={null}
                data={{
                    variables: this.props.questions.map((question, index) => {
                        return { key: question.id, label: question.text }
                    }),
                    sets: [{
                        key: 'res',
                        values: this.props.questions.reduce((result, question) => {
                            return Object.assign(result, { [question.id]: choicePointScore(selectedChoice(question)) })
                        }, {})
                    }]
                }}
            />
        )
    }
}

export default RadarComponent;