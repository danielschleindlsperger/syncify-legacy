import styled from 'styled-components'
import { COLORS } from '../style-constants'

export const Button = styled.button`
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 0.15s ease;
  background-color: ${COLORS.PRIMARY};
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: ${COLORS.PRIMARY};
    background-color: white;
  }
`
export const ButtonLight = styled(Button)`
  background-color: white;
  color: ${COLORS.PRIMARY};
  border: 1px solid ${COLORS.PRIMARY};
  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
`
