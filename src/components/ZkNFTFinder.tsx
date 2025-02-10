import { useEffect, useState } from 'react';
import { NFTMatch, findNFTsByAddress } from './findNFTsByAddress';
import { ERC1155Match, findERC1155ByAddress } from './findERC1155ByAddress';

interface ZkNFTFinderProps {
  address: string;
}

const ZkNFTFinder: React.FC<ZkNFTFinderProps> = ({ address }) => {
  const [matches, setMatches] = useState<NFTMatch[]>([]);
  const [matches1155, setMatches1155] = useState<ERC1155Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchNFTs = async () => {
      if (!address) return;
      setLoading(true);
      console.log('Starting NFT search for address:', address); // Add this line
      try {
        const [found721, found1155] = await Promise.all([
          findNFTsByAddress(address),
          findERC1155ByAddress(address)
        ]);
        console.log('Found ERC721 NFTs:', found721);
        console.log('Found ERC1155 NFTs:', found1155);
        setMatches(found721);
        setMatches1155(found1155);
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
      ) : (matches.length > 0 || matches1155.length > 0) ? (
        <div>
          {matches.length > 0 && (
            <div>
              <h3>Found ERC721 NFTs:</h3>
              {matches.map((match, index) => (
                <div key={`721-${index}`} style={{
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
          )}
          
          {matches1155.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Found ERC1155 NFTs:</h3>
              {matches1155.map((match, index) => (
                <div key={`1155-${index}`} style={{
                  padding: '0.5rem',
                  margin: '0.5rem 0',
                  border: '1px solid #999999',
                  borderRadius: '4px',
                  backgroundColor: '#f8f8f8'
                }}>
                  Project: {match.project}<br />
                  Token ID: {match.tokenId}<br />
                  Amount: {match.amount}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : address && (
        <div>No NFTs found for this address</div>
      )}
    </div>
  );
};

export default ZkNFTFinder;