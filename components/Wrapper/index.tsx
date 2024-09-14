import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return <main>{children}</main>;
};

export default Wrapper;
