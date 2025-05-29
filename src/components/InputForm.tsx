import React, { useState } from 'react';
import { CollisionInputs, CollisionType } from '../types/physics';
import { Scale } from 'lucide-react';

interface InputFormProps {
  inputs: CollisionInputs;
  collisionType: CollisionType;
  onInputChange: (name: keyof CollisionInputs, value: string) => void;
  onCollisionTypeChange: (type: CollisionType) => void;
  onCalculate: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({
  inputs,
  collisionType,
  onInputChange,
  onCollisionTypeChange,
  onCalculate
}) => {


   const [gramsValue, setGramsValue] = useState<string>('');
  const [convertedKg, setConvertedKg] = useState<string>('');
  /*const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    


  };*/

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    /*console.log("Value: "+value)
     console.log("Value em float: "+parseFloat(value))
    console.log("Tamanho: "+value.length)
    console.log("Value na last: "+value[value.length-1] )
    if (value[value.length -1] == '-' && value.length > 1) {
      onInputChange(name as keyof CollisionInputs, parseFloat(value.replace("-","")) * -1);
    } else {
      onInputChange(name as keyof CollisionInputs, parseFloat(value) || 0);
    }*/

    onInputChange(name as keyof CollisionInputs, value);
  };

 /* const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    const { name } = e.currentTarget;
    if(e.key == "-"){
      const currentValue = inputs[name as keyof CollisionInputs];
      const newValue = Number(currentValue) * -1
      onInputChange(name as keyof CollisionInputs, newValue);
    }
  }*/

  const handleGramsConversion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const grams = e.target.value;
    setGramsValue(grams);
    if (grams === '') {
      setConvertedKg('');
    } else {
      const kg = parseFloat(grams) / 1000;
      setConvertedKg(kg.toFixed(3));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-200">Dados de Entrada</h2>
      
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              collisionType === 'elastic'
                ? 'bg-teal-600 text-white'
                : 'bg-blue-800/50 text-blue-200 hover:bg-blue-800'
            }`}
            onClick={() => onCollisionTypeChange('elastic')}
          >
            Colisão Elástica
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              collisionType === 'inelastic'
                ? 'bg-teal-600 text-white'
                : 'bg-blue-800/50 text-blue-200 hover:bg-blue-800'
            }`}
            onClick={() => onCollisionTypeChange('inelastic')}
          >
            Colisão Inelástica
          </button>
        </div>
        
        <div className="text-sm text-blue-300 mb-4">
          {collisionType === 'elastic' ? (
            <p>Nas colisões elásticas, tanto o momento como a energia cinética são conservados.</p>
          ) : (
            <p>Nas colisões inelásticas, o momento é conservado, mas a energia cinética não.</p>
          )}
        </div>
      </div>

      <div className="mb-6 bg-blue-950/40 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Scale className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-medium text-teal-400">Conversor de Massa</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">
              Gramas (g)
            </label>
            <input
              type="number"
              value={gramsValue}
              onChange={handleGramsConversion}
              className="w-full bg-blue-950/50 border border-blue-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Insira gramas"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-300 mb-1">
              Kilogramas (kg)
            </label>
            <input
              type="text"
              value={convertedKg}
              readOnly
              className="w-full bg-blue-950/50 border border-blue-800 rounded-md py-2 px-3 text-white"
              placeholder="valor convertido"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="mass1" className="block text-sm font-medium text-blue-300 mb-1">
            Massa 1 (kg)
          </label>
          <input
            type="number"
            id="mass1"
            name="mass1"
            value={inputs.mass1}
            onChange={handleInputChange}
            className="w-full bg-blue-950/50 border border-blue-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            min="0.1"
            step="0.1"
            required
          />
        </div>
        
        <div>
          <label htmlFor="mass2" className="block text-sm font-medium text-blue-300 mb-1">
            Massa 2 (kg)
          </label>
          <input
            type="number"
            id="mass2"
            name="mass2"
            value={inputs.mass2}
            onChange={handleInputChange}
            className="w-full bg-blue-950/50 border border-blue-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            min="0.1"
            step="0.1"
            required
          />
        </div>
        
        <div>
          <label htmlFor="velocity1" className="block text-sm font-medium text-blue-300 mb-1">
            Velocidade Inicial 1 (m/s)
          </label>
          <input
            type="number"
            id="velocity1"
            name="velocity1"
            value={inputs.velocity1}
            onChange={handleInputChange}
          
            className="w-full bg-blue-950/50 border border-blue-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            step="0.1"
            required
          />
          <p className="text-xs text-blue-400 mt-1">Valores positivos se movem para a direita, valores negativos se movem para a esquerda</p>
        </div>
        
        <div>
          <label htmlFor="velocity2" className="block text-sm font-medium text-blue-300 mb-1">
            Velocidade Inicial 2 (m/s)
          </label>
          <input
            type="number"
            id="velocity2"
            name="velocity2"
            value={inputs.velocity2}
            onChange={handleInputChange}

            className="w-full bg-blue-950/50 border border-blue-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            step="0.1"
            required
          />
          <p className="text-xs text-blue-400 mt-1">Valores positivos se movem para a direita, valores negativos se movem para a esquerda</p>
        </div>
   
        
        <div className="pt-4">
          <button
            onClick={onCalculate}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-medium rounded-md shadow-md transform transition hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Calcular Colisão
          </button>
        </div>
      </div>
    </div>
  );
};