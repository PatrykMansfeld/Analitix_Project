import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./Components/MainPage";
import RegisterHome from "./Components/LoginForm/RegisterHome";
import LoginHome from "./Components/LoginForm/LoginHome";
import UserPanelHome from "./Components/UserPanel/UserPanelHome";
import PrivateRoute from './PrivateRoute';
import "./Scss/Main.scss";
import CoachPanelHome from './Components/CoachPanel/CoachPanelHome';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginHome />} />
            <Route path="/register" element={<RegisterHome />} />
            {/* <Route path="/UserPanel" element={<UserPanelHome />} /> */}
            <Route exact path='/UserPanel' element={<UserPanelHome />} />
            <Route path='/CoachPanel' element={<CoachPanelHome />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;