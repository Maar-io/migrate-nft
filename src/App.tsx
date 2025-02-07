import Header from './components/Header'
import ZkAstar from './components/ZkAstar'
import Soneium from './components/Soneium'

function App() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Header title="NFT Dashboard" />
      <div style={{
        display: 'flex',
        marginTop: '4rem',
        height: 'calc(100vh - 4rem)',
        boxSizing: 'border-box'
      }}>
        <ZkAstar />
        <Soneium />
      </div>
    </div>
  )
}

export default App