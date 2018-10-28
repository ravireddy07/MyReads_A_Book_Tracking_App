import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
	state = {
		books: []
	}
	
onLookUp = (e) => {
	if (e.target.value) {
		BooksAPI.search(e.target.value)
		.then((res) => {
			if (res.error)
				this.updateBooks([])
			else {
				const thoseBooks = res.filter((book) => {
					if (book.id && book.imageLinks && book.imageLinks.smallThumbnail && book.title && book.authors)
						return true
					else
						return false
				})
				thoseBooks.forEach((book, index) => {
					this.props.theseBooks.forEach((thisBook) => {
						if(thisBook.id === book.id) {
							//Revision made based upon suggestion by Project Coach Doug Brown
							book.shelf = thisBook.shelf
						}
					})
				})
				this.updateBooks(thoseBooks)
			}
		})
	} else {
		this.updateBooks([])
	}
}

updateBooks = (books) => {
	this.setState(
	{
		books
	}
	)
}

render() {
	return (
	  <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" onChange={this.onLookUp} placeholder="Search by title or author" />
            </div>
        </div>
		<div className="search-books-results">
             <ol className="books-grid">
			  {this.state.books && this.state.books.map((book) => (
			   <li key={book.id}>
			    <Book
			      shelf={book.shelf}
		              thumbnail={book.imageLinks.smallThumbnail}
			      title={book.title}
			      authors={book.authors}
			      reviseShelf={(e) => this.props.reviseShelf(book, e.target.value)} />
			   </li>
			  ))}
			 </ol>
			 </div>
			 </div>)
}
}
	
export default Search