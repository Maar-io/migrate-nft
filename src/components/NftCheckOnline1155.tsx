import { useState, useEffect, useMemo } from "react";
import { createPublicClient, http, Address } from "viem";
import { soneium } from "viem/chains";
import NFTMatchCard from "./NFTMatchCard";
import contractsData from "../data/SoneiumContracts1155.json";

// ABI for balanceOf function
const ABI = [
  {
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
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

interface ERC1155Match extends NFTMatch {
  amount: string;
}

interface Props {
  matches1155: ERC1155Match[];
  address: string;
}

const client = createPublicClient({
    chain: soneium,
    transport: http(),
  });

const NftCheckOnline1155: React.FC<Props> = ({
  matches1155,
  address,
}) => {
  const [verifiedMatches, setVerifiedMatches] = useState<Map<string, boolean>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyBalances = async () => {
      const newVerifiedMatches = new Map<string, boolean>();

      // Check ERC1155 matches
      for (const match of matches1155) {
        const contractInfo = (contractsData as ContractsData)[match.project];
        console.log("contractInfo:", contractInfo);
        
        const key = `1155-${match.project}-${match.tokenId}`;
        
        if (!contractInfo) {
          console.warn(`No contract info found for project: ${match.project}`);
          newVerifiedMatches.set(key, false);
          continue;
        }

        try {
          const onchainBalance = await client.readContract({

            address: contractInfo.address as Address,
            abi: ABI,
            functionName: "balanceOf",
            args: [address as Address, BigInt(match.tokenId)],
          });
          console.log(`address: ${address}, match.tokenId: ${match.tokenId}, onchainBalance: ${onchainBalance}`);

          const key = `1155-${match.project}-${match.tokenId}`;
          newVerifiedMatches.set(
            key,
            onchainBalance.toString() === match.amount
          );
        } catch (error) {
          console.error(
            `Error verifying balance for ${match.project} token ${match.tokenId}:`,
            error
          );
          const key = `1155-${match.project}-${match.tokenId}`;
          newVerifiedMatches.set(key, false);
        }
      }

      setVerifiedMatches(newVerifiedMatches);
      setLoading(false);
    };

    verifyBalances();
  }, [matches1155, address]);

  if (loading) {
    return <div>Verifying NFT balances...</div>;
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

      {matches1155.map((match) => (
        <NFTMatchCard
          key={`1155-${match.project}-${match.tokenId}`}
          project={match.project}
          tokenId={match.tokenId}
          amount={match.amount}
          verified={verifiedMatches.get(
            `1155-${match.project}-${match.tokenId}`
          )}
        />
      ))}
    </div>
  );
};

export default NftCheckOnline1155;
