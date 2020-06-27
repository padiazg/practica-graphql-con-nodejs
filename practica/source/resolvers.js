// referencia
// https://graphql.org/graphql-js/object-types/

const debug = require("debug")("resolvers");
const {     getAuthors, 
    getAuthorsCount, 
    getPosts, 
    getPostsCount,
    getPostsByAuthor,
    getPostsByAuthorCount 
} = require("./common.js");

exports.Authors = class Authors {
    constructor({id, limit, offset}, pool) {
        debug(`Authors | constructor`);
        
        this.pool   = pool;
        this.id     = id;
        this.limit  = limit || 20;
        this.offset = offset;        
    } // constructor ...

    async list() {
        debug(`Authors | list id=${this.id}`);
        return await getAuthors(this.pool, this);
    }

    async count() {
        debug(`Authors | count`);
        const [q] = await getAuthorsCount(this.pool);
        return q.count;
    }
} // class Authors ...

exports.Posts = class Posts {
    constructor({id, limit, offset}, pool) {
        debug(`Posts | constructor`);
        
        this.pool   = pool;
        this.id     = id;
        this.limit  = limit || 20;
        this.offset = offset;        
    } // constructor ...

    async list() {
        debug(`Posts | list id=${this.id}`);
        return await getPosts(this.pool, this);
    }

    async count() {
        debug(`Posts | count`);
        const [q] = await getPostsCount(this.pool);
        return q.count;
    }    
} // class Posts ...