import React, { useState, useEffect } from 'react';
import Button from './Button';
export default function MyComponent() {
  useEffect(() => {
    console.log('useEffect');

    return () => {};
  }, []);
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        backgroundColor: 'pink',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        width: '400px',
        height: '400px',
        border: '1px solid red',
      }}
      className="my-class"
    >
      <p>远程应用</p>
      <Button />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}
