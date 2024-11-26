import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

function ListService() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  const handleSearch = (e, path) => {
    navigate(`${path}`)
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])
  return (
    <>
      <StyledButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: 'var(--primary-color)', // Màu chữ
          textTransform: 'capitalize'
        }}
      >
        Danh sách
      </StyledButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    sx={{ fontSize: '16px', color: '#333' }}
                    onClick={(e) => handleSearch(e, '/list-hall')}
                  >
                    Danh sách Hội trường
                  </MenuItem>

                  <MenuItem
                    sx={{ fontSize: '16px', color: '#333' }}
                    onClick={(e) => handleSearch(e, '/list-mc')}
                  >
                    Danh sách MC
                  </MenuItem>

                  <MenuItem
                    sx={{ fontSize: '16px', color: '#333' }}
                    onClick={(e) => {
                      handleSearch(e, '/list-nc')
                    }}
                  >
                    Danh sách Nhạc công
                  </MenuItem>

                  <MenuItem
                    sx={{ fontSize: '16px', color: '#333' }}
                    onClick={(e) => {
                      handleSearch(e, '/list-combo')
                    }}
                  >
                    Danh sách Combo món ăn
                  </MenuItem>

                  <MenuItem
                    sx={{ fontSize: '16px', color: '#333' }}
                    onClick={(e) => {
                      handleSearch(e, '/list-thiep')
                    }}
                  >
                    Danh sách Thiệp mời
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

const StyledButton = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-color); /* Màu chữ */
  text-transform: capitalize;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--bold-color); /* Màu chữ khi hover */
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--bold-color); /* Màu viền */
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease-in-out;
  }
`

export default ListService
