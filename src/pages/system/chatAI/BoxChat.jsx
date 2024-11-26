import APIClient from '../../../api/client'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ErrorPopup from './ErrorPopup'

function BoxChat() {
  const navigate = useNavigate()
  const [numberConver, setNumber] = useState(0)
  const listRef = useRef(null) // Reference to the message list
  const [text, setText] = useState('')
  const [reload, setReload] = useState(true)
  const [errorOpen, setErrorOpen] = useState(false)

  const [input, setInput] = useState([
    {
      role: 'user',
      content: 'Chào Chat Assistant'
    }
  ])

  const listenKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  const handleClick = () => {
    setInput([...input, { role: 'user', content: text }])
    setNumber((prevNum) => prevNum + 1)
    setText('')
  }

  const handleReloadChat = () => {
    setReload((prevData) => !prevData)
    setNumber(0)
    setInput([
      {
        role: 'user',
        content: 'Chào Chat Assistant'
      }
    ])
  }

  const handleCloseError = () => {
    setErrorOpen(false)
  }

  useEffect(() => {
    const apiClient = new APIClient('openai/generate-text')
    apiClient
      .findParams({ input })
      .then((response) => {
        if (response.data) {
          setInput([...input, { role: 'assistant', content: response.data }])
        } else {
          setErrorOpen(true)
        }
      })
      .catch((error) => {
        console.error(error)
        setErrorOpen(true)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberConver])

  useEffect(() => {
    // Scroll to the bottom of the list whenever messages change
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [input])

  return (
    <BoxChatWrapper>
      {errorOpen ? (
        <ErrorPopup
          open={errorOpen}
          onClose={handleCloseError}
          onReload={handleReloadChat}
        />
      ) : (
        <div className="box-chat">
          <div className="message-list" ref={listRef}>
            {input.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                {message.content?.split('\n').map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="input-area">
            <button
              id="btn-cancel"
              onClick={handleReloadChat}
              className="reload-button"
            >
              ↻
            </button>
            <input
              type="text"
              placeholder="Bạn hãy hỏi gì đó..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={listenKeyDown}
            />
            <button
              id="btn-primary"
              onClick={handleClick}
              className="send-button"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </BoxChatWrapper>
  )
}

const BoxChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .box-chat {
    width: 100%;
    margin: 40px 0px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .message-list {
    height: 300px;
    overflow-y: auto;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column; /* Sắp xếp các tin nhắn theo chiều dọc */
    gap: 10px; /* Khoảng cách giữa các tin nhắn */
    padding: 0 8px;
  }

  .message {
    display: flex;
    flex-direction: column; /* Đảm bảo nội dung dài không bị chia ngang */
    justify-content: flex-start;
  }

  .message.user {
    align-items: flex-end;
  }

  .message p {
    padding: 8px;
    background-color: #e0f7fa;
    border-radius: 10px;
    max-width: 70%;
    font-size: 1.6rem;
    line-height: 1.5;
    word-wrap: break-word; /* Đảm bảo ngắt dòng cho nội dung dài */
    white-space: pre-wrap; /* Duy trì định dạng dòng mới */
  }

  .message.assistant p {
    background-color: #fce4ec;
  }

  .input-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .input-area input {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
`

export default BoxChat
