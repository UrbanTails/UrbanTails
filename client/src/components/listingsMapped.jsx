import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Link, Redirect } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 9000,
    height: 3500,
    overflowY: 'auto',
  },
};


/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const ListingsMapped = (props) => (
  <div style={styles.root}>
    <GridList
     cellHeight={400}
     cellWidgth={9700}
     padding={15}
      style={styles.gridList}
    >
      {props.listings.map((tile) => (
        <Link to ={{ pathname: '/singlelistview', state: {hostName: tile.username, location: tile.location, description: tile.description, profileUrl: tile.profileUrl, email: tile.email
          , userName: props.userName}}}>
        <GridTile
          key={tile.email}
          title={tile.username}
          subtitle={<span>by <b>{tile.description}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.profileUrl} />
        </GridTile>
        </Link>
      ))}
    </GridList>
  </div>
);

export default ListingsMapped;