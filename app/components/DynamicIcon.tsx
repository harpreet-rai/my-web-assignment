'use client';

import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const IconComponent = (Icons as any)[name];

  if (!IconComponent) {
    return <Icons.BookOpen className={className} />;
  }

  return <IconComponent className={className} />;
}