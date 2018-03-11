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
          <h2> The EnterpriseReady SaaS Feature Guides </h2>
          <p> Created for people who build SaaS products (founders, product managers and engineering
            team leads) to change the enterprise software narrative from "how to SELL to the enterprise" to
            "how to BUILD for the enterprise". Based on study of the 50 leading SaaS application product
          packages, in-depth CIO interviews and feedback from countless SaaS founders. </p>
          <hr />
          <h3> Is you app ready for enterprise buyers? </h3>
          <p> Take our self-assessment to find out how ready your application is for enterprise adoption. </p>
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

