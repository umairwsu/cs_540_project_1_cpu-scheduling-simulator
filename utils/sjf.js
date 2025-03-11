export const sjf = async (processes, setResults) => {
    const sortedProcesses = [...processes].sort((a, b) => a.burstTime - b.burstTime);
    let completionTime = 0;
    const results = [];
    for (const process of sortedProcesses) {
      completionTime += process.burstTime;
      results.push({ ...process, completionTime });
      setResults([...results]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };