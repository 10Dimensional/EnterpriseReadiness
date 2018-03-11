import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
          <h1> Here is your EnterpriseGrade </h1>
          <h3> Awesome! You’re already taking important steps toward becoming EnterpriseReady </h3>
          <h3> Below you'll find the details of your results, as well as a few suggestions for what
          the next steps you can take to be enterprise ready are. </h3>

          <h2> Let's take a closer look at your scores </h2>
          <p> Select a category below to get a more detailed view of your scores, as well as
          next steps on becoming more EnterpriseReady. </p>

          <div> List of images </div>
          <hr />
          <div>
            {questions.map((question, index) => {
              return (
                <div key={index}>
                  <h2>{question.text}</h2>

                  {question.choices.map((choice, index) => {
                    if (choice.isSelected)
                      return (
                        <div key={index}>
                          <p> Your answer: {choice.text} </p>
                          <p> {choice.recommendation} </p>
                        </div>
                      )
                  })}


                </div>
              )
            }
            )}


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

