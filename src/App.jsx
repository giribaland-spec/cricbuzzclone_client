import React from 'react';
import Header from './components/Header';
import LiveScore from './components/LiveScore';
import NewsSection from './components/NewsSection';
import './index.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content container">
        <LiveScore />
        <NewsSection />
      </main>
    </div>
  );
}

export default App;
