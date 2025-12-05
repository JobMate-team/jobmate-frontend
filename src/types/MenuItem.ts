import type React from 'react';

export type MenuItem = {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
};
