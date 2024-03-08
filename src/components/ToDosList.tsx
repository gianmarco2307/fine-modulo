import { AppContext } from "@/ContextProvider";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ToDosList() {
  const { toDoList, doItem, undoItem, removeItem, loading, error } = useContext(AppContext);

  function onClickItem(id: number) {
    const item = toDoList.find((item) => item.id === id);
    if (!item) return;
    if (item.done) {
      undoItem(id);
    } else {
      doItem(id);
    }
  }

  function onClickDelete(id: number) {
    const item = toDoList.find((item) => item.id === id);
    if (!item) return;
    removeItem(id);
  }

  if (loading) return <p>Attendi...</p>;

  if (error) return <p>Ops, qualcosa è andato storto!</p>;

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 550,
        bgcolor: "antiquewhite",
        margin: "auto",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      {toDoList.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onClickDelete(value.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={() => onClickItem(value.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <List>
                <ListItemText
                  id={labelId}
                  primary={`Line item ${value.title}`}
                />
                <ListItemText
                  sx={{ fontStyle: "italic" }}
                  id={labelId}
                  primary={value.body}
                />
              </List>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
