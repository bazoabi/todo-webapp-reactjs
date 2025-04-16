import { createContext, useState } from "react";
import MySnackbar from "../components/MySnackbar";

export const ToastContext = createContext({
  showHideSnackbar: () => {},
});

export const ToastProvider = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function showHideSnackbar(message) {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
    setTimeout(() => {
      setOpenSnackbar(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ showHideSnackbar }}>
      {children}
      {/* Snackbar */}
      <MySnackbar open={openSnackbar} message={snackbarMessage} />
      {/* <MySnackbar /> */}
    </ToastContext.Provider>
  );
};
