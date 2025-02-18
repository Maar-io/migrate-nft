import SoneiumFinder from "./SoneiumFinder";

interface SoneiumProps {
  scannedAddress: string;
}

const Soneium: React.FC<SoneiumProps> = ({ scannedAddress }) => {
  return (
    <div
      style={{
        width: "50vw",
        borderRight: "1px solid #999999",
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          padding: "0.5rem",
          fontSize: "0.9rem",
          color: "#666",
          textAlign: "center",
          backgroundColor: "#f8f8f8",
          margin: "0.5rem",
        }}
      >
        This list shows online presence of token on Soneium. Images are representing the collections, not your NFT.
      </div>
      <h2
        style={{
          fontSize: "1.5rem",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        Soneium
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
      </div>
      {scannedAddress && <SoneiumFinder address={scannedAddress} />}
    </div>
  );
};

export default Soneium;
