import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import withSesson from './components/withSession';
import App from './components/App';
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';
import ViewRecipe from './components/Recipe/ViewRecipe';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },

  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },

  onError: allErrors => {
    console.log("SETUP ON_ERROR", allErrors);
  },
});

const Root = ({ refetch, session }) => (
<Router>
  <Fragment>
    <Navbar session={session} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" render={() => <Signin refetch={refetch} />} />
      <Route path="/signup" render={() => <Signup refetch={refetch} />} />
      <Route path="/search" component={Search} />
      <Route path="/recipe/add" component={AddRecipe} />
      <Route path="/recipe/:id" component={ViewRecipe} />
      <Route path="/profile" component={Profile} />
      <Redirect to='/' />
    </Switch>
  </Fragment>
</Router>
);

const RootWithSession = withSesson(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>
  ,
document.getElementById('root'));
