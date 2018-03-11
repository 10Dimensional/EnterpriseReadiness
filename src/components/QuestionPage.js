import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'react-bootstrap';

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
          isSelected
        }
      }
    } 
  }
  `

  const updateAssessment = gql`
  mutation updateAssessment($assessmentId: String!, $questionId: String!, $selectedChoiceId: String!) {
    updateAssessment(assessmentId: $assessmentId, questionId: $questionId, selectedChoiceId: $selectedChoiceId) {
      id
    }
  }
`

class QuestionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      selectedChoice: null
    }
  }

  onPreviousClick = () => {
    this.setState(prevState => {
      return {
        questionIndex: prevState.questionIndex - 1
      };
    })
  }

  onNextClick = () => {
    const assessmentId = this.props.match.params.assessmentId
    const questionId = this.props.data.assessment.questions[this.state.questionIndex].id
    if (this.state.selectedChoice) {
      this.props.mutate({
        variables: { assessmentId, questionId, selectedChoiceId: this.state.selectedChoice }
      })
      .then(({ data }) => {
        this.setState(prevState => {
          return {
            questionIndex: prevState.questionIndex + 1,
            selectChoice: null
          };
        })
      })
    }
  }

  selectChoice = (id) => {
    this.setState({ selectedChoice: id })
  }

  render() {
    const assesmentId = this.props.match.params.assessmentId
    if (!this.props.data.loading) {
      const questions = this.props.data.assessment.questions;

      if (this.state.questionIndex < questions.length) {
        return (
          <div className='question-page' >
            <h2>{questions[this.state.questionIndex].text}</h2>
            <div> {questions[this.state.questionIndex].description}</div>
            <h3> {questions[this.state.questionIndex].question}</h3>
            <ListGroup>
              {questions[this.state.questionIndex].choices.map((choice, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    onClick={() => this.selectChoice(choice.id)}>
                    {choice.text}
                  </ListGroupItem>
                )

              })}
            </ListGroup>
            <div>
              {this.state.questionIndex > 0 && <button onClick={this.onPreviousClick}>Previous</button>}
              <button onClick={this.onNextClick}>Next</button>
            </div>
          </div>
        )
      } else {
        return (
          <Redirect to={`/assessment/${assesmentId}/results`} />
        )
      }
    } else {
      return (
        <div className='loading-page' >
          Loading...
        </div>
      )
    }
  }
}

export default graphql(updateAssessment)(graphql(assessment, {
  options: props => ({ variables: { assessmentId: props.match.params.assessmentId } }),
})(QuestionPage));

