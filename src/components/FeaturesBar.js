import React, { Component } from 'react';
import './FeaturesBar.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSideFrameCard } from '../actions/chartActions';

export class FeaturesBar extends Component {

  constructor(props) {
    super(props);
    this.selectSideFrameCard = this.selectSideFrameCard.bind(this);
  }

  render() {
    return (
      <ul className="Features-bar">
          <li className="Feature-list-item" text="Sign In" onClick={this.selectSideFrameCard}> 
            <div className="Feature-link">Sign In</div>
          </li>
          <li className="Feature-list-item" text="Watchlists" onClick={this.selectSideFrameCard}>
          <div className="Feature-link">Watchlists</div>
          </li>
          <li className="Feature-list-item" text="Stock Look Up" onClick={this.selectSideFrameCard}>
          <div className="Feature-link">Stock Look Up</div>
          </li>
      </ul>
    )
  }

  selectSideFrameCard(e) {
    console.log(e.target.innerText);
    return this.props.selectSideFrameCard(e.target.innerText);
  }
}

// Define prop functions passed by action creators
FeaturesBar.propTypes = {
  selectSideFrameCard: PropTypes.func.isRequired,
}



// Features Bar does not require any reading of state, only writing.
// No need for mapStateToProps of objects from the store.

export default connect(() => {return {}}, {selectSideFrameCard})(FeaturesBar);