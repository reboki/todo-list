import React, { useState } from 'react';
import styled from 'styled-components';
import ActionButton from './ActionButton';

export type Status = 'planned' | 'inProgress' | 'done';
export type Task   = { id: string; content: string; status: Status };

type InputBarProps = { onAdd: (task: Task) => void };

export default function InputBar({ onAdd }: InputBarProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onAdd({ id: Date.now().toString(), content: text, status: 'planned' });
    setValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="タスクを追加..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <ActionButton type="submit">追加</ActionButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  grid-area: input;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
`;