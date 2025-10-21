import React, { useState } from 'react';

const TestPage: React.FC = () => {
  const [count, setCount] = useState(0);

  console.log('TestPage rendered, count:', count);

  const handleClick = () => {
    console.log('Button clicked!');
    setCount(count + 1);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>TEST PAGE</h1>
      <p>Count: {count}</p>
      <button 
        onClick={handleClick}
        style={{ 
          background: 'blue', 
          color: 'white', 
          padding: '20px 40px', 
          fontSize: '20px',
          cursor: 'pointer'
        }}
      >
        Click Me - Count: {count}
      </button>
      <p>Check browser console for logs!</p>
    </div>
  );
};

export default TestPage;