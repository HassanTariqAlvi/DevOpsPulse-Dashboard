import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Builds from './pages/Builds'
import Deployments from './pages/Deployments'
import Uptime from './pages/Uptime'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/uptime" element={<Uptime />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
