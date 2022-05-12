import { NextPage } from "next";
import React, { ComponentProps, Dispatch, SetStateAction } from "react";
import { Header } from "src/component/Layout/Header";
import { Todo } from "src/pages/_app";

type Props = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const Index: NextPage<Props> = ({ todos, setTodos }) => {
  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    const text = event.currentTarget.text.value;
    setTodos((prevTodos) => {
      const newTodo = { id: prevTodos.length + 1, text, isDone: false };
      return [...prevTodos, newTodo];
    });
    event.currentTarget.reset();
  };

  const toggleIsDone = (id: Todo["id"]) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
    });
  };

  return (
    <Header title="Home">
      <div>
        <h3>TODO追加</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" autoComplete="off" required />
          <button>追加</button>
        </form>
      </div>

      <div>
        <h3>TODO一覧</h3>
        {todos.map((todo) => (
          <div key={todo.id}>
            <label style={{ fontSize: "2rem" }}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleIsDone(todo.id)}
                style={{ width: "1.5rem", height: "1.5rem" }}
              />
              {todo.text}
            </label>
          </div>
        ))}
      </div>
    </Header>
  );
};

export default Index;
