import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

const TODOS: Todo[] = [
  { id: 1, text: "foo", isDone: false },
  { id: 2, text: "bar", isDone: true },
];

function MyApp({ Component, pageProps }: AppProps) {
  const [todos, setTodos] = useState<Todo[]>(TODOS);

  return <Component {...pageProps} todos={todos} setTodos={setTodos} />;
}

export default MyApp;
