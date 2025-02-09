const levenshtein = require('fast-levenshtein');
const fuzzysearch = require('fuzzysearch');
const bookModel = require("../Schemas/bookSchema");
const mongoose = require("mongoose");

function averageSimilarity(str1, str2) {

    const levenshteinDistance = levenshtein.get(str1, str2);
    const levenshteinSimilarity = (1 - levenshteinDistance / Math.max(str1.length, str2.length)) * 100;

    const fuzzysearchSimilarity = fuzzysearch(str1, str2) ? 100 : 0;

    const averageScore = (levenshteinSimilarity + fuzzysearchSimilarity) / 2;

    return averageScore;

}

async function findBestMatchingBook(title, author) {
    
    try {

        const books = await bookModel.find();
        let bestMatch = null;
        let highestSimilarity = 0; 

        books.forEach((book) => {
            const currentSimilarityTitle = averageSimilarity(title, book.title);
            const currentSimilarityAuthor = averageSimilarity(author, book.author);
            const currentSimilarity = (currentSimilarityAuthor + currentSimilarityTitle) / 2;
            if (currentSimilarity > highestSimilarity) {
                highestSimilarity = currentSimilarity;
                bestMatch = book;
            }
        });

        return bestMatch;

    } catch (error) {
        console.log(`An eroor occured: ${error}`);
    } 

}


