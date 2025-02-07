import { useEffect, useState } from 'react';
import { NFTMatch, findNFTsByAddress } from './findNFTsByAddress';

interface ZkNFTFinderProps {
  address: string;
}

const ZkNFTFinder: React.FC<ZkNFTFinderProps> = ({ address }) => {
  const [matches, setMatches] = useState<NFTMatch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchNFTs = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const found = await findNFTsByAddress(address);
        console.log('Found NFTs:', found);
        setMatches(found);
      } catch (error) {
        console.error('Error finding NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    searchNFTs();
  }, [address]);

  return (
    <div style={{
      margin: '1rem',
      padding: '1rem'
    }}>
      {loading ? (
        <div>Searching...</div>
      ) : matches.length > 0 ? (
        <div>
          <h3>Found NFTs:</h3>
          {matches.map((match, index) => (
            <div key={index} style={{
              padding: '0.5rem',
              margin: '0.5rem 0',
              border: '1px solid #999999',
              borderRadius: '4px',
              backgroundColor: '#f8f8f8'
            }}>
              Project: {match.project}<br />
              Token ID: {match.tokenId}
            </div>
          ))}
        </div>
      ) : address && (
        <div>No NFTs found for this address</div>
      )}
    </div>
  );
};

export default ZkNFTFinder;