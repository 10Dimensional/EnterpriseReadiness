import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Radar from 'react-d3-radar';
import { Media } from 'react-bootstrap';
import Score from './Score';
import QuestionScore from './QuestionScore';
import { choicePointScore, selectedChoice, getLinkLearnMore, finalScore } from '../utilities'

const assessment = gql`
  query assessment($assessmentId: String!) {
    assessment(id: $assessmentId) {
      questions {
        id,
        text,
        description,
        question,
        choices {
          id,
          text,
          recommendation,
          isSelected,
          weight
        }
      }
    } 
  }
  `

class ResultsPage extends Component {
  render() {
    if (!this.props.data.loading) {
      const questions = this.props.data.assessment.questions;
      return (
        <div className='results-page'>
          <div className='overview'>
            <div className='svg'>
              <Radar
                width={485}
                height={450}
                padding={70}
                domainMax={4}
                highlighted={null}
                data={{
                  variables: questions.map((question, index) => {
                    return { key: question.id, label: question.text }
                  }),
                  sets: [{
                    key: 'res',
                    values: questions.reduce((result, question) => {
                      return Object.assign(result, { [question.id]: choicePointScore(selectedChoice(question)) })
                    }, {})
                  }]
                }}
              />
            </div>

            <div className='overview-text'>
              <div>
                <Score circle score={finalScore(questions)} />
                <h1> Here is your EnterpriseGrade </h1>
              </div>

              <p className='first'> Awesome! You’re already taking important steps toward becoming EnterpriseReady </p>
              <p className='second'> Below you'll find the details of your results, as well as a few suggestions for what the next steps you can take to be enterprise ready are. </p>
            </div>
          </div>

          <div className='container-second'>
            <h2> Let's take a closer look at your scores </h2>
            <p> Select a category below to get a more detailed view of your scores, as well as next steps on becoming more EnterpriseReady. </p>

            <div>
              {questions.map((question, index) => {
                return (
                  <div className={'second-box question-id-' + question.id} key={question.id}>
                    <div className='box-heading'>{question.text === 'Role-based Access Control' ? 'Role-based AC' : question.text}</div>
                    <div className='image-box'>
                      <div className='category-box-img '> </div>
                      <QuestionScore question={question} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <hr />
          <div className='individual-result'>
            <Media>
              {questions.map((question, index) => {
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
          </div>
        </div>
      )
    } else {
      return (
        <div className='loading-page' >
          <div className='loader'>
          </div>
        </div>
      )
    }
  }
}


export default graphql(assessment, {
  options: props => ({ variables: { assessmentId: props.match.params.assessmentId } }),
})(ResultsPage);

