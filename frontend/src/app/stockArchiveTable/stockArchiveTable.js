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

import * as appAction from '../stock-app-actions';
import TablePaginationActions from './TablePagination';

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

export class StockArchiveTable extends React.Component {
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
               <TableCell style={{ color: 'white' }}>Date</TableCell>
               <TableCell style={{ color: 'white' }} align='left'>symbol</TableCell>
               <TableCell style={{ color: 'white' }} align='left'>open</TableCell>
               <TableCell style={{ color: 'white' }} align='left'>close</TableCell>
               <TableCell style={{ color: 'white' }} align='left'>low</TableCell>
               <TableCell style={{ color: 'white' }} align='left'>high</TableCell>
               <TableCell style={{ color: 'white' }} align='left'>volume</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {rows
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map(row =>
                 <TableRow key={row._id} style={{ height: 20 }}>
                   <TableCell component='th' scope='row'>
                     {row.date}
                   </TableCell>
                   <TableCell align='left'>{row.symbol}</TableCell>
                   <TableCell align='left'>{row.open}</TableCell>
                   <TableCell align='left'>{row.close}</TableCell>
                   <TableCell align='left'>{row.low}</TableCell>
                   <TableCell align='left'>{row.high}</TableCell>
                   <TableCell align='left'>{row.volume}</TableCell>
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

StockArchiveTable.propTypes = {
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(StockArchiveTable);
