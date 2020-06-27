const { gql } = require("apollo-server-express");

module.exports = gql`
scalar Date

type Author {
    id: Int! # ID!
    first_name: String!
    last_name: String!
    email: String
    birthdate: Date
    added: Date
    posts: [Post]
}

type Post {
    id: Int!
    title: String!
    author_id: Int!
    description: String
    content: String
    date: Date
    author: Author
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
`;