import styled from "styled-components";
import { ThemeType } from "../features/ThemeContext";

export const Tag = styled.span<{ theme: ThemeType }>`
  background: ${({ theme }): string => theme?.colors?.secondary || "#A78BFA"};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;
