const debug = require("debug")("common");

exports.getAuthors = async (pool, {id, limit, offset}) => {
    debug(`getAuthors | id => ${id}`);
    let sql = `SELECT * FROM authors`;
    if (id) sql = `${sql} WHERE id=${id}`;
    sql = `${sql} ORDER by first_name, last_name`;
    if (limit) sql = `${sql} LIMIT ${limit}`;
    if (offset) sql = `${sql} OFFSET id=${id}`;
    return await pool.query(sql);
} // getAuthors ...

exports.getAuthorsCount = async (pool) => {
    debug(`getAuthorsCount`);
    return await pool.query(`SELECT count(*) AS count FROM authors`);
} // getAuthorsCount ...

exports.getPosts = async (pool, {id, limit, offset}) => {
    debug(`getPosts | id => ${id}`);
    let sql = `SELECT * FROM posts`;
    if (id) sql = `${sql} WHERE id=${id}`;
    if (limit) sql = `${sql} LIMIT ${limit}`;
    if (offset) sql = `${sql} OFFSET id=${id}`;
    return await pool.query(sql);
} // getPosts ...

exports.getPostsCount = async (pool) => {
    debug(`getPostsCount`);
    return await pool.query(`SELECT count(*) AS count FROM posts`);
} // getPostsCount ...

exports.getPostsByAuthor = async (pool, authorId) => {
    debug(`getPostsByAuthor | authorId => ${authorId}`);
    return await pool.query(`SELECT * FROM posts WHERE author_id=${authorId}`);
}

exports.getPostsByAuthorCount = async (pool, authorId) => {
    debug(`getPostsByAuthorCount | authorId => ${authorId}`);
    return await pool.query(`SELECT count(*) AS count FROM posts WHERE author_id=${authorId}`);
}
