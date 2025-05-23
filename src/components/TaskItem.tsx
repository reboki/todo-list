import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import styled from 'styled-components';
import ActionButton from './ActionButton';
import type { Task, Status } from './InputBar';

type Props = {
  task: Task;
  index: number;
  moveTo: (status: Status, id: string) => void;
  deleteTask: (id: string) => void;
};

export default function TaskItem({ task, index, moveTo, deleteTask }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {prov => (
        <Card
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
        >
          <Content>{task.content}</Content>
          <Buttons>
            {task.status === 'planned' && (
              <ActionButton onClick={() => moveTo('inProgress', task.id)}>作業中</ActionButton>
            )}
            {task.status === 'inProgress' && (
              <ActionButton onClick={() => moveTo('done', task.id)}>完了</ActionButton>
            )}
            <ActionButton onClick={() => deleteTask(task.id)}>削除</ActionButton>
          </Buttons>
        </Card>
      )}
    </Draggable>
  );
}

const Card = styled.div`
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Content = styled.span`
  flex: 1;
  margin-right: 1rem;
`;
const Buttons = styled.div`
  display: flex;
  gap: 0.5rem;
`;