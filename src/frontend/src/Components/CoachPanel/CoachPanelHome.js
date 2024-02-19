import React from "react";
import CoachPanel from "../CoachPanel/CoachPanel";
import LogOutHeader from "../Reusables/LogOutHeader";
import Footer from "../MainPage/Footer";

function CoachPanelHome() {
  return (
    <>
      <LogOutHeader />
      <CoachPanel />
      <Footer />
    </>
  );
}

export default CoachPanelHome;
