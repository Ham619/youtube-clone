// App.js
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Demo from "./components/Demo";
import Demo2 from "./components/Demo2";
import Head from "./components/Head";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import store from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      {/* Wrap the entire application with BrowserRouter */}
      <Router>
        <div>
          <Head />
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<MainContainer />} />
              <Route path="watch" element={<WatchPage />} />
              <Route path="demo" element={<><Demo /><Demo2 /></>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
