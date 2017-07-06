import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

let order = 'asc';

class RBTable extends React.Component {
  handleBtnClick = () => {
    if (order === 'desc') {
      this.refs.table.handleSort('asc', 'id');
      order = 'asc';
    } else {
      this.refs.table.handleSort('desc', 'id');
      order = 'desc';
    }
  }
  render() {
    return (
      <div>
        <h1>Users list</h1>
        <p style={ { color: 'red' } }>You cam click header to sort or click
        following button to perform a sorting by expose API</p>
        <button onClick={ this.handleBtnClick }>Sort by User ID</button>
        <BootstrapTable ref='table' data={this.props.data} striped hover>
            <TableHeaderColumn width='80' dataField='id' isKey dataSort={ true }>
              User ID</TableHeaderColumn>
            <TableHeaderColumn width='150' dataField='first_name'>First Name
            </TableHeaderColumn>
            <TableHeaderColumn width='150' dataField='last_name'
              filter={ { type: 'TextFilter', delay: 1000 } }>Last Name</TableHeaderColumn>
            <TableHeaderColumn width='220' dataField='email'
              filter={ { type: 'TextFilter', delay: 1000 } }>Email
            </TableHeaderColumn>
            <TableHeaderColumn width='150' dataField='gender'>Gender
            </TableHeaderColumn>
            <TableHeaderColumn width='150' dataField='ip_address'>IP Address
            </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default RBTable;
