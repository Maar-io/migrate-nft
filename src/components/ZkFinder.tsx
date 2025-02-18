import { useEffect, useState } from "react";
import { NFTMatch, findNFTsByAddress } from "./findNFTsByAddress";
import { ERC1155Match, findERC1155ByAddress } from "./findERC1155ByAddress";
import NFTMatchCard from "./NFTMatchCard";

interface NFTFinderProps {
  address: string;
}

const ZkFinder: React.FC<NFTFinderProps> = ({ address }) => {
  const [matches, setMatches] = useState<NFTMatch[]>([]);
  const [matches1155, setMatches1155] = useState<ERC1155Match[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchNFTs = async () => {
      if (!address) return;
      setLoading(true);
      console.log("Starting zk NFT search for address:", address); // Add this line
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
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "flex-start"
        }}>
          {matches.map((match) => (
            <NFTMatchCard
              key={`${match.project}-${match.tokenId}`}
              project={match.project}
              tokenId={match.tokenId}
              amount={"1"}
              verified={true}
              />
            ))}
          {matches1155.map((match) => (
            <NFTMatchCard
            key={`1155-${match.project}-${match.tokenId}`}
            project={match.project}
            tokenId={match.tokenId}
            amount={match.amount}
            verified={true}
            />
          ))}
        </div>
      ) : (
        address && <div>No NFTs found for this address</div>
      )}
    </div>
  );
};

export default ZkFinder;
