import { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        placeholder="What do you want to do?!"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button
        onClick={() => {
          addTodo({
            title: text,
            status: false,
          });
        }}
      >
        Add
      </button>
    </div>
  );
}
