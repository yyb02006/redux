import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detail from './routes/Detail';
import Home from './routes/Home';
import Friend from './routes/Friend';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/friend" element={<Friend />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
