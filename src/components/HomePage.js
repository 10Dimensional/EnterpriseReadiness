import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from "react-router-dom";

const prepareAssessment = gql`
  mutation prepareAssessment {
    prepareAssessment(templateId: "jelena")
  }
`

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentId: null
    }
  }

  onTakeAssesmentClick = () => {
    this.props.mutate()
      .then(({ data: { prepareAssessment: assessmentId } }) => {
        this.setState({ assessmentId });
      })
  }

  render() {
    if (!this.state.assessmentId) {
      return (
        <div className='home-page' >
          <button onClick={this.onTakeAssesmentClick}>Take Assessment</button>
        </div>
      )
    } else {
      return (
        <Redirect to={`/assessment/${this.state.assessmentId}`} />
      )
    }
  }
}

export default graphql(prepareAssessment)(HomePage);

