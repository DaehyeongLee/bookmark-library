import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import ChatbotBtn from "./views/Chatbot/ChatbotBtn";
import UploadBookmark from "./views/UploadBookmark/UploadBookmark";
import SearchedBookmark from "./views/SearchedBookmark/SearchedBookmark";
import DetailedBookmark from "./views/DetailedBookmark/DetailedBookmark";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div className = "app" style={{minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/bookmark/upload" component={Auth(UploadBookmark, true)} />
          <Route exact path="/bookmark/search-result/:input" component={Auth(SearchedBookmark, null)} />
          <Route exact path="/bookmark/detail/:item" component={Auth(DetailedBookmark, null)} />
        </Switch>
      </div>
      <Footer />
      <ChatbotBtn/>
    </Suspense>
  );
}

export default App;
