import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  Form,
} from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class LoginForm extends Component {
    static propTypes = {
      onLoading: PropTypes.func.isRequired
    };

    state = {
      value: ''
    };

    onChange = (e, { value }) => {
      this.setState({ value });
    };

    handleSubmit = e => {
        e.preventDefault();
        
        const { onLoading, setAuthedUser } = this.props;
        const authedUser = this.state.value;   

        new Promise((res, rej) => {
          onLoading();
          setTimeout(() => res(), 500);
        }).then(() => setAuthedUser(authedUser));
    };

    generateDropdownData = props => {
        const { users } = this.props

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
          }));
        };

    render() {
        const { value } = this.state;
        const disabled = value === '' ? true : false;  

        return (
            <Form onSubmit={this.handleSubmit}>
                <Header as="h2" color="green">
                  Sign In
                </Header>
                <Form.Dropdown
                    placeholder="Select a Friend"
                    fluid
                    selection
                    scrolling
                    options={this.generateDropdownData()}
                    value={value}
                    onChange={this.onChange}
                    required
                />
                <Form.Button content="Login" positive fluid disabled={disabled} />
            </Form>
        );
    }
}

function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
}

export default connect(mapStateToProps, { setAuthedUser })(LoginForm);

