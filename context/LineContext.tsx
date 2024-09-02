import { Line } from '@/types/line';
import { createContext, ReactNode, useContext, useState } from 'react';

type LineContextType = {
  lineInfo: Line[];
  setLineInfo: (lineList: Line[]) => void;
};

const LineContext = createContext<LineContextType | undefined>(undefined);

export const LineProvider = ({ children }: { children: ReactNode }) => {
  const [lineInfo, setLineInfo] = useState<Line[]>([]);
  return <LineContext.Provider value={{ lineInfo, setLineInfo }}>{children}</LineContext.Provider>;
};

export const useLineContext = () => {
  const context = useContext(LineContext);
  if (!context) {
    throw new Error('useLineContext must be used within a LineProvider');
  }
  return context;
};
