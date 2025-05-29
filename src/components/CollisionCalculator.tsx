import React, { useState } from 'react';
import { InputForm } from './InputForm';
import { ResultsDisplay } from './ResultsDisplay';
import { CollisionVisualizer } from './CollisionVisualizer';
import { calculateCollision } from '../utils/physicsCalculations';
import { CollisionType, CollisionInputs, CollisionResults } from '../types/physics';

export const CollisionCalculator: React.FC = () => {
  const [collisionType, setCollisionType] = useState<CollisionType>('elastic');
  const [inputs, setInputs] = useState<CollisionInputs>({
    mass1: 1,
    mass2: 1,
    velocity1: 5,
    velocity2: -3
  });
  
  const [results, setResults] = useState<CollisionResults | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (name: keyof CollisionInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
    setIsCalculated(false);
  };

  const handleCollisionTypeChange = (type: CollisionType) => {
    setCollisionType(type);
    setIsCalculated(false);
  };

  const handleCalculate = () => {
    const calculatedResults = calculateCollision({
      mass1: parseFloat(inputs.mass1.toString()),
      mass2: parseFloat(inputs.mass2.toString()),
      velocity1: parseFloat(inputs.velocity1.toString()),
      velocity2: parseFloat(inputs.velocity2.toString()),
    }, collisionType);
    console.log(inputs)
    setResults(calculatedResults);
    setIsCalculated(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-700/30">
        <InputForm
          inputs={inputs}
          collisionType={collisionType}
          onInputChange={handleInputChange}
          onCollisionTypeChange={handleCollisionTypeChange}
          onCalculate={handleCalculate}
        />
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-700/30">
          <h2 className="text-xl font-semibold mb-4 text-blue-200">Visualização da colisão</h2>
          <CollisionVisualizer 
            inputs={inputs}
            results={results}
            collisionType={collisionType}
            isCalculated={isCalculated}
          />
        </div>
        
        {isCalculated && results && (
          <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-700/30 animate-fadeIn">
            <ResultsDisplay results={results} collisionType={collisionType} />
          </div>
        )}
      </div>
    </div>
  );
};