import React from 'react';

class UsersList extends React.Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Users list</h1>
        <ul>
          {this.props.data.map(user =>
            <li key={user.id}> {user.id} {user.first_name} {user.last_name}
              &nbsp;&nbsp;{user.email} {user.gender} {user.ip_address}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
export default UsersList;
