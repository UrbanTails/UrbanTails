import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
 {
    img: 'https://media.giphy.com/media/exuCt4FA3Wxuo/giphy.gif',
    title: "Greg's house of sunshine",
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },
  {
    img: 'http://www.dobkanize.com/wp-content/uploads/2017/12/la-mansion-hollywood-hills-a-modern-california-house-with-spectacular-views-hollywood-hills.jpg',
    title: "Chuckie's colorado pad",
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },
  {
    img: 'http://static4.uk.businessinsider.com/image/593fbdd1bf2fba1f008b4ade-960/blenheim-credit-by-fulcanelli.jpg',
    title: 'Morrow Cat Palace',
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },
  {
    img: 'http://homesoftherich.net/wp-content/uploads/2013/10/Screen-shot-2013-10-18-at-10.44.09-AM.png',
    title: 'Thee Robin Kim pet spa',
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },
  {
    img: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/4873925/Screen_20Shot_202014-07-02_20at_2010.20.23_20PM.0.png',
    title: 'The Norbie Adventure',
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },
  {
    img: 'https://images.adsttc.com/media/images/5947/7fd4/b22e/383a/5900/0178/newsletter/Malan_Vorster_Treehouse_011_Adam_Letch.jpg?1497857964',
    title: 'Paula by Paula',
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },
  {
    img: 'https://i.ytimg.com/vi/uZc0tw9C5vk/hqdefault.jpg',
    title: 'John and Joe pet adventure',
    description: 'A magical pet experience, your pet will become enlightened by the wonders that await.',
  },


];

const LandingGridList = () => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cellHeight={180}>
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
  </div>
);

export default LandingGridList;