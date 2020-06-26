const { buildSchema } = require('graphql');

exports.schema = buildSchema(`
scalar Date

type Author {
    id: Int! # ID!
    first_name: String!
    last_name: String!
    email: String
    birthdate: Date
    added: Date
}

type Post {
    id: Int!
    title: String!
}

type Authors {
    list: [Author]!
    count: Int!
}

type Posts {
    list: [Post]!
    count: Int!
}

type Query {
    authors(
        limit: Int = 20
        offset: Int = 0
        id: Int
    ): Authors

    posts(
        limit: Int = 20
        offset: Int = 0
        id: Int
    ): Posts
}
`);