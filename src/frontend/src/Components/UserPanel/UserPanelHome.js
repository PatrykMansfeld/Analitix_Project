import React from "react";
import LogOutHeader from "../Reusables/LogOutHeader";
import Footer from "../MainPage/Footer";

import UserPanel from "./UserPanel";

function UserPanelHome() {
  return (
    <>
      <LogOutHeader />
      <UserPanel />
      <Footer />
    </>
  );
}

export default UserPanelHome;
