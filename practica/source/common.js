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
    let sql = `SELECT count(*) AS count FROM authors`;    
    return await pool.query(sql);
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
    let sql = `SELECT count(*) AS count FROM posts`;
    return await pool.query(sql);
} // getPostsCount ...
