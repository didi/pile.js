import React, { Component } from 'react';
import anime from '../../lib/anime/anime.min';

class Anime extends Component {
  constructor(props) {
    super(props);
    this.targets = [];
  }

  componentDidMount() {
    const animeProps = {
      targets: this.targets,
      ...this.props,
    };
    delete animeProps.children;
    this.anime = anime(animeProps);
  }

  addTarget = (newTarget) => {
    this.targets = [...this.targets, newTarget];
  }

  render() {
    return (
      <g>
        {React.Children.map(this.props.children, (child, i) => {
           if (!child) {
              return null;
            }
           return React.cloneElement(child, {
             key: i,
             ref: this.addTarget,
           });
         })}
      </g>
    );
  }
}

export default Anime;
