import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 " >

        <Navbar />


        <main className="container mx-auto  px-4 py-8">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
