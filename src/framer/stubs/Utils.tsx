import type { ReactNode } from 'react';

export function ComponentMessage({ children }: { children?: ReactNode }) {
  return <div>{children}</div>;
}
