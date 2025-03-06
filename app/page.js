'use client';
import { useState } from 'react';
import ProcessInput from '../components/ProcessInput';
import BarChart from '../components/BarChart';
import jsPDF from 'jspdf';
import { fifo } from '../utils/fifo';
import { rr } from '../utils/rr';
import { generateProcesses } from '../utils/processQueue';

export default function Home() {
  const [processes, setProcesses] = useState([]);
  const [fifoResults, setFifoResults] = useState([]);
  const [rrResults, setRrResults] = useState([]);


  const handleRun = async (numProcesses, timeQuantum) => {
    const generatedProcesses = generateProcesses(numProcesses);
    setProcesses(generatedProcesses);
    const queues = [
      [...generatedProcesses],
      [],
      []
    ];
    await fifo(generatedProcesses, setFifoResults);
    await rr(generatedProcesses, timeQuantum, setRrResults);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;
  
    // Set smaller font sizes
    const titleFontSize = 10;
    const textFontSize = 8;
  
    doc.setFontSize(titleFontSize);
    doc.text('CPU Scheduling Results', 10, y);
    y += 10;
  
    // FIFO Results
    doc.text('FIFO Results:', 10, y);
    y += 10;
    doc.setFontSize(textFontSize);
    fifoResults.forEach((res) => {
      doc.text(`Process ${res.id}: Completion Time - ${res.completionTime}`, 10, y);
      y += 8;
    });
    // Add spacing between sections
    y += 10;
  
    // RR Results
    doc.setFontSize(titleFontSize);
    doc.text('RR Results:', 10, y);
    y += 10;
    doc.setFontSize(textFontSize);
    rrResults.forEach((res) => {
      doc.text(`Process ${res.id}: Completion Time - ${res.completionTime}`, 10, y);
      y += 8;
    });

    doc.save('cpu-scheduling-results.pdf');
  };

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">CPU Scheduling Simulator</h1>
      <ProcessInput onSubmit={handleRun} />
      <button onClick={downloadPDF} className="bg-green-500 text-white p-2 mt-4">
        Download PDF
      </button>
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-full md:w-1/2 h-64">
        <BarChart data={fifoResults} title="FIFO Results" />
        </div>
        <div className="w-full md:w-1/2 h-64">
        <BarChart data={rrResults} title="RR Results" />
        </div>
      </div>
    </main>
  );
}
