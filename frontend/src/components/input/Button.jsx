import styled from 'styled-components'

export const Button = styled.button`
  background-color: rebeccapurple;
  padding: 10px 20px;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all .15s;
  &:hover {
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .3);
    transform: translateY(-1px);
  }
`
export const ButtonLight = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid lightgrey;
  &:hover {
    border-color: transparent;
  }
`

export const ButtonRound = styled.button`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .3);
  border: none;
  cursor: pointer;
  transition: all .15s;
  &:active {
    transform: translateY(1px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, .3);
  }
`