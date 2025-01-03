import React, { useState } from 'react';

export default function Button() {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        border: '1px solid black',
        marginTop: '20px',
      }}
    >
      <p>宿主应用</p>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}
