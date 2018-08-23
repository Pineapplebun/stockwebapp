import React, { Component } from 'react';
import './FooterBar.css';

export class FooterBar extends Component {
  render() {
    return (
      <footer>
        <ul className="Footer-bar">
            <li className="Footer-list-item" text="Sign In"> 
              <div className="Footer-link">Powered by Google News and AlphaVantage</div>
            </li>
        </ul>
      </footer>
    )
  }
}

export default FooterBar;