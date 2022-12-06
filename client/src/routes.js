import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import User from "./pages/User";
import QuestionPage from "./pages/QuestionPage";
import ForgetPassword from "./pages/ForgetPassword"
import ResestPassword from "./pages/ResetPassword"
import AskQuestion from "./pages/AskQuestion";
import EditQuestion from "./pages/EditQuestion";
import {Context} from "./index";

export const useRoutes = () => {
  const {authStore} = useContext(Context);

    return (
      
      <Routes path>
        <Route path="/questions" element={<Home />} exact />
        <Route path="/login" element={authStore.isAuth ? <Navigate to="/questions" replace />  : <Login />} exact />
        <Route path="/reg" element={authStore.isAuth ? <Navigate to="/questions" replace />  : <Reg />} exact />
        <Route path="/forgetPassword" element={authStore.isAuth ? <Navigate to="/questions" replace />  : <ForgetPassword />} exact />
        <Route path="/forgetPassword/:token" element={authStore.isAuth ? <Navigate to="/questions" replace />  : <ResestPassword />} exact />
        <Route path="/askQuestion" element={<AskQuestion />} exact />
        <Route path="/editQuestion/:id" element={<EditQuestion />} exact />
        <Route path="/tags" element={<Tags />} exact />
        <Route path="/users" element={<Users />} exact />
        {/* <Route path="/users/:id" element={authStore.isAuth ? <User /> : <Navigate to="/questions" replace/>} exact /> */}
        <Route path="/users/:id" element={<User />} exact />
        <Route path="/questions/:id" element={<QuestionPage />} exact />
        <Route path="*" element={<Navigate to="/questions" replace />} />
      </Routes>
    );
};
