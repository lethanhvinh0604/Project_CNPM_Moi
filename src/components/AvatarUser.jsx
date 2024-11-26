import * as React from 'react'
import Avatar from '@mui/material/Avatar'

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name, size) {
  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const initials = normalized
    .split(' ')
    .map((word) => word[0])
    .join('')
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      fontSize: size / 3 // Adjust font size relative to avatar size
    },
    children: initials
  }
}

function AvatarUser({ name, size = 40 }) {
  // Default size is 40
  return <Avatar {...stringAvatar(name, size)} />
}

export default AvatarUser
