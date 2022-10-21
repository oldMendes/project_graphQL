import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from 'crypto';

/**
* Under fetching
* Rota http que retorna dados de menos
*
* Over fetchig
* Rota Http retorna mais dados do que precisa
*/

/*
  Schema first approach
  Code first
*/
const typeDefs = gql`
  type User {
    id: String!,
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`
interface User {
  id: String,
  name: String
}

const users: User[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      users: () => {
        return users
      }
    },
    Mutation: {
      createUser: (_, args) => {
        const user = {
          id: randomUUID(),
          name: args.name
        };

        users.push(
          user
        );

        return user;
      }
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Http server running on ${url} `);
})

