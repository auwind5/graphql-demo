import logo from './logo.svg';
import './App.css';
import Header from './views/Header';
import Footer from './views/Footer';
import Book from './views/Book'
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Book></Book>
      {/* <header className="App-header">
        <Header></Header>
        <Footer></Footer>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
