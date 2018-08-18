import React, { Component } from 'react';
import './SideFrame.css';
import './Card.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignInCard from './SignInCard';
import StockLookUpCard from './StockLookUpCard';
import WatchlistsCard from './WatchlistsCard';


export class SideFrame extends Component {
  render() {
    switch(this.props.selectSideFrameCard) {
      case 'Sign In':
        return (
          <SignInCard></SignInCard>
        )
      case 'Stock Look Up':
        return (
          <StockLookUpCard></StockLookUpCard>
        )
      case 'Watchlists':
        return (
          <WatchlistsCard></WatchlistsCard>
        )
      default:
        return (
          <SignInCard></SignInCard>
        )
    }
  }
}

SideFrame.propTypes = {
  selectSideFrameCard: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  selectSideFrameCard: state.chart.selectSideFrameCard,
})

export default connect(mapStateToProps, {})(SideFrame);