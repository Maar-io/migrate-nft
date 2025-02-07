interface HeaderProps {
    title: string;
  }
  
  const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem',
            borderBottom: '1px solid #999999',
            position: 'fixed',
            top: 0,
            backgroundColor: 'white'
        }}>
            <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
                margin: '0 auto',
                maxWidth: '1200px'
            }}>
                {title}
            </h1>
        </header>
    )
}
  
  export default Header