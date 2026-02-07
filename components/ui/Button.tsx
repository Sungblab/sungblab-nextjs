import styled from "styled-components";
import { ThemeType } from "../features/ThemeContext";

export const Button = styled.button<{ theme: ThemeType }>`
  background: ${({ theme }): string => theme?.colors?.primary || "#7C3AED"};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;
