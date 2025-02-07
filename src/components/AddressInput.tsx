import { useState } from 'react'

interface AddressInputProps {
  onAddressChange: (address: string) => void
}

const AddressInput: React.FC<AddressInputProps> = ({ onAddressChange }) => {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const validateAddress = (value: string) => {
    const h160Regex = /^0x[a-fA-F0-9]{40}$/
    if (!value) {
      setError('')
      return
    }
    if (!h160Regex.test(value)) {
      setError('Invalid address format. Must be H160 (0x + 40 hex characters)')
    } else {
      setError('')
    }
    onAddressChange(value)
  }

  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Address
      </label>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value)
          validateAddress(e.target.value)
        }}
        style={{
          width: '45ch',
          fontSize: '16px',
          padding: '0.5rem',
          border: '1px solid #999999',
          borderRadius: '4px',
          fontFamily: 'monospace'
        }}
        placeholder="0x..."
      />
      {error && (
        <div style={{
          color: 'red',
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default AddressInput