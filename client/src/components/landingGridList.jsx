import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { Link, Redirect } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)'
  },
};

const tilesData = [

  {
    username:"Greg's house of sunshine",
    email: "Gregn@strangerthings.com",
    password: "gamesforever",
    profileUrl:"https://orig00.deviantart.net/a15d/f/2010/339/4/9/spooky_house__matte_paintin___by_ryujin2490-d34br6a.jpg",
    type: "host",
    location: {street: "482 W Davidson Lane", city: "Columbus", state: "OH", zipCode:"82398"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await."
  },
  {
    username:"Chucky's colorado pad",
    email: "summersun@hamptons.com",
    password: "waterbaby",
    profileUrl:"http://www.dobkanize.com/wp-content/uploads/2017/12/la-mansion-hollywood-hills-a-modern-california-house-with-spectacular-views-hollywood-hills.jpg",
    type: "host",
    location: {street: "6464 E Temp Lane", city: "Honolulu", state: "HI", zipCode:"33442"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await!"
  },
  {
    username:"Morrow Cat Palace",
    email: "theface@dice.com",
    password: "hiphop",
    profileUrl:"http://static4.uk.businessinsider.com/image/593fbdd1bf2fba1f008b4ade-960/blenheim-credit-by-fulcanelli.jpg",
    type: "host",
    location: {street: "4688 W Beliar Pkwy", city: "Santa Fe", state: "NM", zipCode:"83466"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await."
  },
  {
    username:"The Robin Kim pet spa",
    email: "spookykim@bates.com",
    password: "naptime",
    profileUrl:"http://homesoftherich.net/wp-content/uploads/2013/10/Screen-shot-2013-10-18-at-10.44.09-AM.png",
    type: "host",
    location: {street: "6464 E Temp Lane", city: "Honolulu", state: "HI", zipCode:"33442"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await.."
  },
  {
    username:"The Norbie Adventure",
    email: "yoga@lemon.org",
    password: "booklover",
    profileUrl:"https://cdn.vox-cdn.com/uploads/chorus_asset/file/4873925/Screen_20Shot_202014-07-02_20at_2010.20.23_20PM.0.png",
    type: "host",
    location: {street: "482 W Davidson Lane", city: "Columbus", state: "OH", zipCode:"82398"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await."
  },
  {
    username:"Paula's TreeHouse",
    email: "maddog@thunderdome.net",
    password: "supersecret",
    profileUrl:"https://images.adsttc.com/media/images/5947/7fd4/b22e/383a/5900/0178/newsletter/Malan_Vorster_Treehouse_011_Adam_Letch.jpg?1497857964",
    type: "host",
    location: {street: "4688 W Beliar Pkwy", city: "Santa Fe", state: "NM", zipCode:"83466"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await."
  },
  {
    username:"John and Joe pet adventure",
    email: "sportsfan@gmail.com",
    profileUrl:"https://i.ytimg.com/vi/uZc0tw9C5vk/hqdefault.jpg",
    password: "baseball",
    type: "petOwner",
    location: {street: "482 W Davidson Lane", city: "Columbus", state: "OH", zipCode:"82398"},
    description:"A magical pet experience, your pet will become enlightened by the wonders that await.."
  },
]


const LandingGridList = () => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cellHeight={180}>
      {tilesData.map((tile) => (
        <Link to ={{ pathname: '/singlelistview', state: {hostName: tile.username, location: tile.location, description: tile.description, profileUrl: tile.profileUrl, email: tile.email}}}>
        <GridTile
          key={tile.email}
          title={tile.username}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.profileUrl} />
        </GridTile>
        </Link>
      ))}
    </GridList>
  </div>
);

export default LandingGridList;