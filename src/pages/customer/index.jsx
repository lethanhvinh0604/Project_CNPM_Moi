import { Route, Routes } from 'react-router-dom'
import OrderEvent from './orderEvent/OrderEvent'
import Profile from './profile/Profile'

export function Customer() {
  return (
    <>
      <Routes>
        <Route path="/customer/order-event" element={<OrderEvent />} />
        <Route path="/customer/profile" element={<Profile />} />
      </Routes>
    </>
  )
}
