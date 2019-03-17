import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as appAction from './swift-app-actions';
import Header from 'app/header/img-header-container';
import SwiftGridStats from 'app/swiftMatchingStats/swift-matching-Stats-grid';
import SwiftArchiveTable from 'app/swiftDataView/swiftArchiveTable';
import SwiftArchiveGetOptions from 'app/swiftDataView/swiftArchiveGetOptions';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category:''
    };
  }
  componentWillMount() {
    this.props.appAction.getSwiftCount();
  }
  getMatchingCateogry = (name) => {
    this.setState({ category: name });
  }
  render() {
        const category = this.state.category;
    return (
      <div >
        <div>
          <Header/>
        </div>
        <div>
          <SwiftGridStats  getMatchingCateogry={this.getMatchingCateogry}/>
        </div>
        <div style={{ width: '96%', padding: '0.25% 2% 2% 2%' }}>
          <div style={{ textAlign: 'left', padding: '5px' }}>
            <div style={{ display: 'inline-block' }}>
                <SwiftArchiveGetOptions category={category} getMatchingCateogry={this.getMatchingCateogry} />
            </div>
          </div>
          <SwiftArchiveTable />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number,
  bestPerformers: PropTypes.array,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    appAction: bindActionCreators(Object.assign({}, appAction), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
