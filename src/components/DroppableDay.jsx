// components/DroppableDay.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableDay({ id, children, className }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}

export default DroppableDay;
