import React from 'react';

const Header = () => {
  return (
    <div style={styles.headerContainer}>
      <h1 style={styles.headerTitle}>Dashboard</h1>
    </div>
  );
}

const styles = {
  headerContainer: {
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dee2e6'
  },
  headerTitle: {
    margin: 0,
    fontSize: '24px'
  },
  nav: {
    display: 'flex',
    gap: '10px'
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff'
  }
}

export default Header;
