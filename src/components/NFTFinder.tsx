import { useEffect, useState } from 'react';
import { NFTMatch, findNFTsByAddress } from './findNFTsByAddress';
import NFTMatchCard from './NFTMatchCard';
import configData from '../data/zk_input_721.json';
import { ProjectConfig } from '../types/config';

const config = configData as ProjectConfig;

interface NFTFinderProps {
  address: string;
}

const NFTFinder: React.FC<NFTFinderProps> = ({ address }) => {
  const [matches, setMatches] = useState<NFTMatch[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchNFTs = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const results = await findNFTsByAddress(address);
        setMatches(results);
      } catch (error) {
        console.error('Error finding NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    searchNFTs();
  }, [address]);

  if (loading) return <div>Searching...</div>;

  return (
    <div>
      {matches.map((match) => (
        <NFTMatchCard
          key={`${match.project}-${match.tokenId}`}
          project={match.project}
          tokenId={match.tokenId}
          logoUrl={config[match.project]?.logoUrl}
        />
      ))}
      {!loading && matches.length === 0 && address && (
        <div>No NFTs found for this address</div>
      )}
    </div>
  );
};

export default NFTFinder;