import { Route, Routes } from 'react-router-dom'
import DashBoard from './dashboard/DashBoard'

export function Admin() {
  return (
    <>
      <Routes>
        <Route path="/admin/dashboard" element={<DashBoard />} />
      </Routes>
    </>
  )
}
