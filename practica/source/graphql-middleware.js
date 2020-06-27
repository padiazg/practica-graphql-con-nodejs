const { makeExecutableSchema } = require('graphql-tools');
const schema = require('./schema');
const { Authors, Posts } = require("./resolvers");

const { getPostsByAuthor } = require("./common.js");

// const debugResolver = async (root, args, context, info) => {
//     console.log("root =>", JSON.stringify(root, null, 2));
//     console.log("args =>", JSON.stringify(args, null, 2));
//     console.log("context =>", context.pool);
// }

// resolvers
const resolvers = {
    Query: {
        authors: async (root, params, context) => await new Authors(params, context.pool),
        posts: async (root, params, context) => await new Posts(params, context.pool),
    },
    Post: {
        author: async (root, params, context) => {
            const author = new Authors({id: root.author_id}, context.pool);
            const list = await author.list();
            return list[0];
        }
    },
    Author: {
        posts: async (root, params, context) => {
            return await getPostsByAuthor(context.pool, root.id);
        }
    }
}; // root ...

module.exports = makeExecutableSchema({
    typeDefs: schema,
    resolvers
});