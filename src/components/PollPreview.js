import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import { colors } from '../utils/helpers';

export class PollPreview extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired
  };

  state = {
    viewPoll: false
  };

  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }));
  };

  render() {
    const { question, unanswered } = this.props;
    const { viewPoll } = this.state
    const buttonColor = unanswered === true ? colors.green : colors.red;
    const buttonContent = unanswered === true ? 'Answer Poll' : 'Results';

    if (viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    } else {
        return (
          <Fragment>
            <Header as="h5" textAlign="left">
              Would you rather
            </Header>
            <p style={{ textAlign: 'center' }}>
              {question.optionOne.text}
              <br />
              or...
            </p>
            <Button
              fluid
              color={buttonColor.name}
              size="tiny"
              onClick={this.handleClick}
              content={buttonContent}
            />
          </Fragment>
        );
      }
  }
}

export default PollPreview;
