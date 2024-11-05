import React from 'react';
import { Header, Feature, Footer } from '../components';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <Feature />
      <Footer />
    </div>
  );
};