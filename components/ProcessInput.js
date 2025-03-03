'use client';
import { useState } from 'react';

export default function ProcessInput({ onSubmit }) {
  const [numProcesses, setNumProcesses] = useState(3);
  const [timeQuantum, setTimeQuantum] = useState(1);

  const handleSubmit = () => {
    onSubmit(Number(numProcesses), Number(timeQuantum));
  };

  return (
    <div className="p-4">
      <label>Number of Processes:</label>
      <input
        type="number"
        value={numProcesses}
        onChange={(e) => setNumProcesses(e.target.value)}
        className="border p-2 ml-2"
      />
      <label>Time Quantum (for RR):</label>
      <input
        type="number"
        value={timeQuantum}
        onChange={(e) => setTimeQuantum(e.target.value)}
        className="border p-2 ml-2"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 ml-2">
        Run
      </button>
    </div>
  );
}
