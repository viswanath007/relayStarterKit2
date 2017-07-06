import React from 'react';
import Relay from 'react-relay';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RBTable from './RBTable';
import UsersList from './UsersList';


class App extends React.Component {
  render() {
    return (
      <div>
        <UsersList data={this.props.viewer.users}/>
        <hr/>
        <RBTable data={this.props.viewer.users}/>
      </div>
    );
  }
}


export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        users {
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
