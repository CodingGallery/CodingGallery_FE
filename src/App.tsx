import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./reducer/store";

// Import Routes
import Home from "./routes/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./routes/Login";
import Account from "./routes/Account";
import Profile from "./routes/Profile";
import Error404 from "./routes/Error404";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

export function App() {
  return (
    <BrowserRouter>
      <Provider
        store={createStoreWithMiddleware(
          Reducer,
          (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION__()
        )}
      >
        <Header />
        <Footer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error-page" element={<Error404 />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}
export default App;
