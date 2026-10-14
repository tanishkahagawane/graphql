# 1. GraphQL Fundamentals

## 1. What is GraphQL?

GraphQL is an open-source query language for APIs and a runtime developed by Facebook (now Meta). It allows clients to request exactly the data they need from a server, avoiding unnecessary data transfer.

Unlike REST APIs, where we often use multiple endpoints to fetch different resources, GraphQL typically uses a single endpoint to fetch related data in one request.

Key features of GraphQL:

- Flexible queries: Clients can request only the required fields.
- Single endpoint: Typically uses one endpoint for queries, mutations, and subscriptions.
- Strongly typed schema: Defines the types of data available and the operations clients can perform.
- Queries: Used to fetch data.
- Mutations: Used to create, update, or delete data.
- Subscriptions: Used to receive real-time updates, commonly through WebSockets.

Example:

```
query {
  user(id: 1) {
    name
    email
  }
}
```

In this example, GraphQL returns only the user's `name` and `email` fields.

In short: GraphQL helps clients fetch the exact data they need through a flexible and strongly typed API, reducing unnecessary data transfer and simplifying data fetching.

---

## 2. What are the main advantages of GraphQL over REST API?

GraphQL offers several advantages over REST APIs, mainly in terms of data fetching flexibility, performance, and developer experience.

Main advantages of GraphQL:

1. Fetch only required data: GraphQL allows clients to request only the fields they need, avoiding over-fetching and under-fetching of data.
2. Single endpoint: GraphQL typically uses a single endpoint for different operations, whereas REST APIs generally use multiple endpoints for different resources.
3. Reduced network requests: GraphQL can fetch related data from multiple resources in a single query, reducing the need for multiple API calls.
4. Strongly typed schema: GraphQL uses a schema to define available data types and operations, making APIs easier to understand, validate, and maintain.
5. Real-time updates: GraphQL supports subscriptions, which allow clients to receive real-time updates when data changes.
6. API evolution: GraphQL allows new fields to be added without necessarily breaking existing clients. Fields can be deprecated gradually instead of creating new API versions for every change.
7. Better developer experience: Its introspection capabilities and tools such as GraphiQL make it easier to explore, test, and debug APIs.

Example:

In REST, we might need separate API calls to fetch a user's details and their posts:

```
GET /users/1
GET /users/1/posts
```

In GraphQL, we can fetch both in a single query:

```
query {
  user(id: 1) {
    name
    email
    posts {
      title
    }
  }
}
```

This allows us to retrieve the user's name, email, and post titles in one request.

In short: GraphQL provides more flexible data fetching, can reduce network requests, and offers a strongly typed schema. However, REST can be simpler to implement and may be better suited for straightforward APIs, HTTP caching, and resource-oriented operations.

---

## 3. What is the difference between GraphQL and REST API?

GraphQL and REST are two approaches used to design APIs. The main difference is that REST uses multiple endpoints to access resources, whereas GraphQL typically uses a single endpoint and allows clients to request exactly the data they need.

### Key differences between GraphQL and REST

| Feature          | GraphQL                                                    | REST API                                                       |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| API endpoints    | Typically a single endpoint                                | Multiple endpoints                                             |
| Data fetching    | Fetches only requested fields                              | Response structure is usually defined by the endpoint          |
| Network requests | Can fetch related data in one request                      | May require multiple requests                                  |
| Data format      | Commonly JSON                                              | Commonly JSON, but supports other formats                      |
| Operations       | Queries, mutations, subscriptions                          | Commonly GET, POST, PUT, PATCH, DELETE                         |
| Schema           | Strongly typed schema                                      | Schema is optional; OpenAPI can document the API               |
| Versioning       | Often evolves by adding and deprecating fields             | Often uses versioning, such as `/api/v1`                       |
| Caching          | Requires additional consideration for query-based requests | HTTP caching is often straightforward with GET requests        |
| Error handling   | Can return partial data along with errors                  | Commonly uses HTTP status codes to indicate success or failure |

### Example

REST API:

To fetch user details and their posts, we might make two requests:

```
GET /users/1
GET /users/1/posts
```

GraphQL:

We can fetch the same information using one query:

```
query {
  user(id: 1) {
    name
    email
    posts {
      title
    }
  }
}
```

GraphQL returns only the requested fields, while REST returns the response structure defined by each endpoint.

### When should we use each?

- GraphQL: Best when clients need flexible data fetching, related data from multiple resources, or different response fields for different screens.
- REST: Best for straightforward resource-based APIs, standard HTTP caching, and applications where fixed response structures are sufficient.

Interview conclusion: GraphQL provides flexible data fetching through a query language and a strongly typed schema, while REST organizes APIs around resources and HTTP methods. GraphQL can reduce unnecessary data transfer and multiple requests, but it also introduces complexity in caching, authorization, and query performance management. Neither approach is universally better; the choice depends on the application's requirements.

---

## 4. What are the core components of GraphQL?

The core components of GraphQL are Schema, Types, Queries, Mutations, Resolvers, and Subscriptions. These components work together to define the data an API exposes and how clients can access or modify it.

### 1. Schema

The schema defines the structure of the API, including available data types and operations. It acts as a contract between the client and the server.

### 2. Types

Types define the shape of the data available in GraphQL. Common types include:

- Scalar types: `String`, `Int`, `Float`, `Boolean`, and `ID`
- Object types: Represent entities such as `User` or `Product`
- List types: Represent a list of values, such as `[User]`
- Non-null types: Indicate that a value cannot be null, such as `String!`

Example:

```
type User {
  id: ID!
  name: String!
  email: String!
}
```

### 3. Queries

Queries are used to fetch or read data from the server.

```
query {
  user(id: "1") {
    name
    email
  }
}
```

### 4. Mutations

Mutations are used to create, update, or delete data on the server.

```
mutation {
  createUser(name: "John", email: "john@example.com") {
    id
    name
  }
}
```

### 5. Resolvers

Resolvers are functions that determine how to fetch or modify the data requested by a GraphQL operation. They connect the schema to data sources such as databases, REST APIs, or other services.

For example, a `user` resolver might fetch a user record from a database based on the provided ID.

### 6. Subscriptions

Subscriptions allow clients to receive real-time updates when specific events occur, commonly using WebSockets.

Example:

```
subscription {
  userCreated {
    id
    name
  }
}
```

When a new user is created, subscribed clients can receive the event.

### 7. Input Types

Input types define the structure of complex data passed into mutations or other arguments.

```
input CreateUserInput {
  name: String!
  email: String!
}
```

This helps organize and validate input data.

Interview conclusion:

The core components of GraphQL are schemas, types, queries, mutations, resolvers, and subscriptions. The schema defines what operations are available, types describe the data structure, queries retrieve data, mutations modify data, resolvers execute the required logic, and subscriptions provide real-time updates. Input types help structure complex input data.

---

## 5. What is a GraphQL Schema?

A GraphQL schema defines the structure of a GraphQL API. It specifies what data is available, the data types, and which operations clients can perform, such as fetching, creating, updating, or deleting data.

The schema acts as a contract between the client and the server, ensuring that clients request data and perform operations supported by the API.

### Example

```
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
}
```

### Explanation

- `type User` defines the structure of a user with an ID, name, and email.
- `type Query` defines read operations, such as fetching one user or a list of users.
- `type Mutation` defines write operations, such as creating a user.
- `String!` and `ID!` indicate non-null fields, meaning those fields cannot return `null`.
- `[User!]!` means the list itself cannot be null, and its user elements cannot be null.

### Main responsibilities of a GraphQL schema

1. Defines available data types and fields.
2. Specifies supported queries, mutations, and subscriptions.
3. Validates incoming GraphQL operations against the API structure.
4. Helps clients discover available fields through introspection.

Interview conclusion: A GraphQL schema is a strongly typed definition of an API that describes the available data, its structure, and supported operations. It enables validation of client requests and provides a clear contract between the client and server.

---

## 6. What is a Type System in GraphQL?

The type system in GraphQL defines the structure and types of data that can be requested or returned by an API. It ensures that the API follows a clearly defined schema and helps validate queries before they are executed.

GraphQL uses a strongly typed schema, where every field has a specific type.

### Types of the GraphQL type system

1\. Scalar Types

These are basic data types supported by GraphQL.

- `String` – Represents text.
- `Int` – Represents a 32-bit integer.
- `Float` – Represents a floating-point number.
- `Boolean` – Represents `true` or `false`.
- `ID` – Represents a unique identifier.

2\. Object Types

Define the structure of an entity and its fields.

```
type User {
  id: ID!
  name: String!
  age: Int
}
```

3\. Query and Mutation Types

- `Query` defines operations to fetch data.
- `Mutation` defines operations to create, update, or delete data.

4\. Enum Types

Define a fixed set of allowed values.

```
enum Status {
  ACTIVE
  INACTIVE
  PENDING
}
```

5\. List Types

Represent a list of values or objects.

```
users: [User!]!
```

This means the list cannot be null, and its elements cannot be null.

6\. Input Types

Define the structure of input data passed to operations.

```
input CreateUserInput {
  name: String!
  email: String!
}
```

7\. Non-null Types

The `!` symbol indicates that a field or argument cannot be null.

For example, `name: String!` means the name field must return a non-null string.

### Why is the GraphQL type system important?

- Validates queries before execution.
- Helps prevent invalid field selections and incorrect argument types.
- Makes APIs easier to understand and maintain.
- Enables tools to provide autocomplete and schema documentation.

Interview conclusion: The GraphQL type system defines the data types, fields, and operations available in an API. It includes scalar, object, enum, list, input, and non-null types. It helps validate queries and ensures that clients interact with the API according to its schema.

---

## 7. What are Queries, Mutations, and Subscriptions?

In GraphQL, Queries, Mutations, and Subscriptions are the three main operation types used to interact with the server.

- Queries are used to read or fetch data.
- Mutations are used to create, update, or delete data.
- Subscriptions are used to receive real-time updates from the server.

### 1. Query

A Query is used to retrieve data from the server without modifying it.

Example:

```
query {
  user(id: "1") {
    name
    email
  }
}
```

Explanation: This query fetches the name and email of the user whose ID is `1`.

### 2. Mutation

A Mutation is used to modify data on the server, such as creating, updating, or deleting a record.

Example:

```
mutation {
  createUser(name: "John", email: "john@example.com") {
    id
    name
  }
}
```

Explanation: This mutation creates a user and returns the user's ID and name.

### 3. Subscription

A Subscription is used to receive real-time updates when a specific event occurs on the server. It commonly uses WebSockets or another supported streaming transport.

Example:

```
subscription {
  messageAdded {
    id
    content
  }
}
```

Explanation: When a new message is added, the server sends the updated message data to clients subscribed to this event.

### Key differences

| Feature       | Query                          | Mutation                          | Subscription                     |
| ------------- | ------------------------------ | --------------------------------- | -------------------------------- |
| Purpose       | Fetch data                     | Modify data                       | Receive real-time updates        |
| Typical use   | Read user details              | Create a user                     | Receive new messages             |
| Data changes  | No intended changes            | Yes                               | Depends on the event             |
| Execution     | Fields can execute in parallel | Top-level fields execute serially | Remains active to receive events |
| Communication | Request-response               | Request-response                  | Ongoing event stream             |

### Interview conclusion

Queries, Mutations, and Subscriptions are the three main operation types in GraphQL. Queries retrieve data, Mutations modify data, and Subscriptions provide real-time updates. Together, they allow clients to read, write, and receive updates from a GraphQL API efficiently.

---

## 8. What is a resolver in GraphQL?

A resolver in GraphQL is a function responsible for fetching or providing the data for a specific field defined in the GraphQL schema. It connects the schema to the actual data sources, such as databases, REST APIs, or other services.

In simple terms, the schema defines what data is available, and the resolver defines how to fetch that data.

### Example

1\. GraphQL Schema

```
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
}
```

2\. Resolver Function (JavaScript)

```
const resolvers = {
  Query: {
    user: async (_, args, context) => {
      return await context.db.users.findById(args.id);
    }
  }
};
```

Explanation:

- `Query` identifies the root query type.
- `user` is the resolver function for the `user` field.
- `args` contains the arguments passed by the client, such as `id`.
- `context` provides shared resources, such as database connections or authenticated user information.
- The resolver fetches the user from the database and returns the result.

### How does a resolver work?

Client sends a GraphQL query

GraphQL schema validates the query

Resolver executes the required logic

Data is returned in the GraphQL response

### Resolver function arguments

In JavaScript GraphQL implementations such as Apollo Server, a resolver commonly receives four arguments:

1. `parent` – The result returned by the parent resolver.
2. `args` – The arguments passed to the field.
3. `context` – Shared information, such as authentication details or database connections.
4. `info` – Information about the current GraphQL query and execution.

### Types of resolvers

- Query resolvers: Fetch data.
- Mutation resolvers: Create, update, or delete data.
- Subscription resolvers: Set up a stream of events for real-time updates.
- Field resolvers: Resolve individual fields within an object type.

Interview conclusion: A resolver is a function that provides the data for a GraphQL field. It connects the GraphQL schema to data sources, processes arguments, performs the required business logic, and returns the result to the client.

---

## 9. What is the difference between a Query and a Mutation in GraphQL?

In GraphQL, a Query is used to fetch or read data, whereas a Mutation is used to modify data on the server, such as creating, updating, or deleting records.

### Key differences

| Feature           | Query                                    | Mutation                          |
| ----------------- | ---------------------------------------- | --------------------------------- |
| Purpose           | Retrieve data                            | Modify data                       |
| Operations        | Read operations                          | Create, update, delete            |
| Data modification | Not intended to modify data              | Typically changes server data     |
| Execution         | Top-level fields can execute in parallel | Top-level fields execute serially |
| Example           | Fetch user details                       | Create a new user                 |
| HTTP method       | Commonly POST; GET may also be used      | Commonly POST                     |

### 1. Query Example

```
query {
  user(id: "1") {
    name
    email
  }
}
```

Explanation: This query fetches the name and email of a user without intending to modify the data.

### 2. Mutation Example

```
mutation {
  createUser(name: "John", email: "john@example.com") {
    id
    name
  }
}
```

Explanation: This mutation creates a new user and returns the user's ID and name.

### When should we use them?

- Use a Query when you want to display data, such as user profiles, product lists, or order details.
- Use a Mutation when you want to perform an action, such as registering a user, updating a profile, or deleting a record.

Interview conclusion: The main difference is that Queries are used to retrieve data, while Mutations are used to change data on the server. In GraphQL, top-level query fields can execute in parallel, whereas top-level mutation fields execute serially to maintain a defined execution order.

---

## 10. What is the role of the GraphQL Server?

A GraphQL server is responsible for receiving GraphQL requests from clients, validating them against the GraphQL schema, executing the requested operations using resolvers, and returning the results in JSON format.

In simple terms, the GraphQL server acts as a bridge between the client and the data sources, such as databases, REST APIs, and other services.

### Main responsibilities of a GraphQL server

1. Receive requests: Accepts GraphQL queries, mutations, and subscriptions from clients.
2. Validate requests: Checks whether the requested fields, arguments, and types are valid according to the schema.
3. Execute resolvers: Calls the appropriate resolver functions to fetch or modify data.
4. Access data sources: Connects to databases, external APIs, or other services to retrieve or update data.
5. Return responses: Sends the requested data and any execution errors back to the client.
6. Handle security: Can integrate authentication, authorization, input validation, and query complexity limits.
7. Support real-time updates: Can manage subscriptions to deliver event-driven updates to clients.

### Example

Suppose a client sends the following query:

```
query {
  user(id: "1") {
    name
    email
  }
}
```

The GraphQL server performs these steps:

1\. Client

Sends a GraphQL query

2\. GraphQL Server

Validates the query and executes resolvers

3\. Database or External API

Provides the requested user data

4\. Client receives the response

Returns the user's name and email as JSON

Example response:

```
{
  "data": {
    "user": {
      "name": "John",
      "email": "john@example.com"
    }
  }
}
```

### Interview conclusion

The GraphQL server receives client requests, validates them against the schema, executes the appropriate resolvers, interacts with data sources, and returns the response. It also helps enforce security and handle errors, making it a central component of a GraphQL API.

---

---

# 2. GraphQL Queries and Types

## 11. What are Scalar Types in GraphQL?

Scalar types in GraphQL are the basic data types that represent a single value, such as text, numbers, or Boolean values. They are used to define the fields in a GraphQL schema.

GraphQL provides five built-in scalar types: `String`, `Int`, `Float`, `Boolean`, and `ID`.

### 1. Types of scalar values

| Scalar Type | Description                        | Example  |
| ----------- | ---------------------------------- | -------- |
| `String`    | Represents text                    | `"John"` |
| `Int`       | Represents a 32-bit integer        | `25`     |
| `Float`     | Represents a floating-point number | `99.50`  |
| `Boolean`   | Represents true or false           | `true`   |
| `ID`        | Represents a unique identifier     | `"101"`  |

### 2. Example

```
type User {
  id: ID!
  name: String!
  age: Int
  salary: Float
  isActive: Boolean!
}
```

Explanation:

- `id: ID!` means the user's ID must be provided as a non-null value.
- `name: String!` means the user's name must be a non-null string.
- `age: Int` represents an optional integer value.
- `salary: Float` represents an optional floating-point value.
- `isActive: Boolean!` represents a required Boolean value.

The exclamation mark (`!`) indicates that a field cannot be null.

### 3. Custom scalar types

GraphQL also allows developers to define custom scalar types for specialized values, such as dates, timestamps, or email addresses.

Example:

```
scalar Date

type User {
  id: ID!
  name: String!
  birthDate: Date
}
```

Here, `Date` is a custom scalar type. Its serialization and input validation behavior must be implemented by the GraphQL server.

### Interview conclusion

Scalar types are the basic building blocks of a GraphQL schema. GraphQL provides five built-in scalar types: `String`, `Int`, `Float`, `Boolean`, and `ID`. Developers can also define custom scalar types to handle specialized data formats, such as dates and timestamps.

---

## 12. What are Object Types in GraphQL?

Object types in GraphQL define the structure of an entity by specifying its fields and the types of data those fields return. They are used to represent real-world entities such as users, products, orders, and employees.

In simple terms, an object type groups related fields together to describe a particular entity in a GraphQL schema.

### 1. Example of an Object Type

```
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}
```

Explanation:

- `type User` defines an object type named `User`.
- `id` represents the user's unique identifier.
- `name` and `email` represent string values.
- `age` represents an integer and can be null.
- The `!` symbol indicates that a field cannot be null.

### 2. Using Object Types in Queries

Object types can be returned by queries and can contain fields that reference other object types.

```
type Post {
  id: ID!
  title: String!
}

type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Query {
  user(id: ID!): User
}
```

A client can fetch a user and their posts using:

```
query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}
```

Explanation: The `User` object type contains a `posts` field that returns a list of `Post` objects. This allows the client to fetch related data in a single query.

### 3. Key points about Object Types

- Defined using the `type` keyword.
- Contain one or more fields.
- Each field has a defined GraphQL type.
- Can reference other object types to represent relationships.
- Are commonly used as return types for queries and mutations.

Interview conclusion: An object type in GraphQL defines the structure of an entity and its fields. It can contain scalar fields, such as `String` and `Int`, as well as references to other object types. Object types help organize API data and represent relationships between entities.

---

## 13. What are Enums in GraphQL?

Enums, or enumerations, are a special type in GraphQL that define a fixed set of allowed values for a field or argument. They ensure that only predefined values can be used, helping maintain data consistency and prevent invalid inputs.

In simple terms, an enum restricts a field to a specific set of predefined values.

### 1. Example of an Enum

```
enum Status {
  ACTIVE
  INACTIVE
  PENDING
}

type User {
  id: ID!
  name: String!
  status: Status!
}
```

Explanation:

- `enum Status` defines an enum named `Status`.
- `ACTIVE`, `INACTIVE`, and `PENDING` are the only allowed values.
- The `status` field in the `User` type must use one of these values because it is non-null.

### 2. Using Enums in a Query

```
type Query {
  usersByStatus(status: Status!): [User!]!
}
```

A client can query users with a particular status:

```
query {
  usersByStatus(status: ACTIVE) {
    id
    name
    status
  }
}
```

Explanation: The query fetches users whose status is `ACTIVE`. If a client supplies a value not defined in the enum, GraphQL validation rejects the operation.

### 3. Advantages of Enums

- Data validation: Restricts values to a predefined set.
- Type safety: Helps prevent invalid values.
- Consistency: Standardizes values across the API.
- Better developer experience: Tools can provide autocomplete for allowed values.

Interview conclusion: Enums in GraphQL define a fixed set of allowed values for a field or argument. They improve type safety, validate inputs, and maintain consistency across the API. They are commonly used for statuses, roles, categories, and order types.

---

## 14. What are Input Types in GraphQL, and why are they used?

Input types in GraphQL are special types defined using the `input` keyword. They allow us to group multiple input fields into a single object and pass that object as an argument to a query or mutation.

They are commonly used when creating or updating records that require multiple fields.

In simple terms, input types help organize and pass structured data from the client to the GraphQL server.

### 1. Example of an Input Type

```
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

Explanation:

- `CreateUserInput` defines the fields required to create a user.
- `name` and `email` are required because they use `!`.
- `age` is optional because it does not use `!`.
- The `createUser` mutation accepts the input object and returns the created user.

### 2. How to use an Input Type

The client can pass the input object using GraphQL variables.

Query:

```
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
```

Variables:

```
{
  "input": {
    "name": "John",
    "email": "john@example.com",
    "age": 25
  }
}
```

The GraphQL server validates the input against the `CreateUserInput` definition before executing the mutation.

### 3. Why are Input Types used?

1. Code reusability: The same input type can be reused across multiple operations.
2. Better organization: Groups related fields into one structured object.
3. Input validation: Ensures that provided fields and values conform to the schema.
4. Maintainability: Makes complex mutations easier to understand and manage.
5. Cleaner API design: Avoids passing many individual arguments to a mutation.

### 4. Important interview point

GraphQL distinguishes between `input` types and `type` object types.

- `type` defines objects that can be returned by the API.
- `input` defines objects that clients can pass as arguments.

An input type cannot contain fields that directly reference ordinary object types; it supports input-compatible types such as scalars, enums, lists, and other input types.

Interview conclusion: Input types in GraphQL are defined using the `input` keyword and are used to pass structured data to queries or mutations. They improve reusability, validation, readability, and maintainability, especially when an operation accepts multiple fields.

---

## 15. What is the difference between `type` and `input` in GraphQL?

In GraphQL, `type` and `input` are used to define the structure of data, but they serve different purposes.

`type` defines the data an API can return, whereas `input` defines the data a client can pass to a query or mutation.

### Key differences

| Feature        | `type`                                   | `input`                                                  |
| -------------- | ---------------------------------------- | -------------------------------------------------------- |
| Purpose        | Defines output objects                   | Defines input objects                                    |
| Usage          | Return values from queries and mutations | Pass data as arguments                                   |
| Keyword        | `type`                                   | `input`                                                  |
| Fields         | Can contain scalar and object types      | Can contain scalars, enums, lists, and other input types |
| Nested objects | Can reference other object types         | Must reference input-compatible types                    |
| Example        | `User`                                   | `CreateUserInput`                                        |

### 1. Example using `type`

```
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  getUser(id: ID!): User
}
```

Explanation: The `User` type defines the structure of the user object returned by the `getUser` query.

### 2. Example using `input`

```
input CreateUserInput {
  name: String!
  email: String!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

Explanation: The `CreateUserInput` input type defines the data the client must provide to create a user. The mutation returns a `User` object.

### 3. How they work together

The client sends this mutation:

```
mutation {
  createUser(
    input: {
      name: "John"
      email: "john@example.com"
    }
  ) {
    id
    name
    email
  }
}
```

Here, `CreateUserInput` defines the input data, and `User` defines the output data.

### Interview conclusion

The main difference is that `type` is used to define output objects that the server returns, while `input` is used to define structured input data supplied by the client. Both help create a strongly typed and well-organized GraphQL API.

---

## 16. What is the difference between `String` and `String!` in GraphQL?

In GraphQL, `String` and `String!` are scalar types used to represent text, but the main difference is whether the field is allowed to return `null`.

- `String`: The field can return a string or `null`.
- `String!`: The field must return a non-null string. The `!` symbol indicates a non-null type.

### Example

```
type User {
  name: String
  email: String!
}
```

Explanation:

- `name: String` means the name can be `"John"` or `null`.
- `email: String!` means the email must return a non-null string, such as `"john@example.com"`.

### Example responses

Valid response:

```
{
  "data": {
    "name": "John",
    "email": "john@example.com"
  }
}
```

Also valid because `name` is nullable:

```
{
  "data": {
    "name": null,
    "email": "john@example.com"
  }
}
```

If `email` resolves to `null`, GraphQL reports an execution error and propagates the null to the nearest nullable parent field. Therefore, the final response may contain `null` for a larger part of the data.

### Key differences

| Feature              | `String`       | `String!`        |
| -------------------- | -------------- | ---------------- |
| Allows `null`        | Yes            | No               |
| Must return a string | No             | Yes              |
| Non-null constraint  | No             | Yes              |
| Example              | `name: String` | `email: String!` |

Interview conclusion: `String` is a nullable string type, whereas `String!` is a non-null string type. We use `String!` when a field must always have a value and `String` when the field is optional or may be unavailable.

---

## 17. What is the difference between `[User]`, `[User!]`, and `[User!]!` in GraphQL?

In GraphQL, square brackets `[]` indicate a list type, and the exclamation mark `!` indicates a non-null value. These symbols determine whether the list itself and its individual elements are allowed to be `null`.

### 1. Understanding the differences

| Type       | List can be `null`? | Items can be `null`? |
| ---------- | ------------------- | -------------------- |
| `[User]`   | Yes                 | Yes                  |
| `[User!]`  | Yes                 | No                   |
| `[User]!`  | No                  | Yes                  |
| `[User!]!` | No                  | No                   |

### 2. Examples

A. `[User]` — Nullable list with nullable items

```
users: [User]
```

- The entire list can be `null`.
- Individual items can also be `null`.

Example:

```
{
  "users": [
    { "name": "John" },
    null,
    { "name": "Alice" }
  ]
}
```

B. `[User!]` — Nullable list with non-null items

```
users: [User!]
```

- The list can be `null`.
- Individual items cannot be `null`.

Valid example:

```
{
  "users": [
    { "name": "John" },
    { "name": "Alice" }
  ]
}
```

C. `[User]!` — Non-null list with nullable items

```
users: [User]!
```

- The list cannot be `null`.
- Individual items can be `null`.

Valid example:

```
{
  "users": [
    { "name": "John" },
    null
  ]
}
```

D. `[User!]!` — Non-null list with non-null items

```
users: [User!]!
```

- The list cannot be `null`.
- Individual items cannot be `null`.
- The list can still be empty (`[]`).

Valid example:

```
{
  "users": [
    { "name": "John" },
    { "name": "Alice" }
  ]
}
```

### 3. What happens if a non-null value is `null`?

If a field declared as non-null returns `null`, GraphQL reports an execution error and propagates the null to its parent. This continues until it reaches a nullable field.

For example, if a `User!` item inside `[User!]!` resolves to `null`, the list itself becomes `null`, which then violates the list's non-null constraint. The null therefore propagates to the nearest nullable parent field.

### Interview conclusion

In GraphQL, `[]` defines a list and `!` defines a non-null constraint. `[User]` allows both a nullable list and nullable items, `[User!]` allows a nullable list but requires non-null items, and `[User!]!` requires both the list and every item to be non-null. A non-null list can still be empty.

---

## 18. What are Aliases in GraphQL?

Aliases in GraphQL allow us to rename a field in the response without changing the actual field name in the schema.

They are especially useful when we want to fetch the same field multiple times with different arguments in a single query.

### 1. Example of an Alias

Suppose we want to fetch details of two users using the same `user` field.

```
query {
  firstUser: user(id: "1") {
    name
    email
  }
  secondUser: user(id: "2") {
    name
    email
  }
}
```

Explanation:

- `firstUser` and `secondUser` are aliases.
- `user` is the actual field defined in the schema.
- Each alias fetches a different user using a different ID.
- The response uses the alias names as keys.

Response:

```
{
  "data": {
    "firstUser": {
      "name": "John",
      "email": "john@example.com"
    },
    "secondUser": {
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
```

### 2. Why are aliases used?

1. Fetch the same field multiple times: Retrieve different records in a single query.
2. Avoid field conflicts: Give different response keys to fields with different arguments.
3. Improve readability: Use meaningful names in the response.
4. Customize response keys: Make returned data easier for the client to process.

### 3. Syntax

```
aliasName: fieldName
```

For example:

```
myUser: user(id: "1") {
  name
}
```

Here, `myUser` is the alias, and `user` is the actual field name.

Interview conclusion: Aliases in GraphQL allow clients to rename fields in the response. They are particularly useful when fetching the same field multiple times with different arguments in a single query, helping avoid response-key conflicts and making the response easier to understand.

---

## 19. What are Fragments in GraphQL?

Fragments in GraphQL are reusable sets of fields that can be included in multiple queries or mutations. They help avoid repeating the same fields in different operations and make GraphQL queries easier to maintain.

In simple terms, a fragment allows us to define a group of fields once and reuse them wherever needed.

### 1. Example of a Fragment

Suppose we need to fetch the same user fields in multiple places.

Step 1: Define a fragment

```
fragment UserDetails on User {
  id
  name
  email
}
```

Here:

- `UserDetails` is the fragment name.
- `on User` specifies the object type the fragment applies to.
- `id`, `name`, and `email` are the reusable fields.

Step 2: Use the fragment in a query

```
query {
  user(id: "1") {
    ...UserDetails
  }
}
```

The `...UserDetails` syntax spreads the fragment's fields into the query.

### 2. Reusing a Fragment

The same fragment can be reused in multiple fields or operations.

```
fragment UserDetails on User {
  id
  name
  email
}

query {
  firstUser: user(id: "1") {
    ...UserDetails
  }
  secondUser: user(id: "2") {
    ...UserDetails
  }
}
```

Both users return the same set of fields without repeating the field definitions.

### 3. Types of Fragments

- Named fragments: Reusable fragments defined with the `fragment` keyword.
- Inline fragments: Used to select fields conditionally based on a type, commonly with interfaces and unions.

Example of an inline fragment:

```
query {
  search {
    ... on User {
      name
      email
    }
    ... on Product {
      name
      price
    }
  }
}
```

Here, the fields selected depend on whether the returned object is a `User` or a `Product`.

### 4. Advantages of Fragments

1. Reduce duplicate field definitions.
2. Improve query readability.
3. Make queries easier to maintain.
4. Promote reuse of common field selections.
5. Support type-specific field selection when working with interfaces and unions.

Interview conclusion: Fragments in GraphQL are reusable sets of fields that help reduce duplication and improve query maintainability. Named fragments can be reused across operations, while inline fragments allow clients to select fields based on an object's specific type.

---

## 20. What are Named and Anonymous Operations in GraphQL?

In GraphQL, operations are requests used to fetch or modify data. An operation can be named or anonymous, depending on whether we provide an operation name in the query.

### 1. Named Operations

A named operation has an explicit name defined after the operation type, such as `query`, `mutation`, or `subscription`.

Example:

```
query GetUser {
  user(id: "1") {
    id
    name
    email
  }
}
```

Explanation:

- `query` specifies the operation type.
- `GetUser` is the operation name.
- `user` is the field being requested.

Advantages:

- Makes queries easier to identify and debug.
- Helps with logging, monitoring, and error tracking.
- Supports persisted-query workflows and operation-based analytics.

### 2. Anonymous Operations

An anonymous operation does not have an explicit operation name.

Example:

```
query {
  user(id: "1") {
    id
    name
    email
  }
}
```

Here, the operation has no name, but it is still a valid GraphQL query.

An operation can also be written without the `query` keyword when using shorthand syntax:

```
{
  user(id: "1") {
    name
  }
}
```

This is an anonymous query.

Important rule: An anonymous operation is allowed only when the GraphQL document contains a single operation. If a document contains multiple operations, each operation must have a name.

### 3. Key Differences

| Feature                             | Named Operation           | Anonymous Operation                    |
| ----------------------------------- | ------------------------- | -------------------------------------- |
| Operation name                      | Required                  | Not provided                           |
| Syntax                              | `query GetUser { ... }`   | `query { ... }`                        |
| Debugging                           | Easier to identify        | Less descriptive                       |
| Multiple operations in one document | Allowed, if all are named | Not allowed alongside other operations |
| Best use                            | Production applications   | Simple queries and examples            |

### Interview conclusion

Named operations have an explicit name, which makes them easier to debug, monitor, and maintain. Anonymous operations do not have a name and are useful for simple queries. GraphQL allows an anonymous operation only when it is the sole operation in the document.

<details>
<summary>Show Answer</summary>

A GraphQL schema defines the data types, fields, and operations available through an API. It acts as a contract between the client and server.

```graphql
type User {
  id: ID!
  name: String!
}

type Query {
  user(id: ID!): User
}
```

</details>
