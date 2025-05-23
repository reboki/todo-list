import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import TaskItem from './TaskItem';
import type { Task, Status } from './InputBar';

type Props = {
  title: string;
  tasks: Task[];
  status: Status;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function TaskColumn({ title, tasks, status, setTasks }: Props) {
  const moveTo = (newStatus: Status, id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  return (
    <Column>
      <Header>{title}</Header>
      <Droppable droppableId={status}>
        {prov => (
          <List ref={prov.innerRef} {...prov.droppableProps}>
            {tasks.map((t, i) => (
              <TaskItem key={t.id} task={t} index={i} moveTo={moveTo} deleteTask={deleteTask} />
            ))}
            {prov.placeholder}
          </List>
        )}
      </Droppable>
    </Column>
  );
}

const Column = styled.div`
  width: 100%;
  background: #f0f0f0;
  border-radius: 4px;
  padding: 1rem;
  height: 100%;
`;
const Header = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
`;
const List = styled.div`
  min-height: 200px;
`;