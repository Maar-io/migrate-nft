import Header from './components/Header'
import AddressInput from './components/AddressInput'

function App() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Header title="NFT Dashboard" />
      <AddressInput onAddressChange={(address) => console.log(address)} />

      <div style={{
        display: 'flex',
        marginTop: '4rem',
        height: 'calc(100vh - 4rem)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '50vw',
          borderRight: '1px solid #999999',
          overflow: 'auto',
          boxSizing: 'border-box'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            Astar zkEVM
          </h2>
        </div>
        
        <div style={{
          width: '50vw',
          overflow: 'auto',
          boxSizing: 'border-box'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            Soneium
          </h2>
        </div>
      </div>
    </div>
  )
}

export default App