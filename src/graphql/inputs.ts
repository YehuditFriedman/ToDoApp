export const createTodoInput = `input CreateTodoInput {
    id: ID
    name: String!
    body: String
    city: String
    completed: Boolean
  }`

  export const updateTodoInput = `input UpdateTodoInput {
    id: ID!
    name: String
    body: String
    city: String
    completed: Boolean
  }`

  export const deleteTodoInput = `input DeleteTodoInput {
    id: ID!
  }`