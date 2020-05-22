import React, { useEffect, Fragment } from "react";
import { makeStyles, AppBar, Button, TextField } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { initiateData, addNewColumn as AddColumn } from "./actions/app";
import Content from "./components/Content";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

const Styels = makeStyles((theme) => ({
  AppWrapper: {
    ...theme.typography.body1,
    width: "100vw",
    height: "100vh",
  },
  header: {
    height: "auto",
    position: "static",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 15px",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  },
}));

const App = () => {
  const classes = Styels();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const isInitial = useSelector((state) => state.app.isInitial);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      fetchData();
      return;
    }
  }, []);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((res) => res.json())
      .then((response) => {
        return response.splice(0, 10).reduce((prev, current) => {
          return {
            ...prev,
            [`task-${current.id}`]: {
              id: `task-${current.id}`,
              content: current.title,
            },
          };
        }, {});
      })
      .then((data) => dispatch(initiateData(data)));
  };

  const addNewColumn = () => {
    dispatch(AddColumn(title, description, dispatch));
  };

  const toggleModal = () => {
    if (open) {
      setTitle("");
    }
    setOpen((open) => !open);
  };

  return (
    <Toast>
      <Modal
        open={open}
        handleSubmit={addNewColumn}
        toggleModal={toggleModal}
        title="Add list"
        disabled={title.length === 0}
      >
        <TextField
          autoFocus
          label="List Title"
          variant="outlined"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
      <div className={classes.AppWrapper}>
        <AppBar color="inherit" className={classes.header}>
          <div>
            <h2>Trello</h2>
            <Button onClick={toggleModal} color="primary">
              <AddIcon /> ADD NEW LIST
            </Button>
          </div>
        </AppBar>
        <Content />
      </div>
    </Toast>
  );
};

export default App;
