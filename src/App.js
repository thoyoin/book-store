import seedrandom from 'seedrandom';
import { faker } from '@faker-js/faker';
import BookTable from "./components/BookTable";
import Header from "./components/Header";
import './index.css'
import React, { useState } from 'react';

const generateBook = (index, seed, language, avgReviews, avgLikes) => {
    const combinedSeed = seed + index.toString();
    const rng = seedrandom(combinedSeed);

    faker.locale = language;
    faker.seed(rng.int32());

    const reviewsInt = Math.floor(avgReviews);
    const fractional = avgReviews - reviewsInt;
    const finalReviewCount = reviewsInt + (rng() < fractional ? 1 : 0);

    const reviewList = Array.from({ length: finalReviewCount }, () => ({
        author: faker.name.fullName(),
        text: faker.lorem.sentence(),
    }));

    const likesInt = Math.floor(avgLikes);
    const likesFraction = avgLikes - likesInt;
    const finalLikesCount = likesInt + (rng() < likesFraction ? 1 : 0);

    return {
        index: index + 1,
        isbn: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
        title: faker.commerce.productName(),
        authors: [faker.name.fullName()],
        publisher: faker.company.name(),
        reviews: reviewList,
        likes: finalLikesCount,
    };
};

function App() {
    const [seed, setSeed] = useState('58933423');
    const [likes, setLikes] = useState('5.0')
    const [reviews, setReviews] = useState('5.0')
    const [language, setLanguage] = useState('en')
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);

    const loadMore = () => {
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            const startIndex = books.length;

            const generatedBooks = Array.from({ length: 10 }, (_, i) =>
                generateBook(startIndex + i, seed, language, parseFloat(reviews), parseFloat(likes))
            );

            setBooks(prevBooks => {
                const allBooks = [...prevBooks, ...generatedBooks];
                const seen = new Set();
                return allBooks.filter(book => {
                    if (seen.has(book.index)) return false;
                    seen.add(book.index);
                    return true;
                });
            });
            return nextPage;
        });
    };

    React.useEffect(() => {
        setPage(0);
        const count = 20;
        const newBooks = Array.from({ length: count }, (_, i) =>
            generateBook(i, seed, language, parseFloat(reviews), parseFloat(likes))
        );
        setBooks(newBooks);
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
        />
        <BookTable
            books={books}
            loadMore={loadMore}
        />
    </div>
  );
}

export default App;
