// src/components/findERC1155ByAddress.ts
import config1155 from '../data/zk_input_1155.json';

export interface ERC1155Match {
  project: string;
  tokenId: string;
  amount: string;
}

export const findERC1155ByAddress = async (address: string): Promise<ERC1155Match[]> => {
  const matches: ERC1155Match[] = [];
  
  for (const project of Object.keys(config1155)) {
    // console.log(`Checking ${project}_instances.csv`);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}instances/${project}_instances.csv`);
      if (!response.ok) {
        console.error(`[ERC1155] HTTP error for ${project}: ${response.status}`);
        continue;
          }
      
      const csvText = await response.text();
      const lines = csvText.split('\n').slice(1); // Skip header

      for (const line of lines) {
        if (!line.trim()) continue;
        const [csvAddress, tokenId, amount] = line.split(',');
        if (csvAddress.toLowerCase() === address.toLowerCase()) {
          matches.push({ project, tokenId, amount });
          // console.log(`Found ERC1155 match for ${project} with token ID ${tokenId} (amount: ${amount})`);
        }
      }
    } catch (error) {
      console.error(`Error reading CSV for ${project}:`, error);
    }
  }
  console.log(`[ERC1155] Search complete. Found ${matches.length} matches`);

  return matches;
};