import { MongoClient, ObjectId } from 'mongodb';

let movies;

export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {
            return;
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        }
        catch (e) {
            console.error(`Unable to connect in MoviesDAO: ${e}`);
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query = {};
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } };
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } };
            }
        }

        let cursor;
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return { moviesList, totalNumMovies };
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }

    static async getMovieById(id) {
        try {
            const objectId = new ObjectId(id);
            const pipeline = [
                { $match: { _id: objectId } },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "movie_id",
                        as: "reviews"
                    }
                }
            ];

            return await movies.aggregate(pipeline).next();
        }
        catch (error) {
            console.error(`Something went wrong in getMovieById: ${error}`);
            throw error;
        }
    }

    static async getRatings() {
        let ratings = [];
        try {
            ratings = await movies.distinct("rated");
            return ratings;
        } catch (err) {
            console.error(`Unable to get ratings: ${err}`);
            return ratings;
        }
    }
}
