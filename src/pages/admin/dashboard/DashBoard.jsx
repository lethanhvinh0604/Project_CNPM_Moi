import { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Link from '@mui/material/Link'

import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

// import LogoAdmin from '../../../assets/logo-v1.png'
import LogoAdmin from '../../../assets/logo-v2.png'

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import FoodBankIcon from '@mui/icons-material/FoodBank'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'

import HoiTruong from './hoitruong/HoiTruong'
import Thiep from './thiep/Thiep'
import Combo from './combo/Combo'
import NhacCong from './nhaccong/NhacCong'
import MC from './mc/MC'
import TongQuan from './tongquan/TongQuan'
import DonDatHang from './dondathang/DonDatHang'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

function DashBoard() {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const [content, setContent] = useState('Tổng quan')

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  return (
    <>
      <Helmet>
        <title>Dashboard Quản lý</title>
      </Helmet>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ bgcolor: '#fff', color: 'var(--primary-color)' }}
        >
          <Toolbar>
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' })
                }}
              >
                <MenuIcon sx={{ fontSize: 30, color: 'var(----bold-color)' }} />
              </IconButton>
              <Typography
                variant="h3"
                noWrap
                component="div"
                sx={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(----primary-color)'
                }}
              >
                Dashboard Quản Lý
              </Typography>
            </>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              width: 100,
              borderRight: '2px solid var(--secondary-color)',
              background: '#fff',
              color: 'var(--primary-color)'
            }
          }}
        >
          <DrawerHeader
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 30px'
            }}
          >
            <Link href="/" underline="none">
              <Box
                display="flex"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
              >
                <img
                  src={LogoAdmin}
                  alt="Web Logo"
                  style={{ width: '100px' }}
                />
              </Box>
            </Link>
            <IconButton onClick={handleDrawerClose} sx={{ fontSize: 40 }}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon
                  sx={{ fontSize: 30, color: 'var(--primary-color)' }}
                />
              ) : (
                <ChevronLeftIcon
                  sx={{ fontSize: 30, color: 'var(--primary-color)' }}
                />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              {
                text: 'Tổng quan',
                icon: <AutoAwesomeMosaicIcon sx={{ fontSize: 30 }} />
              },
              {
                text: 'Hội trường',
                icon: <MeetingRoomIcon sx={{ fontSize: 30 }} />
              },
              {
                text: 'Đơn đặt hàng',
                icon: <ShoppingCartIcon sx={{ fontSize: 30 }} />
              },
              {
                text: 'MC',
                icon: <InterpreterModeIcon sx={{ fontSize: 30 }} />
              },
              {
                text: 'Nhạc công',
                icon: <LibraryMusicIcon sx={{ fontSize: 30 }} />
              },
              {
                text: 'Món ăn',
                icon: <FoodBankIcon sx={{ fontSize: 30 }} />
              },
              {
                text: 'Thiệp mời',
                icon: <CardGiftcardIcon sx={{ fontSize: 30 }} />
              }
            ].map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  onClick={() => handleContentChange(item.text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: '#ffffff4d',
                      borderLeft: '4px solid var(--primary-color)1'
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#ffffff4d',
                      borderLeft: '4px solid var(--primary-color)'
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'var(--primary-color)'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                    primaryTypographyProps={{
                      fontSize: '1.6rem',
                      fontWeight: '700'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {content === 'Tổng quan' && <TongQuan />}
          {content === 'Hội trường' && <HoiTruong />}
          {content === 'Đơn đặt hàng' && <DonDatHang />}
          {content === 'Món ăn' && <Combo />}
          {content === 'Thiệp mời' && <Thiep />}
          {content === 'Nhạc công' && <NhacCong />}
          {content === 'MC' && <MC />}
        </Box>
      </Box>
    </>
  )
}

export default DashBoard
