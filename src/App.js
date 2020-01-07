import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      page: 0,
      results: 40,
      totalitems: 0
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  nextPage = e => {
    e.preventDefault();
    this.setState({ page: this.state.page + 1 }, () => {
      this.performSearch();
    });
  };

  performSearch() {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=engineer&printType=all&maxResults=${
        this.state.results
      }&startIndex=${this.state.page * this.state.results}`
    )
      .then(res => res.json())
      .then(res =>
        this.setState({ books: res.items, totalItems: res.totalItems })
      )
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <p># of results {this.state.totalItems}</p>
        <p>Page {this.state.page + 1}</p>
        <p>
          <a href="#" onClick={e => this.nextPage(e)}>
            Next Page
          </a>
        </p>
        <ul>
          {this.state.books.map(book => (
            <li>{book.volumeInfo.title}</li>
          ))}
        </ul>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}
