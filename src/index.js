import React from 'react';
import { render } from 'react-dom';
import './styles/index.css'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import ResultsPage from './components/ResultsPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'

const client = new ApolloClient({ uri: 'https://assessment.staging.enterprisegrade.io/graphql' })

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Header />
      <div className='content'>
        <Route path="/" exact component={HomePage} />
        <Route path="/assessment/:assessmentId" exact component={QuestionPage} />
        <Route path="/assessment/:assessmentId/question/:questionId" exact component={QuestionPage} />
        <Route path="/assessment/:assessmentId/results" exact component={ResultsPage} />
      </div>
      <Footer />
      </div>
    </Router>
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById('root'));