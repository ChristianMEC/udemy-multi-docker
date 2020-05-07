import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1 className="App-title">Welcome to React</h1>
          <div style={{ display: 'flex', backgroundColor: '#999', padding: 20, justifyContent: 'space-around', marginBottom: 80 }}>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Ohter Page</Link>
          </div>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
