import styled from 'styled-components'
import BoxChat from './BoxChat'

function MainChat() {
  return (
    <MainChatWrapper className="container">
      <div className="chat-heading">
        <h2>Chat AI</h2>
      </div>
      <hr />
      <BoxChat />
      <hr />
      <div className="chat-footer">
        <p>Lưu ý: Tất cả các câu trả lời đều được tạo từ AI.</p>
      </div>
    </MainChatWrapper>
  )
}

const MainChatWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  hr {
    border: 0;
    border-top: 2px solid var(--primary-color);
    width: 100%;
  }

  .chat-heading {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align all items to center vertically */
    padding: 1rem;
    width: 100%;
    height: auto;

    h2 {
      margin: 0;
      color: var(--primary-color);
      font-size: 2.4rem;
      margin-bottom: 0;
      align-self: center;
    }
  }

  .chat-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
    width: 100%;
    height: auto;

    p {
      margin: 0;
      color: var(--primary-color);
      font-size: 1.6rem;
      margin-bottom: 0;
      align-self: center;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 425px) {
    height: 100%;
  }
`

export default MainChat
