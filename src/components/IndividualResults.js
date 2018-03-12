import React, { Component } from 'react';
import { Media } from 'react-bootstrap';
import { selectedChoice, getLinkLearnMore } from '../utilities'
import QuestionScore from './QuestionScore'

class IndividualResults extends Component {
    render() {
        return (
            <Media>
              {this.props.questions.map((question, index) => {
                return (
                  <div key={question.id} className={'question-id-' + question.id}>
                    <Media.Left>
                      <div className='category-img' />
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>
                        <p className='question-text'>
                          {question.text}
                          <QuestionScore circle question={question}/>
                        </p>
                      </Media.Heading>
                      <p className='answer'> Your answer: </p>
                      <p className='answer'>{selectedChoice(question).text} </p>
                      <p className='recommendation'>{selectedChoice(question).recommendation}</p>
                      <a className='learn-more' target='_blank' href={getLinkLearnMore(question.id)}>
                        <span>Learn More </span>
                        <span className='learn-more-icon glyphicon glyphicon-chevron-right'></span>
                      </a>
                    </Media.Body>
                  </div>
                )
              })}
            </Media>
        )
    }
}

export default IndividualResults;