import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    margin: 10,
  },
  header: {
    borderBottom: "1px solid #eee",
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > div": {
      "& h2": {
        margin: 0,
      },
      "& span": {
        color: "#aaa",
      },
    },
  },
  taskContainer: {
    padding: 10,
    minHeight: 100,
    width: "500px !important",
    position: "relative",
    paddingBottom: 50,
    maxHeight: "50vh",
    overflowY: "auto",
    overflowX: "hidden",
    "& button": {
      position: "absolute",
      bottom: 10,
      left: 10,
    },
  },
});
