import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';
import * as appAction from '../stock-app-actions';

const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    '&:last-child': {
      padding: 0,
    },
  },
  toolbar: {
    height: 56,
    minHeight: 56,
    paddingRight: 2,
  },

  spacer: {
    paddingLeft: '20%',
  },

  caption: {
    flexShrink: 0,
  },

  selectRoot: {
    marginRight: 32,
    marginLeft: 8,
  },

  select: {
    paddingLeft: 8,
    paddingRight: 26,
    backgroundColor: 'white',
  },

  selectIcon: {
    top: 1,
  },

  input: {
    color: 'inherit',
    fontSize: 'inherit',
    flexShrink: 0,
  },

  menuItem: {},

  actions: {
    flexShrink: 0,
    marginLeft: 20,
  },
});

class StockArchiveGetOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      field: 'date',
      offset: 50,
      stockName: '',
    };
  }
  componentWillMount() {
    this.props.archivesActions.getStockArchiveData('date', 50, 0);
  }
  componentWillReceiveProps(next) {
    if (next.stockName && next.stockName !== this.props.stockName) {
      this.setState({
        value: 50,
        offset: 0,
        stockName: next.stockName,
      });
      this.props.archivesActions.getStockArchiveData('date', 50, 0, next.stockName);
    }
  }
  onChangeRowsPerPage = (event) => {
    this.setState({ value: Number(event.target.value) });
  }
  handleNext = () => {
    const field = this.state.field;
    const limit = this.state.value;
    const offset = this.state.offset;
    const stockName = this.state.stockName;

    this.props.archivesActions.getStockArchiveData(field, limit, offset, stockName);
    this.setState({ offset: offset + limit });
  };
  handleBack = () => {
    const field = this.state.field;
    const limit = this.state.value;
    const offset = this.state.offset;
    const stockName = this.state.stockName;
    const offsetCheck = offset - limit < 0 ? 0 : offset - limit;

    this.setState({ offset: offsetCheck });
    this.props.archivesActions.getStockArchiveData(field, limit, offsetCheck, stockName);
  };
  handleCancel = () => {
    this.setState({
      offset: 0,
      stockName: '',
    });
    const field = this.state.field;
    const limit = this.state.value;
    const offset = this.state.offset;

    this.props.archivesActions.getStockArchiveData(field, limit, 0, '');
    this.setState({ offset: offset + limit });
    this.props.getGetStockName('');
  }

  render() {
    const { classes } = this.props;
    const { value, stockName } = this.state;

    return (
      <div>
        <Toolbar className={classes.toolbar}>
          <Typography color='inherit' variant='h6' className={classes.caption}>
            { !stockName ?
              'All Stock Archive Data'
              :

              `Viewing Stock Archive Data - ${stockName}`
            }
          </Typography>
          { stockName ?
            <IconButton
              style={{ color: '#f67100' }}
              title ={'reset'}
              onClick={this.handleCancel}
              aria-label='Next'
            >
              <Cancel />
            </IconButton>
            :
            null
          }

          <div className={classes.spacer} />
          <Select
            classes={{
              root: classes.selectRoot,
              select: classes.select,
              icon: classes.selectIcon,
            }}
            input={<InputBase className={classes.input} />}
            value={value}
            onChange={this.onChangeRowsPerPage}
          >
            {[50, 100, 200].map(rowsPerPageOption =>
              <MenuItem
                className={classes.menuItem}
                key={rowsPerPageOption}
                value={rowsPerPageOption}
              >
                {rowsPerPageOption}
              </MenuItem>
            )}
          </Select>
          <IconButton
            title ={`Get previous ${value} rows of data`}
            onClick={this.handleBack}
            disabled={this.state.offset === 0}
            aria-label='Back'
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            title ={`Get next ${value} rows of data`}
            onClick={this.handleNext}
            aria-label='Next'
          >
            <ArrowForward />
          </IconButton>
        </Toolbar>
      </div>
    );
  }
}

StockArchiveGetOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  stockName: PropTypes.string,
  archivesActions: PropTypes.object,
  getGetStockName: PropTypes.func,
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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(StockArchiveGetOptions);
