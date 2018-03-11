import React from 'react';
import { render } from 'react-dom';
import './styles/index.css'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import ResultsPage from './components/ResultsPage';
import { BrowserRouter as Router, Route } from "react-router-dom";

const client = new ApolloClient({ uri: 'https://assessment.staging.enterprisegrade.io/graphql' })

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/assessment/:assessmentId" exact component={QuestionPage} />
        <Route path="/assessment/:assessmentId/question/:questionId" exact component={QuestionPage} />
        <Route path="/assessment/:assessmentId/results" exact component={ResultsPage} />
      </div>
    </Router>
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById('root'));