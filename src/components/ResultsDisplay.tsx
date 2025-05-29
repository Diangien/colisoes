import React from 'react';
import { CollisionResults, CollisionType } from '../types/physics';

interface ResultsDisplayProps {
  results: CollisionResults;
  collisionType: CollisionType;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, collisionType }) => {
  const roundToThree = (num: number) => {
    return Math.round(num * 1000) / 1000;
  };

  const roundToFour = (num: number) => {
    return Math.round(num * 10000) / 10000;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-200">Resultados da Colisão</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-950/40 rounded-lg p-4">
          <h3 className="text-lg font-medium text-teal-400 mb-2">Velocidades Finais</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-300">Objecto 1:</p>
              <p className="text-xl font-semibold">{roundToThree(results.finalVelocity1)} m/s</p>
            </div>
            <div>
              <p className="text-sm text-blue-300">Objecto 2:</p>
              <p className="text-xl font-semibold">{roundToThree(results.finalVelocity2)} m/s</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-950/40 rounded-lg p-4">
            <h3 className="text-lg font-medium text-teal-400 mb-2">Quantidades de Movimento</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-blue-300">Inicial:</p>
                <p className="text-lg font-semibold">{roundToThree(results.initialMomentum)} kg·m/s</p>
              </div>
              <div>
                <p className="text-sm text-blue-300">Final:</p>
                <p className="text-lg font-semibold">{roundToThree(results.finalMomentum)} kg·m/s</p>
              </div>
              <div className="border-t border-blue-800 pt-2 mt-2">
                <p className="text-sm text-blue-300">Variação:</p>
                <p className="text-lg font-semibold">
                  {roundToThree(results.momentumChange)} kg·m/s
                  <span className="text-xs ml-2 text-blue-400">
                    ({Math.abs(roundToThree(results.momentumChangePercentage))}%)
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-950/40 rounded-lg p-4">
            <h3 className="text-lg font-medium text-teal-400 mb-2">Energia Cinética</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-blue-300">Inicial:</p>
                <p className="text-lg font-semibold">{roundToFour(results.initialKineticEnergy)} J</p>
              </div>
              <div>
                <p className="text-sm text-blue-300">Final:</p>
                <p className="text-lg font-semibold">{roundToFour(results.finalKineticEnergy)} J</p>
              </div>
              <div className="border-t border-blue-800 pt-2 mt-2">
                <p className="text-sm text-blue-300">Variação:</p>
                <p className={`text-lg font-semibold ${
                  collisionType === 'inelastic' ? 'text-orange-400' : 'text-green-400'
                }`}>
                  {roundToThree(results.kineticEnergyChange)} J
                  <span className="text-xs ml-2 text-blue-400">
                    ({Math.abs(roundToThree(results.kineticEnergyChangePercentage))}%)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-blue-300 bg-blue-950/40 rounded-lg p-4">
          <h3 className="text-base font-medium text-teal-400 mb-2">Detalhes Físicos</h3>
          {collisionType === 'elastic' ? (
            <p>
         Nesta colisão elástica, o momento e a energia cinética são conservados. 
As pequenas diferenças nos cálculos (se houver) são devidas ao arredondamento nos valores de exibição.
            </p>
          ) : (
            <p>
              Nesta colisão inelástica, o momento é conservado, mas a energia cinética não é. 
Observe que a energia cinética final é menor que a energia cinética inicial,
com a diferença sendo convertida em outras formas de energia (como calor e som).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};