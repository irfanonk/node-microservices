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

      try {
        const rawData = await fetch(import.meta.env.VITE_API_URL + '/api/users')
        const data = await rawData.json()
        console.log('data', data);
        
        if(Array.isArray(data)){
          setUsers(data)
        }
        
      } catch (error) {
        console.log("error", error)
        
      }

 
      
    })()

  }, [])
  

  return (
    <>
    <p>Users with rest api</p>
      <div>
        {users?.map((user) => (
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
