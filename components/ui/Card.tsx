import styled from "styled-components";
import { ThemeType } from "../features/ThemeContext";

export const Card = styled.div<{ theme: ThemeType }>`
  background: ${({ theme }): string => theme?.colors?.background || "#FFFFFF"};
  border: 1px solid ${({ theme }): string => theme?.colors?.border || "#E2E8F0"};
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-color: ${({ theme }): string =>
      theme?.colors?.primary ? `${theme.colors.primary}30` : "#7C3AED30"};
  }
`;
