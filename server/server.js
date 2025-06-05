const express = require('express');
const cors = require('cors');
const seedrandom = require('seedrandom');
const { Faker, en, ru, pl } = require('@faker-js/faker');

const locales = {
    en,
    ru,
    pl,
};


const app = express();

app.use(cors());
const port = process.env.PORT || 10000;

const generateBook = (index, seed, language, avgReviews, avgLikes) => {
    const combinedSeed = seed + index.toString() + language;
    const rng = seedrandom(combinedSeed);

    const selectedLocale = locales[language];

    const faker = new Faker({
        locale: [selectedLocale, en],
    });

    faker.seed(rng.int32());

    const reviewsInt = Math.floor(avgReviews);
    const fractional = avgReviews - reviewsInt;
    const finalReviewCount = reviewsInt + (rng() < fractional ? 1 : 0);

    const reviewList = Array.from({ length: finalReviewCount }, () => ({
        author: faker.person.fullName(),
        text: faker.lorem.sentence(),
    }));

    const likesInt = Math.floor(avgLikes);
    const likesFraction = avgLikes - likesInt;
    const finalLikesCount = likesInt + (rng() < likesFraction ? 1 : 0);

    return {
        index: index + 1,
        isbn: Array.from({ length: 13 }, () => Math.floor(rng() * 10)).join(''),
        title: faker.commerce.productName(),
        authors: faker.person.fullName(),
        publisher: faker.person.fullName(),
        reviews: reviewList,
        likes: finalLikesCount,
    };
};

app.get('/books', (req, res) => {
    const seed = req.query.seed || 'default';
    const language = req.query.language || 'en';
    const page = parseInt(req.query.page) || 0;
    const avgLikes = parseFloat(req.query.likes) || 0;
    const avgReviews = parseFloat(req.query.reviews) || 0;

    const startIndex = page * 10;
    const books = Array.from({ length: 10 }, (_, i) =>
        generateBook(startIndex + i, seed, language, avgReviews, avgLikes)
    );

    res.json(books);
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});