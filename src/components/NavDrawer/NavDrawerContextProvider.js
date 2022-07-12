import { useState } from "react";
import { NavDrawerContext } from ".";

function NavDrawerContextProvider({ children }) {
  const [open, setOpen] = useState(false);

  function openDrawer() {
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <NavDrawerContext.Provider
      value={{
        isOpen: open,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </NavDrawerContext.Provider>
  );
}

export { NavDrawerContextProvider };
