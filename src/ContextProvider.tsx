import { createContext, useEffect, useState } from "react";
import { toDoItem, toDoList } from "./declarations";

export const AppContext = createContext<toDoList>({
  toDoList: [],
  doItem: () => {},
  undoItem: () => {},
  removeItem: () => {},
});

interface Props {
  children: React.ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [toDoList, setToDoList] = useState<Array<toDoItem>>([]);

  async function getPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const newData = data.map((item: any) => {
      return {
        userId: item.userId,
        id: item.id,
        title: item.title,
        body: item.body,
        done: false,
      };
    });
    setToDoList(newData);
  }

  function doItem(id: toDoItem["id"]) {
    const newToDoList = toDoList.map((item) => {
      if (item.id === id) {
        console.log("done: " + item.id);
        return {
          ...item,
          done: true,
        };
      }
      return item;
    });
    setToDoList(newToDoList);
  }

  function undoItem(id: toDoItem["id"]) {
    const newToDoList = toDoList.map((item) => {
      if (item.id === id) {
        console.log("undone: " + item.id);
        return {
          ...item,
          done: false,
        };
      }
      return item;
    });
    setToDoList(newToDoList);
  }

  function removeItem(id: toDoItem["id"]) {
    const newToDoList = toDoList.filter((item) => item.id !== id);
    setToDoList(newToDoList);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        toDoList,
        doItem,
        undoItem,
        removeItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
