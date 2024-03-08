export type toDoItem = {
    userId: number;
    id: number;
    title: string;
    body: string;
    done: boolean;
};

export interface toDoList {
    toDoList: toDoItem[];
    do: (id: toDoItem["id"]) => void;
    undo: (id: toDoItem["id"]) => void;
    remove: (id: toDoItem["id"]) => void;
}