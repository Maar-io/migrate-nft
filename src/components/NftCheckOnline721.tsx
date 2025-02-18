import { useState, useEffect } from "react";
import { createPublicClient, http, Address } from "viem";
import { soneium } from "viem/chains";
import NFTMatchCard from "./NFTMatchCard";
import contractsData from "../data/SoneiumContracts721.json";

// ABI for ownerOf function
const ABI = [
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface ContractInfo {
  address: string;
  totalSupply: string;
}

interface ContractsData {
  [project: string]: ContractInfo;
}

interface NFTMatch {
  project: string;
  tokenId: string;
}

interface Props {
  matches721: NFTMatch[];
  address: string;
}

// Create client outside component to prevent recreating on every render
const client = createPublicClient({
  chain: soneium,
  transport: http(),
});

const NftCheckOnline721: React.FC<Props> = ({ matches721, address }) => {
  const [verifiedMatches, setVerifiedMatches] = useState<Map<string, boolean>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyOwnership = async () => {
      const newVerifiedMatches = new Map<string, boolean>();

      for (const match of matches721) {
        const contractInfo = (contractsData as ContractsData)[match.project];
        console.log("contractInfo:", contractInfo);
        
        const key = `721-${match.project}-${match.tokenId}`;
        
        if (!contractInfo) {
          console.warn(`No contract info found for project: ${match.project}`);
          newVerifiedMatches.set(key, false);
          continue;
        }

        try {
          const onchainOwner = await client.readContract({
            address: contractInfo.address as Address,
            abi: ABI,
            functionName: "ownerOf",
            args: [BigInt(match.tokenId)],
          });
          console.log(`Token ${match.tokenId} owner: ${onchainOwner}`);

          newVerifiedMatches.set(
            key,
            onchainOwner.toLowerCase() === address.toLowerCase()
          );
        } catch (error) {
          console.error(
            `Error verifying ownership for ${match.project} token ${match.tokenId}:`,
            error
          );
          newVerifiedMatches.set(key, false);
        }
      }

      setVerifiedMatches(newVerifiedMatches);
      setLoading(false);
    };

    verifyOwnership();
  }, [matches721, address]);

  if (loading) {
    return <div>Verifying NFT ownership...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "flex-start",
      }}
    >
      {matches721.map((match) => (
        <NFTMatchCard
          key={`721-${match.project}-${match.tokenId}`}
          project={match.project}
          tokenId={match.tokenId}
          amount="1"
          verified={verifiedMatches.get(`721-${match.project}-${match.tokenId}`)}
        />
      ))}
    </div>
  );
};

export default NftCheckOnline721;