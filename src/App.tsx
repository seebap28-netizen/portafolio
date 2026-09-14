import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { loadSite } from './lib/store'
import Admin from './pages/Admin'
import Home from './pages/Home'

export default function App() {
  const [data, setData] = useState(() => loadSite())

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            profile={data.profile}
            stack={data.stack}
            services={data.services}
            projects={data.projects}
          />
        }
      />
      <Route path="/admin" element={<Admin data={data} onChange={setData} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
