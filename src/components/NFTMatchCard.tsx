// src/components/NFTMatchCard.tsx
interface NFTMatchCardProps {
  project: string;
  tokenId: string;
  logoUrl?: string;
}

const NFTMatchCard: React.FC<NFTMatchCardProps> = ({ project, tokenId, logoUrl }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.5rem',
      border: '1px solid #999999',
      borderRadius: '4px',
      margin: '0.5rem 0'
    }}>
      <img 
        src={logoUrl || 'default-placeholder.png'} 
        alt={`${project} logo`}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
          borderRadius: '4px'
        }}
      />
      <div>
        <div style={{ fontWeight: 'bold' }}>{project}</div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>Token ID: {tokenId}</div>
      </div>
    </div>
  );
};

export default NFTMatchCard;