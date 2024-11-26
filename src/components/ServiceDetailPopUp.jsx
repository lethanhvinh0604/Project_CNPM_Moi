import styled, { keyframes } from 'styled-components'

function ServiceDetailPopUp({ children }) {
  return (
    <ServiceDetailPopUpWrapper>
      <div className="popup">{children}</div>
    </ServiceDetailPopUpWrapper>
  )
}

// Tạo animation fade-in với keyframes
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8); /* Zoom nhỏ hơn */
  }
  100% {
    opacity: 1;
    transform: scale(1); /* Về kích thước ban đầu */
  }
`

const ServiceDetailPopUpWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  h2 {
    font-size: 2.4rem;
    color: var(--primary-color);
    margin-bottom: 20px !important;
  }

  h3 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;

    li {
      font-size: 1.6rem;
      margin-bottom: 10px;
      line-height: 1.2;
      font-style: italic;
    }
  }

  .popup {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    width: 80%;
    max-width: 700px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    /* Áp dụng animation */
    animation: ${fadeIn} 0.4s ease-in-out;
  }

  .popup-content {
    display: flex;
    gap: 20px;

    .popup-img {
      width: 50%;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .popup-info {
      width: 50%;
      text-align: left;

      .rating-list {
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #ccc;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
      }

      form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        input,
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .form-group {
          display: flex;
          gap: 5px;
        }

        button {
          align-self: flex-end;
        }
      }
    }
  }
`

export default ServiceDetailPopUp
