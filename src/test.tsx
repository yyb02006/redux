import React from 'react';

export default function Home() {
  const arr = ['hi', 'hello', 'bye'];
  return (
    <div>
      {arr.map((arr, id) => (
        <div key={id}>{arr + 'hi'}</div>
      ))}
    </div>
  );
}
