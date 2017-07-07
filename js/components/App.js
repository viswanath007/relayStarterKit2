import React from 'react';
import Relay from 'react-relay';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RBTable from './RBTable';
import UsersList from './UsersList';

class App extends React.Component {
  state = {
    content: '',
    users: false
  };
  handleSubmit (e) {
    e.preventDefault();
    // return alert(nameRef.value);
    this.props.relay.setVariables({
      username: this.refs.name.value,
      password: this.refs.pwd.value
    })
    this.refs.name.value = '';
    this.refs.pwd.value = '';
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.viewer.users.length > 0){
      console.log("Success");
      this.setState({content: <div><UsersList data={nextProps.viewer.users}/>
                            <hr/>
                        <RBTable data={nextProps.viewer.users}/></div>})
    }
    else{
      console.log("fail");
    }
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="username">User Name:</label>
            <div className="col-sm-10">
              <input type="text" ref="name" className="form-control" id="email"
               placeholder="Enter username" name="username" required/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
            <div className="col-sm-10">
              <input type="password" ref="pwd" className="form-control" id="pwd"
              placeholder="Enter password" required/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <div className="checkbox">
                <label><input type="checkbox" name="remember"/> Remember me</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </div>
        </form>
        { this.state.content }
      </div>
    );
  }
}


export default Relay.createContainer(App, {
  initialVariables: {
    username: '',
    password: ''
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        users(user: $username, password: $password) {
          id,
          first_name,
          last_name,
          email,
          gender,
          ip_address
        },
      }
    `,
  },
});
