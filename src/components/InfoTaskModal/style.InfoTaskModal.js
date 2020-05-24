import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
  },
  textarea: {
    ...theme.typography.body1,
    width: "calc(100% - 22px)",
    padding: 10,
    border: "1px solid #ccc",
    resize: "none",
    borderRadius: 5,
    "&:focus": {
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: "transparent",
      borderColor: "transparent",
      opacity: 1,
    },
  },
}));
