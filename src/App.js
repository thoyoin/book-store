import BookTable from "./components/BookTable";
import Footer from "./components/Footer";
import Header from "./components/Header";
import './index.css'
import React, { useState, useEffect } from 'react';

function App() {
    const [seed, setSeed] = useState('58933423');
    const [likes, setLikes] = useState('5.0');
    const [reviews, setReviews] = useState('5.0');
    const [language, setLanguage] = useState('en');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [view, setView] = useState('table');

    const fetchBooks = async (pageToFetch = 0) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/books?seed=${seed}&language=${language}&likes=${likes}&reviews=${reviews}&page=${pageToFetch}`);
        const data = await res.json();
        return data;
    };

    const loadMore = () => {
        fetchBooks(page + 1).then(newBooks => {
            setBooks(prevBooks => {
                const allBooks = [...prevBooks, ...newBooks];
                const seen = new Set();
                return allBooks.filter(book => {
                    if (seen.has(book.index)) return false;
                    seen.add(book.index);
                    return true;
                });
            });
            setPage(prevPage => prevPage + 1);
        });
    };

    useEffect(() => {
        setPage(0); 
        fetchBooks(0).then(newBooks => {
            setBooks(newBooks);
        });
    }, [seed, language, likes, reviews]);

  return (
    <div className="App">
        <Header 
            seed={seed}
            setSeed={setSeed}
            likes={likes}
            setLikes={setLikes}
            reviews={reviews}
            setReviews={setReviews}
            language={language}
            setLanguage={setLanguage}
            view={view}
            setView={setView}
        />
        <BookTable
            books={books}
            loadMore={loadMore}
            view={view}
        />
        <Footer
            books={books}
        />
    </div>
  );
}

export default App;
