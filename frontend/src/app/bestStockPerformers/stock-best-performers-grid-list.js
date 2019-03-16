import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '0.5% 2% 2% 2%',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',

  },
  title: {
    // color: theme.palette.primary.light,
  },
  titleWrap: {
    // backgroundColor:'transparent'
  },
  titleBar: {
    background: 'rgba(8, 4, 0, 0.31)',
  },
  gridListTile: {
    width: '26% !important',
    height: '250px !important',

  },
  gridImg: {
    transform: 'translateY(0)',
    position: 'initial',
  },
  actionButton: {
    color: 'white',
  },
});

export class BestPerformersGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  getSubTitle =(title) => {
    const subTitle = title.toString().substr(0, title.toString().indexOf('.') + 4);

    return `Rating : ${subTitle} %`;
  }

  render() {
    const { classes } = this.props;
    const list = this.props.bestPerformersList;

    return (
      <div>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <div style={{ display: 'inline-block' }}>
              Best performing stocks
          </div>
        </div>
        <div className={classes.root}>
          <div>
            <GridList className={classes.gridList} cols={2.5}>
              {list.map(tile =>
                <GridListTile key={tile._id}
                  classes={{
                    root: classes.gridListTile,
                  }}
                >
                  <img src={'/stock/img/grid.jpg'} className={classes.gridImg} alt={tile.stockName} />
                  <GridListTileBar
                    title={tile.stockName}
                    subtitle={this.getSubTitle(tile.rating)}
                    titlePosition='top'
                    classes={{
                      title: classes.title,
                      titleWrap: classes.titleWrap,
                    }}
                    actionIcon={
                      <div>
                        <IconButton>
                          <StarBorderIcon className={classes.actionButton} />
                        </IconButton>
                        <IconButton onClick={() => {this.props.getGetStockName(tile.stockName);}}>
                          <ExpandMore title={'See stock data'} className={classes.actionButton} />
                        </IconButton>
                      </div>
                    }
                  />
                </GridListTile>
              )}
            </GridList>
          </div>
        </div>
      </div>

    );
  }
}

BestPerformersGridList.propTypes = {
  classes: PropTypes.object,
  bestPerformersList: PropTypes.array,
  getGetStockName: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    bestPerformersList: state.dataSource.bestPerformersList,

  };
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(BestPerformersGridList);
