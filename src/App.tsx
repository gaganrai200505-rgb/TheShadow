import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import Process from './pages/Process'
import Connect from './pages/Connect'
import ProjectDetail from './pages/ProjectDetail'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/made-by-yellow/" element={<Work />} />
          <Route path="/made-by-the-shadow/" element={<Navigate to="/made-by-yellow/" replace />} />
          <Route path="/how-we-roll/" element={<Process />} />
          <Route path="/connect/" element={<Connect />} />
          <Route path="/project/:slug/" element={<ProjectDetail />} />
          <Route path="/cookies/" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  )
}
