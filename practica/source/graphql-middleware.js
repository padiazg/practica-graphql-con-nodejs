const graphqlHTTP = require('express-graphql');
const { schema } = require("./schema");
const { Authors } = require("./resolvers");

// resolvers
const root = {
    authors: async (params, req, context, info) => {
        return await new Authors(params, req.pool);
    } // authors ...
}; // root ...

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
});