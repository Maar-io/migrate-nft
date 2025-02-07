import { useState } from 'react'
import AddressInput from './AddressInput'
import ScanButton from './ScanButton'

const ZkAstar: React.FC = () => {
  const [scannedAddress, setScannedAddress] = useState<string>('')
  const [currentAddress, setCurrentAddress] = useState<string>('')

  const handleAddressChange = (address: string) => {
    setCurrentAddress(address)
  }

  const handleScan = () => {
    setScannedAddress(currentAddress)
  }

  return (
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
      }}>
        <AddressInput onAddressChange={handleAddressChange} />
        <ScanButton onClick={handleScan} />
      </div>
      {scannedAddress && (
        <div style={{
          margin: '1rem',
          padding: '1rem',
          border: '1px solid #999999',
          borderRadius: '4px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center',
          fontFamily: 'monospace'
        }}>
          Scanned Address: {scannedAddress}
        </div>
      )}
    </div>
  )
}

export default ZkAstar