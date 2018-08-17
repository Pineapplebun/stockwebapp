import React, { Component } from 'react';
import './FeaturesBar.css';

export class FeaturesBar extends Component {
  render() {
      return (
        <ul className="Features-bar">
            <li className="Feature-list-item"> 
                <a className="Feature-link" href="/">Sign In</a>
            </li>
            <li className="Feature-list-item">
                <a className="Feature-link" href="/">Watchlists</a>
            </li>
            <li className="Feature-list-item">
                <a className="Feature-link" href="/">Visualization</a>
            </li>
        </ul>
      )
  }
}

export default FeaturesBar;