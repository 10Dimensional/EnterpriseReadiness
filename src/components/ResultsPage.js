import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RadarComponent from './RadarComponent';
import IndividualResults from './IndividualResults';
import Score from './Score';
import QuestionScore from './QuestionScore';
import { finalScore } from '../utilities'
import LoadingPage from './LoadingPage';

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
              <RadarComponent questions={this.props.data.assessment.questions}/>
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
            <IndividualResults questions={questions}/>
          </div>
        </div>
      )
    } else {
      return (
        <LoadingPage />
      )
    }
  }
}


export default graphql(assessment, {
  options: props => ({ variables: { assessmentId: props.match.params.assessmentId } }),
})(ResultsPage);

