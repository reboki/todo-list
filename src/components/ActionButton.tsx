import React from 'react';
import styled from 'styled-components';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode };

const Btn = styled.button`
  border: none;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 4px;
  &:hover { background: #0056b3; }
`;

export default function ActionButton({ children, ...props }: Props) {
  return <Btn {...props}>{children}</Btn>;
}