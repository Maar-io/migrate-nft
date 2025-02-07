import { useState } from 'react'
import Header from './components/Header'
import ZkAstar from './components/ZkAstar'
import Soneium from './components/Soneium'
import AddressInput from './components/AddressInput'

function App() {
  const [currentAddress, setCurrentAddress] = useState<string>('')
  const [scannedAddress, setScannedAddress] = useState<string>('')

  const handleAddressChange = (address: string) => {
    setCurrentAddress(address)
  }

  const handleScan = () => {
    setScannedAddress(currentAddress)
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Header title="NFT Dashboard" />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1rem'
      }}>
        <AddressInput onAddressChange={handleAddressChange} />
      </div>
      <div style={{
        display: 'flex',
        marginTop: '1rem',
        height: 'calc(100vh - 8rem)',
        boxSizing: 'border-box'
      }}>
        <ZkAstar 
          scannedAddress={scannedAddress}
          onScan={handleScan}
        />
        <Soneium />
      </div>
    </div>
  )
}

export default App