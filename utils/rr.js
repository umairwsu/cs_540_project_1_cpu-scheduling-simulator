export const rr = async (processes, timeQuantum, setResults) => {
    let time = 0;
    const queue = processes.map(process => ({
      ...process,
      remainingTime: process.burstTime,
    }));
    const results = [];
    
    while (queue.length > 0) {
      const process = queue.shift();
  
      if (process.remainingTime > timeQuantum) {
        time += timeQuantum;
        process.remainingTime -= timeQuantum;
        queue.push(process); // Push back into the queue for the next cycle
      } else {
        time += process.remainingTime;
        process.remainingTime = 0;
        results.push({ ...process, completionTime: time });
      }
  
      // Update the results, showing intermediate progress
      setResults([...results, ...queue.map(p => ({
        ...p,
        completionTime: p.remainingTime === 0 ? time : undefined
      }))]);
  
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };
  