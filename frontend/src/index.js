import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import Register from "./components/register";
import ForgotPassword from "./components/forgotpass";
import Axios from "axios";
import Home from "./components/home";

Axios.defaults.baseURL = "http://localhost:4000";
Axios.defaults.headers.common["auth"] = localStorage.getItem("auth");
Axios.defaults.headers.common["username"] = localStorage.getItem("username");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
