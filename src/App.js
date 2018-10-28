import React from 'react'
import * as BooksAPI from './BooksAPI'
import AllBooks from './AllBooks';
import Search from './Search';
import { Route } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
	 books: []
  }
 
  componentDidMount() {
	BooksAPI.getAll()
	 .then((books) => {
		this.setState({
		  books
		})
	  })
  }
  
  onReviseShelf = (book, revisedShelf) => {
	  BooksAPI.update(book, revisedShelf)
	  .then((res) => {
		  this.setState((prevState) => {
			  const books = [...prevState.books];
			  const bookPlace = books.findIndex((b) => b.id === book.id)
			  if (bookPlace  >= 0) {
	                     books[bookPlace].shelf = revisedShelf;
	                     } else {
		                 BooksAPI.get(book.id)
		                 .then((res) => {
			             if (!res.error)
				         books.push(res)
			             })
		                 }
			 
			  return {
				  books
			  }
		  })
	  })
  }

  render() {
	return (
      <div className="app">
	    <Route exact path='/' render={() => (
	      <AllBooks books={this.state.books} reviseShelf={this.onReviseShelf} />
	    )} />
	    <Route path='/search' render={({ history }) => (
	      <Search theseBooks={this.state.books} reviseShelf={this.onReviseShelf} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp