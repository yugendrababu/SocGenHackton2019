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
import Details from '@material-ui/icons/Details';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '0.5% 2% 1% 2%',
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
    width: '32% !important',
    height: '170px !important',

  },
  gridImg: {
    transform: 'translateY(0)',
    position: 'initial',
  },
  actionButton: {
    color: 'white',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export class SwiftGridStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const list = this.props.stats.length > 0 ? this.props.stats : [];

    return (
      <div>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          <div style={{ display: 'inline-block' }}>
              Swift matching stats
          </div>
        </div>
        <div className={classes.root}>
          <div>
            <GridList className={classes.gridList} cols={2.5}>
              {list.map(tile =>
                <GridListTile key={tile.name}
                  classes={{
                    root: classes.gridListTile,
                  }}
                >
                  <img src={'/matching/img/grid.jpg'} className={classes.gridImg} alt={tile.name} />
                  <GridListTileBar
                    title={`${tile.name}`.toUpperCase()}
                    subtitle={`${tile.value}`.toUpperCase()}
                    titlePosition='top'
                    classes={{
                      title: classes.title,
                      titleWrap: classes.titleWrap,
                    }}
                    actionIcon={
                      <div>
                        <IconButton onClick={() => {this.props.getMatchingCateogry(tile.name);}}>
                          <Details title={'More Details'} className={classes.actionButton} />
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

SwiftGridStats.propTypes = {
  classes: PropTypes.object,
  bestPerformersList: PropTypes.array,
  getGetStockName: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    stats: state.dataSource.stats,

  };
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(SwiftGridStats);
