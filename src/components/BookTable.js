import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';

const BookTableRow = ({ book }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <tr style={{ height: '50px' }} className={`${isOpen ? 'expanded-row' : ''}`}>
                <td style={{ width: '5%' }}>
                    <button
                        className="btn btn-link p-0 text-primary-emphasis"
                        type="button"
                        title="Toggle details"
                        aria-expanded={isOpen}
                        aria-controls={`bookDetails-${book.index}`}
                        onClick={() => {
                            const elem = document.getElementById(`bookDetails-${book.index}`);
                            if (!elem) return;
                            const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(elem);
                            bsCollapse.toggle();
                            setIsOpen(prev => !prev)
                        }}
                        style={{ cursor: 'pointer', margin:'7px'}}
                    >
                        <i className={`bi ${isOpen ? 'bi-caret-up' : 'bi-caret-down'} fs-4`}></i>
                    </button>
                </td>
                <td style={{ width: '5%', verticalAlign:'middle' }} className='fw-bold'>{book.index}</td>
                <td style={{ width: '20%', verticalAlign:'middle' }} >{book.isbn}</td>
                <td style={{ width: '30%', verticalAlign:'middle'}}>{book.title}</td>
                <td style={{ width: '25%', verticalAlign:'middle' }}>{book.authors.join(', ')}</td>
                <td style={{ width: '14%', verticalAlign:'middle' }}>{book.publisher}</td>
            </tr>
            <tr>
                <td colSpan="6" className="p-0 border-0">
                    <div id={`bookDetails-${book.index}`} className="collapse" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="card card-body">
                            <div className="d-flex gap-3 align-items-start">
                              <div className='d-flex flex-column align-items-center'>
                                  <img
                                    src={`https://placehold.co/120x160?text=${encodeURIComponent(book.title)}+${encodeURIComponent(book.authors[0])}`}
                                    alt="cover"
                                    style={{ borderRadius: '4px', objectFit: 'cover' }}
                                    className='m-4'
                                    />
                                    <span className="badge rounded-pill text-bg-primary mt-4 w-100 d-flex flex-row justify-content-center align-items-center" style={{maxWidth:'50px'}}>{book.likes}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-hand-thumbs-up ms-1" viewBox="0 0 16 16">
                                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                        </svg>
                                    </span>
                              </div>
                              <div className='my-3'>
                                <h1 className='fs-4 fw-bold'>{book.title}</h1>
                                <h1 className='fs-4 fw-light'>by {book.authors}</h1>
                                <p className='fs-5 fw-lighter text-secondary'>{book.publisher}</p>
                                <h6 className='fs-5'>Reviews:</h6>
                                {book.reviews && book.reviews.length > 0 ? (
                                  <ul className="mb-0">
                                    {book.reviews.map((r, i) => (
                                      <li key={i}>
                                        <p className='fw-light fs-4 m-0'>{r.text}</p>
                                        <p className='fw-lighter text-secondary mb-3'> - {r.author}</p>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-muted">No reviews available.</p>
                                )}
                              </div>
                            </div>
                        </div>
                        </div>
                </td>
            </tr>
        </>
    );
};

const BookTable = ({ books, loadMore }) => {
    return (
        <div className="container-fluid p-0 text-bg-light">
            <table className="table mb-0" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead className="table-light">
                    <tr>
                        <th style={{ width: '5%' }}></th>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '20%' }}>ISBN</th>
                        <th style={{ width: '30%' }}>Title</th>
                        <th style={{ width: '25%' }}>Author(s)</th>
                        <th style={{ width: '15%' }}>Publisher</th>
                    </tr>
                </thead>
            </table>
            <div id="scrollableDiv" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <InfiniteScroll
                    dataLength={books.length}
                    next={loadMore}
                    hasMore={true}
                    scrollableTarget="scrollableDiv"
                    loader={
                        <div className="d-flex justify-content-center m-4 text-secondary">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    }
                >
                    <table className="table" style={{ tableLayout: 'fixed', width: '100%' }}>
                        <tbody>
                        {books.map((book, i) => (
                        <BookTableRow
                            key={`${book.index}-${book.isbn}`}
                            book={book}
                        />
                        ))}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default BookTable;