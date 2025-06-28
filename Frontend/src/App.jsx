import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-146px)]'>
        <Outlet />
      </main>
      <Footer />

    </>
  )
}

export default App
