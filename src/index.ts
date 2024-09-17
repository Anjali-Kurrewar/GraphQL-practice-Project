import express from 'express'; 
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";

async function init() {
const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

//Create GraphQL server
const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
        hello: String
        }
    `, //Schemas
    resolvers: {
        Query: {
            hello: () => `Hey there, I am a graphQL server`
        },
    } //Code or function that will be executed
})

//Start the GQL server
await gqlServer.start();
app.use("/graphQL", expressMiddleware(gqlServer));

app.get("/", (req, res) => {
    res.json({message: "Server is up and running."});
});

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
}

init();