content = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initializeLocalStorageSeed } from './data/seedData'

// Initialize all 33 songs synced lyrics and trims into localStorage
initializeLocalStorageSeed()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"""

with open("src/main.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("src/main.tsx updated with initializeLocalStorageSeed()!")
