export default function Deneme() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F6' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>Tailwind Test Sayfası</h1>
        <p style={{ marginTop: '1rem', color: '#4B5563' }}>Bu bir test sayfasıdır.</p>
        <button 
          style={{ 
            marginTop: '1rem', 
            backgroundColor: '#3B82F6', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.25rem',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
        >
          Test Butonu
        </button>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
      `}</style>
    </div>
  );
} 