import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './NewsFrame.css';

export class NewsFrame extends Component {
  render() {
    return (

        <List style={{maxHeight: '100%', overflow: 'auto', backgroundColor: 'white'}}>
          <h3> News Headlines </h3>
          {this.props.newsData.map(article => (
            <ListItem primaryText={article.title} />
          ))}
        </List>
    );
  }
}

NewsFrame.propTypes = {
  newsData: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  newsData: state.chart.newsData,
})

export default connect(mapStateToProps ,{})(NewsFrame);