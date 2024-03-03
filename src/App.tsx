import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<Detail />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
