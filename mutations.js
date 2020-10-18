const {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString,
} = require('graphql');

const { books, authors } = require('./data.js');
const { BookType, AuthorType } = require('./types');

const mutations = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root Mutation',
	fields: () => ({
		addBook: {
			type: BookType,
			description: 'Add a new book',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				const book = {
					id: books.length + 1,
					name: args.name,
					authorId: args.authorId,
				};
				books.push(book);
				return book;
			},
		},
		addauthor: {
			type: AuthorType,
			description: 'Add a new author',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				id: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve: (parent, args) => {
				const author = {
					id: authors.length + 1,
					name: args.name,
					authorId: args.id,
				};
				authors.push(author);
				return author;
			},
		},
	}),
});

module.exports = {
	mutations,
};
