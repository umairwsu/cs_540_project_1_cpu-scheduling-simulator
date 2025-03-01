export const fifo = async (processes, setResults) => {
    let completionTime = 0;
    const results = [];
    for (const process of processes) {
      completionTime += process.burstTime;
      results.push({ ...process, completionTime });
      setResults([...results]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };