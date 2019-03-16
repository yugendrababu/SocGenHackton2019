import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as appAction from './stock-app-actions';
import Header from 'app/header/img-header-container';
import BestPerformersGridList from 'app/bestStockPerformers/stock-best-performers-grid-list';
import StockArchiveTable from 'app/stockArchiveTable/stockArchiveTable';
import StockArchiveGetOptions from 'app/stockArchiveTable/StockArchiveGetOptions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockName: '',
    };
  }
  componentWillMount() {
    this.props.appAction.getStockCount();
    this.props.appAction.getStockBestPerformers();
  }
  getGetStockName = (name) => {
    this.setState({ stockName: name });
  }
  render() {
    const stockName = this.state.stockName;

    return (
      <div >
        <div>
          <Header/>
        </div>
        <div>
          <BestPerformersGridList getGetStockName={this.getGetStockName}/>
        </div>
        <div style={{ width: '96%', padding: '0.25% 2% 2% 2%' }}>
          <div style={{ textAlign: 'left', padding: '5px' }}>
            <div style={{ display: 'inline-block' }}>
              <StockArchiveGetOptions stockName={stockName} getGetStockName={this.getGetStockName} />
            </div>
          </div>
          <StockArchiveTable />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  appAction: PropTypes.object,
  transactionList: PropTypes.array,
  appList: PropTypes.array,
  count: PropTypes.number,
  bestPerformers: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    count: state.dataSource.count,
    bestPerformers: state.dataSource.applicationName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appAction: bindActionCreators(Object.assign({}, appAction), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
