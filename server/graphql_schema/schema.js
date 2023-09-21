// Description: This file contains the schema for the GraphQL server
// bringing client and projects array from data.js and dstructuring it
// const { projects, clients } = require('../data.js');

// bring mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');
// bringing things from graphql

const { GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    // GraphQLInt,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLList,
    GraphQLScalarType } = require('graphql');


// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({ // function that returns an object
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        // to get client details from client id/foreign key 
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            }
        }
    })

});
// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({ // function that returns an object
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

// get client by id: create root query objcet
const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // getting all projects
        projects: {
            // list of project type
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                // code to get data from db / other source
                // return projects; // returns all projects from data.js
                return Project.find({}); // returns all projects from db
            }
        },

        // getting project by id
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // return projects.find(project => project.id === args.id);
                return Project.findById(args.id);
            }
        },
        // getting all clients
        clients: {
            // list of client type
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                // code to get data from db / other source
                // return clients; // returns all clients from data.js
                return Client.find({}); // returns all clients from db
            }
        },
        // getting client by id
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                // return clients.find(client => client.id === args.id);
                return Client.findById(args.id);
            }
        }
    }
})


// mutations: add, update, delete
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: { // addProject, updateProject, deleteProject
        addProject: {
            type: ProjectType,   // return type
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            }
        },
        updateProject: {
            type: ProjectType,   // return type
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: (GraphQLString) }, // optional for updation
                description: { type: (GraphQLString) }, // do not want to specify all fields
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    { new: true }  // create new object if not found
                    // return updated object
                );
            }
        },
        deleteProject: {
            type: ProjectType,   // return type
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            }
        },
        // addClient, updateClient, deleteClient
        addClient: {
            type: ClientType,   // return type
            args: {
                // id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) { // resolve function to add data to db
                let client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save();
            }
        },
        updateClient: {
            type: ClientType,   // return type
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            email: args.email,
                            phone: args.phone
                        }
                    },
                    { new: true } // return updated object
                );
            }
        },
        deleteClient: {
            type: ClientType,   // return type
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                Project.find({ clientId: args.id }).then((projects) => {
                    projects.forEach((project) => {
                        project.deleteOne(); // remove is not a function it throws error
                    });
                });

                return Client.findByIdAndRemove(args.id);
            },
        },
    }
});

// export as a schema
module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
})

