export type toDoItem = {
    userId: number;
    id: number;
    title: string;
    body: string;
    done: boolean;
};

export interface toDoList {
    toDoList: toDoItem[];
    doItem: (id: toDoItem["id"]) => void;
    undoItem: (id: toDoItem["id"]) => void;
    removeItem: (id: toDoItem["id"]) => void;
}