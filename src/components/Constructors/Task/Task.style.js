import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    padding: 15,
    border: "1px solid #eee",
    borderRadius: 5,
    backgroundColor: "#fff",
    transition: "background-color 0.3s",
    width: "100% - 20px",
    margin: "10px auto",
    cursor: "move",
    "&:hover": {
      backgroundColor: "#eee",
    },
  },
});
