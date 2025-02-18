interface ScanButtonProps {
  onClick: () => void;
}

const ScanButton: React.FC<ScanButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        marginTop: '2rem',
        marginLeft: '0.5rem',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #999999',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0'
      }}
    >
      Scan
    </button>
  )
}

export default ScanButton