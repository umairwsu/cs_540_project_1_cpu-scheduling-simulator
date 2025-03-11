export const stcf = async (processes, setResults) => {
    const remainingTimes = processes.map((p) => ({
      ...p,
      remainingTime: p.burstTime,
      completionTime: undefined,
    }));
  
    const results = [];
    let time = 0;
    
    while (remainingTimes.some(p => p.remainingTime > 0)) {
      // Select the process with the shortest remaining time that still needs to be executed
      const current = remainingTimes
        .filter(p => p.remainingTime > 0)
        .sort((a, b) => a.remainingTime - b.remainingTime)[0];
  
      if (!current) break; // No process is ready
  
      // Execute the process for its remaining time directly (without one-by-one increments)
      time += current.remainingTime;
      current.remainingTime = 0;
      current.completionTime = time;
      results.push({ ...current });
  
      // Update results after each process completes
      setResults([...results]);
      
      await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced delay for faster execution
    }
  };
  