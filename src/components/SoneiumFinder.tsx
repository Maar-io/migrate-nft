import { useEffect, useState } from "react";
import { NFTMatch, findNFTsByAddress } from "./findNFTsByAddress";
import { ERC1155Match, findERC1155ByAddress } from "./findERC1155ByAddress";
import NftCheckOnline1155 from "./NftCheckOnline1155";

interface NFTFinderProps {
  address: string;
}

const SoneiumFinder: React.FC<NFTFinderProps> = ({ address }) => {
  const [matches, setMatches] = useState<NFTMatch[]>([]);
  const [matches1155, setMatches1155] = useState<ERC1155Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchNFTs = async () => {
      if (!address) return;
      setLoading(true);
      console.log("Scanning Blockchain for address:", address); // Add this line
      try {
        const [found721, found1155] = await Promise.all([
          findNFTsByAddress(address),
          findERC1155ByAddress(address),
        ]);
        // console.log("Found ERC721 NFTs:", found721);
        // console.log("Found ERC1155 NFTs:", found1155);
        setMatches(found721);
        setMatches1155(found1155);
      } catch (error) {
        console.error("Error finding NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    searchNFTs();
  }, [address]);

  return (
    <div style={{
      margin: "1rem",
      padding: "1rem",
    }}>
      {loading ? (
        <div>Searching...</div>
      ) : matches.length > 0 || matches1155.length > 0 ? (
        <NftCheckOnline1155 
          matches1155={matches1155} 
          address={address} 
        />
      ) : (
        address && <div>No NFTs found for this address</div>
      )}
    </div>
  );
};

export default SoneiumFinder;
