import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/home";
import Register from "./components/register/register";
import Login from "./components/login/login";
import NotFound from "./components/Not_found/notFound";
import AddBook from "./components/Add_book/Add_book";
import InfoBook from "./components/Info_Book/InfoBook";
import EditBook from "./components/Edit_book/Edit_book";

import React, { useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5001"); 
function App() {
  // socket :
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("customEvent", (data) => {
      console.log("Received data from server:", data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("customEvent");
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/get/books" element={<Home />} />
        <Route path="/add/book" element={<AddBook />} />
        <Route path="/info/book/:bookId" element={<InfoBook />} />
        <Route path="/edit/book/:bookId" element={<EditBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
