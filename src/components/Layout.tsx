import React, { ReactNode } from 'react';
import { ParticleBackground } from './ParticleBackground';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400 mb-2">
            Calculadora Física de Colisões 
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Calcule colisões elásticas e inelásticas com precisão. Introduza as massas e as velocidades iniciais para ver os resultados.
          </p>
        </header>
        <main>
          {children}
        </main>
        <footer className="mt-12 text-center text-blue-300 text-sm">
          <p>© {new Date().getFullYear()} Calculadora de colisões</p>
        </footer>
      </div>
    </div>
  );
};