import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

console.log('env', import.meta.env);


function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {

      const rawData = await fetch('http://localhost:4000/api/users')
      const data = await rawData.json()
      console.log('data', data);
      setUsers(data)
      
    })()

  }, [])
  

  return (
    <>
    <p>Users with rest api</p>
      <div>
        {users.map((user) => (
          <div style={{display:'flex', flexDirection:'row', gap:10}} key={user.id}>
            <p>{user.name},</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
