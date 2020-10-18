const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLList,
} = require('graphql');

const { books, authors } = require('./data.js');

const AuthorType = new GraphQLObjectType({
	name: 'author',
	description: 'an author',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		books: {
			type: new GraphQLList(BookType),
			resolve: (author) => books.filter((book) => book.authorId === author.id),
		},
	}),
});

const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'a book',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLString },
		authorId: { type: GraphQLInt },
		author: {
			type: AuthorType,
			resolve: (book) => authors.find((author) => book.authorId === author.id),
		},
	}),
});

module.exports = {
	AuthorType,
	BookType,
};
