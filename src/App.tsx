import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import InputBar from './components/InputBar';
import type { Task, Status } from './components/InputBar';
import TaskColumn from './components/TaskColumn';
import { GlobalStyle, Title, Container } from './GlobalStyle';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      setTasks(prev => {
        const same = prev.filter(t => t.status === source.droppableId);
        const other = prev.filter(t => t.status !== source.droppableId);
        const items = [...same];
        const [m] = items.splice(source.index, 1);
        items.splice(destination.index, 0, m);
        return [...other, ...items];
      });
    } else {
      setTasks(prev => prev.map(t =>
        t.id === draggableId ? { ...t, status: destination.droppableId as Status } : t
      ));
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Todo-List</Title>
        <DragDropContext onDragEnd={onDragEnd}>
          <InputBar onAdd={task => setTasks(prev => [...prev, task])} />
          <TaskColumn title="作業予定" status="planned"
            tasks={tasks.filter(t => t.status === 'planned')} setTasks={setTasks} />
          <TaskColumn title="作業中" status="inProgress"
            tasks={tasks.filter(t => t.status === 'inProgress')} setTasks={setTasks} />
          <TaskColumn title="作業完了" status="done"
            tasks={tasks.filter(t => t.status === 'done')} setTasks={setTasks} />
        </DragDropContext>
      </Container>
    </>
  );
}