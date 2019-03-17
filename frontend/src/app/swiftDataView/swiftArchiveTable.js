import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import * as appAction from '../swift-app-actions';
import TablePaginationActions from './TablePagination';

const tableValues =
[
  ":20": ":20",
  ":21": ":21",
  ":22A":":22A",
  ":22C":":22C",
  ":94A":":94A",
  ":82": ":82",
  ":82A":":82A",
  ":82D":":82D",
  ":82J":":82J",
  ":87": ":87",
  ":77H":":77H",
  ":30T":":30T",
  ":30V":":30V",
  ":36": ":36",
  ":32B":":32B",
  ":53": ":53",
  ":53A":":53A",
  ":53D":":53D",
  ":53J":":53J",
  ":56": ":56",
  ":56A":":56A",
  ":56D":":56D",
  ":56J":":56J",
  ":57": ":57",
  ":57A":":57A",
  ":57D":":57D",
  ":57J":":57J",
  ":58": ":58",
  ":58A":":58A",
  ":58D":":58D",
  ":58J":":58J",
  ":33B":":33B",
  ":72": ":72",
  "company": 'company',
  "status":'status',
  "matchRef":'matchRef']

const styles = () => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

export class SwiftArchiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertDailog: false,
      rowsPerPage: 11,
      page: 0,

    };
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

 handleChangeRowsPerPage = (event) => {
   this.setState({ rowsPerPage: Number(event.target.value) });
 };

 render() {
   const { classes } = this.props;
   const { rowsPerPage, page } = this.state;
   const rows = this.props.archiveData;
   const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

   return (
     <Paper className={classes.root}>
       <div className={classes.tableWrapper}>
         <Table className={classes.table}>
           <TableHead>
             <TableRow style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
               {
                 tableValues.map((value) =>
                 <TableCell style={{ color: 'white' }}>{value}</TableCell>
               )}
             </TableRow>
           </TableHead>
           <TableBody>
             {rows
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map(row =>
                 <TableRow key={row._id} style={{ height: 20 }}>
                   {
                     tableValues.map((value) =>
                     <TableCell align='left'>{row[value]}</TableCell>
                   )}
                 </TableRow>
               )}
             {emptyRows > 0 &&
                <TableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
             }
           </TableBody>
           <TableFooter>
             <TableRow>
               <TablePagination
                 rowsPerPageOptions={[13]}
                 colSpan={3}
                 count={rows.length}
                 rowsPerPage={rowsPerPage}
                 page={page}
                 SelectProps={{
                   native: true,
                 }}
                 onChangePage={this.handleChangePage}
                 onChangeRowsPerPage={this.handleChangeRowsPerPage}
                 ActionsComponent={TablePaginationActions}
               />
             </TableRow>
           </TableFooter>
         </Table>
       </div>
     </Paper>
   );
 }
}

SwiftArchiveTable.propTypes = {
  archiveData: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    archiveData: state.dataSource.archiveData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    archivesActions: bindActionCreators(Object.assign({}, appAction), dispatch),
  };
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(SwiftArchiveTable);
