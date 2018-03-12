import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'


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
        <div>
        <Header />
        <div className='home-page' >
          <div className='home-page-box'>
            <div className='home-image'> </div>
            <h1>Is your app EnterpriseReady?</h1>
            <p> Take this self assessment to see how ready your application is for enterprise adoption.</p>
            <button onClick={this.onTakeAssesmentClick}>Take Assessment</button>
          </div>
        </div>
        <Footer isFixed={true}/>
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

