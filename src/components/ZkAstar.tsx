import ScanButton from './ScanButton'
import NFTFinder from './NFTFinder';

interface ZkAstarProps {
  scannedAddress: string;
  onScan: () => void;
}

const ZkAstar: React.FC<ZkAstarProps> = ({ 
  scannedAddress, 
  onScan 
}) => {
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
            <ScanButton onClick={onScan} />
          </div>
          {scannedAddress && <NFTFinder address={scannedAddress} />}
          </div>
      );
}

export default ZkAstar