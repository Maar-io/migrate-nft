// src/components/NFTMatchCard.tsx
interface NFTMatchCardProps {
  project: string;
  tokenId: string;
  amount: string;
  verified?: boolean;
}

const NFTMatchCard: React.FC<NFTMatchCardProps> = ({
  project,
  tokenId,
  amount,
  verified,
}) => {
  const getBorderColor = (verificationStatus?: boolean) => {
    if (verificationStatus === undefined) return '#888888';
    return verificationStatus ? 'green' : 'red';
  };

  const getImageStyle = (verificationStatus?: boolean) => ({
    width: "100px",
    height: "100px",
    objectFit: "cover" as const,
    borderRadius: "4px",
    filter: verificationStatus === false ? 'grayscale(100%) opacity(50%)' : 'none',
    transition: 'filter 0.3s ease'
  });

  return (
    <div style={{
      border: `2px solid ${getBorderColor(verified)}`,
      borderRadius: '8px',
      width: "300px",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem",
      margin: "0.5rem",
      boxSizing: "border-box"
    }}>
      <img
        src={`${import.meta.env.BASE_URL}projectImages/${project}.jpg`}
        alt={`${project} logo`}
        style={getImageStyle(verified)}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ fontWeight: "bold" }}>{project}</div>
        <div style={{ fontSize: "0.9rem", color: "#666" }}>
          Token ID: {tokenId}
        </div>
        {amount && (
          <div style={{ fontSize: "0.9rem", color: "#666" }}>
            Amount: {amount}
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTMatchCard;
