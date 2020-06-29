import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import UserCard from './UserCard';

const panes = ({ userQuestionData }) => {
  return [
    {
      menuItem: 'Unanswered',
      render : () => (
        <Tab.Pane>
          {userQuestionData.answered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered',
      render : () => (
        <Tab.Pane>
          {userQuestionData.unanswered.map(question => (
            <UserCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      )
    }
  ];
};

class Home extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired
  };

  render() {
    const { userQuestionData } = this.props;

    return <Tab className="tab" panes={panes({ userQuestionData })} />;
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers);
  
  const answered = Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  
  const unanswered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Home);
