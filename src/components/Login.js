import React, { Component, Fragment } from 'react';
import {
  Segment,
  Grid,
  Header,
  Image,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import LoginForm from './LoginForm'
import logo from '../logo.svg';

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

const LoginGridLayout = ({ image, form, loading }) => (
  <div>
    <Grid padded textAlign="center">
      <Grid.Row className="login">
        <Grid.Column width={16}>
          {loading === true && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          {image}
          <br />
          {form}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

const BrandImage = () => (
  <Image src={logo} className="App-logo" size="medium" centered />
);

class Login extends Component {
  state = {
    loading: false
  };

  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginGridLayout
            image={<BrandImage />}
            form={<LoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
        <footer className="footer">
          <div> <p>Icons made by 
            <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> 
              from 
            <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Login;
