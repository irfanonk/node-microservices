// src/routes/index.jsx
import { Routes, Route } from 'react-router-dom'
import Upload from '../pages/Upload'
import Users from '../pages/Users'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="*" element={<div>not found</div> } />
    </Routes>
  )
}

export default AppRoutes
