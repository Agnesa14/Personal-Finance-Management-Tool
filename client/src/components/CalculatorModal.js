// components/CalculatorModal.js
import React, { useState } from 'react';
import './CalculatorModal.css';

const CalculatorModal = ({ onClose }) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') return clear();
    if (value === '+/-') return toggleSign();
    if (value === '%') return percent();
    if (value === '=') return calculate();
    setExpression(prev => prev + value);
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const toggleSign = () => {
    if (!expression) return;
    try {
      const num = eval(expression);
      setExpression((-num).toString());
    } catch {
      setResult('Gabim');
    }
  };

  const percent = () => {
    if (!expression) return;
    try {
      const num = eval(expression);
      setExpression((num / 100).toString());
    } catch {
      setResult('Gabim');
    }
  };

  const calculate = () => {
    try {
      const res = eval(expression);
      setResult(res);
    } catch {
      setResult('Gabim');
    }
  };

  const buttons = [
    'C', '+/-', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  return (
    <div className="calculator-overlay">
      <div className="calculator-modal">
        <input type="text" value={result || expression || '0'} readOnly />
        <div className="calculator-buttons">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              className={btn === '0' ? 'zero-btn' : ''}
            >
              {btn}
            </button>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Mbyll</button>
      </div>
    </div>
  );
};

export default CalculatorModal;
