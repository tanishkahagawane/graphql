import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(query);

  if (loading) return <h1>Loading ...</h1>;
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <div className="container">
        <h1>Todos List</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>User ID</th>
              <th>User Name</th>
            </tr>
          </thead>

          <tbody>
            {data?.getTodos?.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>{todo.user?.id ?? "N/A"}</td>
                <td>{todo.user?.name ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
