import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

class NewPoll extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired
  };

  state = {
    validSubmit: false,
    isLoading: false,
    option1: '',
    option2: ''
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { authedUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authedUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        option1: '',
        option2: ''
      });
      this.setState({ validSubmit: true });
    });
  };

  render() {
    const { validSubmit, isLoading, option1, option2 } = this.state
    const disabled = option1 === '' || option2 === '';

    if (validSubmit === true) {
      return <Redirect to="/" />;
    } else {
        return (
          <Segment.Group>
            <Header as="h3" textAlign="left" block attached="top">
              Create a New Poll
            </Header>
            <Grid padded>
              <Grid.Column>
                {isLoading && (
                  <Dimmer active inverted>
                    <Loader content="Updating" />
                  </Dimmer>
                )}
                <p>Complete the question:</p>
                <p>
                  <strong>Would you rather...</strong>
                </p>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    id="option1"
                    placeholder="Enter option one..."
                    value={option1}
                    onChange={this.handleChange}
                    required
                  />
                  <Divider horizontal>Or</Divider>
                  <Form.Input
                    id="option2"
                    placeholder="Enter option two..."
                    value={option2}
                    onChange={this.handleChange}
                    required
                  />
                  <Form.Button positive size="tiny" fluid disabled={disabled}>
                    Submit
                  </Form.Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Segment.Group>
        );
    }
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);
