import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Radar from 'react-d3-radar';
import { Media } from 'react-bootstrap';
import Header from './Header'
import Footer from './Footer'

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
  return String.fromCharCode('A'.charCodeAt(0) + 4 - score);
}


class ResultsPage extends Component {

  finalScore = () => {
    const questions = this.props.data.assessment.questions;
    let sum = 0;

    for (let i = 0; i < questions.length; i++) {
      const selectedChoice = questions[i].choices.find(c => c.isSelected)
      sum += choicePointScore(selectedChoice)
    }

    return Math.floor(sum / questions.length)
  }

  renderImages = (questionId) => {
    if (questionId === "ArCCjSAArQ") {
      //Product assortment 
      return './images/product_assortment.png'
    }
    if (questionId === "9oyGcxfnQj") {
      //Team Management
      return './images/team_man.png'
    }
    if (questionId === "V1KOIDXRuQ") {
      //Role-based Access Control
      return './images/role_based_ac.png'
    }
    if (questionId === "ZLoR6l06Hv") {
      //Audit Logging 
      return './images/audit_log.png'
    }
    if (questionId === "Wacop5KeeJ") {
      //Deployment Options
      return './images/deployment_options.png'
    }
    if (questionId === "xk2iGjzAFA") {
      //SSO
      return './images/single_sing_on.png'
    }
    if (questionId === "Z2mzLcVaqR") {
      //Support/SLA
      return './images/support.png'
    }
    if (questionId === "wxHCIAtokc") {
      //Integrations 
      return './images/integrations.png'
    }
    if (questionId === "fS10auu4Zj") {
      //Change Management 
      return './images/change_man.png'
    }
    if (questionId === "ELKRlzga1l") {
      //Reporting
      return './images/reporting.png'
    }
    if (questionId === "T2ocAbIjoL") {
      //Security
      return './images/security.png'
    }
  }

  render() {
    if (!this.props.data.loading) {
      const questions = this.props.data.assessment.questions;
      return (
        <div>
          <Header />
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
                        console.log(choicePointScore(selectedChoice))
                        return Object.assign(result, { [question.id]: choicePointScore(selectedChoice) })
                      }, {})
                    }]
                  }}
                />
              </div>

              <div className='overview-text'>
                <div>
                  <span className={'circle-score-' + scoreLabel(this.finalScore())}> {scoreLabel(this.finalScore())} </span>
                  <h1> Here is your EnterpriseGrade </h1>

                </div>

                <p className='first'> Awesome! You’re already taking important steps toward becoming EnterpriseReady </p>
                <p className='second'> Below you'll find the details of your results, as well as a few suggestions for what
          the next steps you can take to be enterprise ready are. </p>
              </div>
            </div>

            <div className='container-second'>
              <h2> Let's take a closer look at your scores </h2>
              <p> Select a category below to get a more detailed view of your scores, as well as
          next steps on becoming more EnterpriseReady. </p>

              <div>
                {questions.map((question, index) => {
                  const selectedChoice = question.choices.find(c => c.isSelected)
                  return (
                    <div className={'second-box question-id-' + question.id} key={question.id}>
                      <div className='box-heading'>{question.text === 'Role-based Access Control' ? 'Role-based AC' : question.text}</div>
                      <div className='imgage-box'>
                        <div className='category-box-img '> </div>
                        <span className={'score-' + scoreLabel(choicePointScore(selectedChoice))}>
                          {scoreLabel(choicePointScore(selectedChoice))}
                        </span>
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
                  const selectedChoice = question.choices.find(c => c.isSelected)
                  return (
                    <div key={question.id} className={'question-id-' + question.id}>
                      <Media.Left>
                        <div className='category-img' />
                      </Media.Left>
                      <Media.Body>
                        <Media.Heading>
                          <p className='question-text'>
                            {question.text}
                            <span className={'circle-score-' + scoreLabel(choicePointScore(selectedChoice))}>{scoreLabel(choicePointScore(selectedChoice))}</span>
                          </p>
                        </Media.Heading>
                        <p className='answer'> Your answer: </p>
                        <p className='answer'>{selectedChoice.text} </p>
                        <p className='recommendation'>{selectedChoice.recommendation}</p>
                        <a className='learn-more' target='_blank' rel='noopener noreferrer' href='https://www.enterpriseready.io/features/product-assortment/'>
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
          <Footer />
        </div>
      )
    } else {
      return (
        <div className='loading-page' >

        </div>
      )
    }
  }
}


export default graphql(assessment, {
  options: props => ({ variables: { assessmentId: props.match.params.assessmentId } }),
})(ResultsPage);

