import config from '../data/zk_input_721.json';

export interface NFTMatch {
  project: string;
  tokenId: string;
}

export interface ProjectConfig {
  address: string;
  tokenURIchangeNeeded: string;
}

export const findNFTsByAddress = async (address: string): Promise<NFTMatch[]> => {
  const matches: NFTMatch[] = [];
  
  for (const project of Object.keys(config)) {
    console.log(`Checking ${project}_instances.csv`);
    try {
      // Add base URL to fetch path
      const response = await fetch(`${import.meta.env.BASE_URL}instances/${project}_instances.csv`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      
      const lines = csvText.split('\n').slice(1); // Skip header
      
      for (const line of lines) {
        if (!line.trim()) continue;
        const [csvAddress, tokenId] = line.split(',');
        if (csvAddress.toLowerCase() === address.toLowerCase()) {
          matches.push({ project, tokenId });
          console.log(`Found match for ${project} with token ID ${tokenId}`);
        }
      }
    } catch (error) {
      console.error(`Error reading CSV for ${project}:`, error);
    }
  }
  
  return matches;
};