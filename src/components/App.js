import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Particles from 'react-particles-js';
import { Grid } from 'semantic-ui-react';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import Error404 from './Error404';
import UserCard from './UserCard';


const particlesOption = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div className="App">
          <Particles className='particles' 
            params={particlesOption}
          />
          {authedUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <Nav />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/questions/bad_id" component={Error404} />
                  <Route component={Error404} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps, { handleInitialData })(App);
