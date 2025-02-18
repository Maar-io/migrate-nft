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
  return (
    <div style={{
      border: `2px solid ${verified === false ? 'red' : 'green'}`,
      borderRadius: '8px',
        width: "300px",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem",
        margin: "0.5rem",
        boxSizing: "border-box"
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}projectImages/${project}.jpg`}
        alt={`${project} logo`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
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
