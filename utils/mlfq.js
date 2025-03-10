export const mlfq = async (processes, queues, setResults) => {
    const results = [];
    let time = 0;
  
    // Initialize remaining times and queue level
    processes.forEach(process => {
      process.remainingTime = process.burstTime;
      process.queueLevel = 0;
    });
  
    while (queues.some(queue => queue.length > 0)) {
      for (let level = 0; level < queues.length; level++) {
        const queue = queues[level];
  
        if (queue.length > 0) {
          const process = queue.shift();
          const timeSlice = level + 1;
  
          if (process.remainingTime <= timeSlice) {
            time += process.remainingTime;
            process.remainingTime = 0;
            process.completionTime = time;
            results.push({ ...process });
          } else {
            process.remainingTime -= timeSlice;
            time += timeSlice;
            process.queueLevel = Math.min(level + 1, queues.length - 1);
            queues[process.queueLevel].push(process);
          }
  
          // Update results including intermediate states
          setResults([
            ...results,
            ...queues.flat().map(p => ({
              ...p,
              completionTime: undefined,
            })),
          ]);
  
          await new Promise((resolve) => setTimeout(resolve, 500));
          break; // Break after processing one task at this level
        }
      }
    }
  };
  