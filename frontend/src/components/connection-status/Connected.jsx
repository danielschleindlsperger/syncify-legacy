import React from 'react'
import styled from 'styled-components'
// import { Activity, AlertTriangle } from 'styled-icons/feather'
import { Zap, ZapOff } from 'styled-icons/feather'

const SIZE = 50

const FlexCenter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`

const SuccessWrapper = styled(FlexCenter)`
  color: lightseagreen;
`
const Success = () => (
  <SuccessWrapper>
    <Zap size={SIZE}/>
    <div>Connected</div>
  </SuccessWrapper>
)

const ErrorWrapper = styled(FlexCenter)`
  color: tomato;
`
const Error = () => (
  <ErrorWrapper>
    <ZapOff size={SIZE} />
    <div>Offline</div>
  </ErrorWrapper>
)

const TopRight = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding-top: 5px;
  padding-right: 5px;
`

export const Connected = ({ connected }) => (
  <TopRight>
    { connected ? <Success />: <Error />}
  </TopRight>
)