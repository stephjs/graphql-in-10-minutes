const { GraphQLObjectType, GraphQLList, GraphQLInt } = require('graphql');

const { books, authors } = require('./data.js');
const { BookType, AuthorType } = require('./types');

const queries = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		book: {
			type: BookType,
			description: 'A single book',
			args: {
				id: { type: GraphQLInt },
			},
			resolve: (parent, args) => books.find((book) => book.id === args.id),
		},
		books: {
			type: new GraphQLList(BookType),
			description: 'List of All Books',
			resolve: () => books,
		},
		author: {
			type: AuthorType,
			description: 'An author',
			args: {
				id: { type: GraphQLInt },
			},
			resolve: (parent, args) =>
				authors.find((author) => author.id === args.id),
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of All Books',
			resolve: () => authors,
		},
	}),
});

module.exports = {
	queries,
};
