import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../../../components/Header'
import Bg from '../../../assets/bg-v1.png'

import MainChat from './MainChat'

function ChatAI() {
  return (
    <>
      <Helmet>
        <title>Chat AI</title>
      </Helmet>
      <Header />
      <ChatAIWrapper>
        <MainChat />
      </ChatAIWrapper>
    </>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ChatAIWrapper = styled.main`
  height: 90vh;
  background-image: url(${Bg});
  background-size: cover;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 768px) {
    height: 100vh;
  }

  @media (max-width: 425px) {
    height: 100%;
  }
`
export default ChatAI
