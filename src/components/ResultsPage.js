import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Radar from 'react-d3-radar';
import { Media } from 'react-bootstrap';

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

function choicePointScore(choice) {
  return choice.id.charCodeAt(choice.id.length - 1) - 'a'.charCodeAt(0) + 1;
}

function scoreLabel(score) {
  return String.fromCharCode('A'.charCodeAt(0) + (score - 1));
}

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
                      const selectedChoice = question.choices.find(c => c.isSelected)
                      return Object.assign(result, { [question.id]: choicePointScore(selectedChoice) })
                    }, {})
                  }]
                }}
              />
            </div>

            <div className='ov-text'>
              <h1> Here is your EnterpriseGrade </h1>
              <p className='first'> Awesome! You’re already taking important steps toward becoming EnterpriseReady </p>
              <p className='second'> Below you'll find the details of your results, as well as a few suggestions for what
          the next steps you can take to be enterprise ready are. </p>
            </div>
          </div>

          <div className='container-second'>
            <h2> Let's take a closer look at your scores </h2>
            <p> Select a category below to get a more detailed view of your scores, as well as
          next steps on becoming more EnterpriseReady. </p>

            <div> List of images </div>
          </div>
          <hr />
          <div className='individual-result'>
            <Media>
            {questions.map((question, index) => {
              const selectedChoice = question.choices.find(c => c.isSelected)
              return (
                <div>
              <Media.Left>
                <img width={64} height={64} src="/thumbnail.png" alt="thumbnail" />
              </Media.Left>
              <Media.Body>
                <Media.Heading>
                <p className='question-text'>{question.text} {scoreLabel(choicePointScore(selectedChoice))}</p>
                </Media.Heading>
                <p className='answer'> Your answer: </p>
                <p className='answer'>{selectedChoice.text} </p>
                <p className='recommendation'>{selectedChoice.recommendation}</p>

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
          Loading...
      </div>
      )
    }
  }
}


export default graphql(assessment, {
  options: props => ({ variables: { assessmentId: props.match.params.assessmentId } }),
})(ResultsPage);

