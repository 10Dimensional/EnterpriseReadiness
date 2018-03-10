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
        <button>Previous</button>
        <button>Next</button>
      </div>
    )
  }
}

export default QuestionPage;

