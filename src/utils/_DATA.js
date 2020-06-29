let users = {
  mujahid: {
    id: 'mujahid',
    name: 'Mujahid',
    avatarURL: '/images/avatars/arab.png',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  bukky: {
    id: 'bukky',
    name: 'Bukky',
    avatarURL: '/images/avatars/nurse.png',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  gabriel: {
    id: 'gabriel',
    name: 'Gabriel',
    avatarURL: '/images/avatars/user.png',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionTwo'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  hauwa: {
    id: 'hauwa',
    name: 'Hauwa',
    avatarURL: '/images/avatars/indonesian.png',
    answers: {},
    questions: []
  },
  bisola: {
    id: 'bisola',
    name: 'Bisola',
    avatarURL: '/images/avatars/woman.png',
    answers: {},
    questions: []
  },
  tyler: {
    id: 'tyler',
    name: 'Tyler',
    avatarURL: '/images/avatars/man.png',
    answers: {},
    questions: []
  },
  maryam: {
    id: 'maryam',
    name: 'Maryam',
    avatarURL: '/images/avatars/arab woman.png',
    answers: {},
    questions: []
  },
  abubakar: {
    id: 'abubakar',
    name: 'Abubakar',
    avatarURL: '/images/avatars/doctor.png',
    answers: {},
    questions: []
  }
};

let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'mujahid',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['mujahid'],
      text: 'have horrible short term memory'
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'gabriel',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'be able to see 10 minutes into your own future'
    },
    optionTwo: {
      votes: ['gabriel', 'mujahid'],
      text: '10 minutes into the future of anyone but yourself'
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'mujahid',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic'
    },
    optionTwo: {
      votes: ['mujahid'],
      text: 'be telepathic'
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'bukky',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer'
    },
    optionTwo: {
      votes: ['mujahid'],
      text: 'be a back-end developer'
    }
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'bukky',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['bukky'],
      text: 'find $50 yourself'
    },
    optionTwo: {
      votes: ['gabriel'],
      text: 'have your best friend find $500'
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'gabriel',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['gabriel'],
      text: 'be married to a 10 with a bad personality '
    },
    optionTwo: {
      votes: ['bukky'],
      text: 'a 6 with an amazing personality'
    }
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      };

      res();
    }, 500);
  });
}
