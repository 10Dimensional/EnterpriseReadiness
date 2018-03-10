import React, { Component } from 'react'

class QuestionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  render() {
    return (
      <div className='question-page' >
        <h1>{this.props.match.params.assessmentId}</h1> 
        <h2>{this.props.match.params.questionId}</h2>
        <button>Previous</button>
        <button>Next</button>
      </div>
    )
  }
}

export default QuestionPage;

