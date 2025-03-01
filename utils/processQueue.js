export const generateProcesses = (numProcesses) => {
    return Array.from({ length: numProcesses }, (_, i) => ({
      id: `P${i + 1}`,
      burstTime: Math.floor(Math.random() * 10) + 1,
    }));
  };
  