/* Layout/container for Weekly Words application */
import React, { Component } from 'react';
import './weeklyWords.css';

import Header from './header';
import MainContent from './mainContent';
import Footer from './footer';

class WeeklyWords extends Component {
  render() {
    return (
      <div className="Container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    );
  }
}

export default WeeklyWords;
