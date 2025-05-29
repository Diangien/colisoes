import { CollisionInputs, CollisionResults, CollisionType } from '../types/physics';

/**
 * Calculate the results of a collision based on input parameters and collision type
 */
export function calculateCollision(
  inputs: CollisionInputs,
  collisionType: CollisionType
): CollisionResults {
  const { mass1, mass2, velocity1, velocity2 } = inputs;
  
  // Calculate initial momentum and kinetic energy
  const initialMomentum = mass1 * velocity1 + mass2 * velocity2;
  const initialKineticEnergy = 0.5 * mass1 * velocity1 * velocity1 + 0.5 * mass2 * velocity2 * velocity2;
  
  let finalVelocity1: number;
  let finalVelocity2: number;
  
  if (collisionType === 'elastic') {
    // Elastic collision formulas
    finalVelocity1 = ((mass1 - mass2) * velocity1 + 2 * mass2 * velocity2) / (mass1 + mass2);
    finalVelocity2 = ((mass2 - mass1) * velocity2 + 2 * mass1 * velocity1) / (mass1 + mass2);
  } else {
    // Inelastic collision formulas (objects stick together)
    finalVelocity1 = finalVelocity2 = (mass1 * velocity1 + mass2 * velocity2) / (mass1 + mass2);
  }
  
  // Calculate final momentum and kinetic energy
  const finalMomentum = mass1 * finalVelocity1 + mass2 * finalVelocity2;
  const finalKineticEnergy = 0.5 * mass1 * finalVelocity1 * finalVelocity1 + 0.5 * mass2 * finalVelocity2 * finalVelocity2;
  
  // Calculate changes
  const momentumChange = finalMomentum - initialMomentum;
  const momentumChangePercentage = initialMomentum !== 0 
    ? (momentumChange / initialMomentum) * 100 
    : 0;
    
  const kineticEnergyChange = finalKineticEnergy - initialKineticEnergy;
  const kineticEnergyChangePercentage = initialKineticEnergy !== 0 
    ? (kineticEnergyChange / initialKineticEnergy) * 100 
    : 0;
  
  return {
    finalVelocity1,
    finalVelocity2,
    initialMomentum,
    finalMomentum,
    momentumChange,
    momentumChangePercentage,
    initialKineticEnergy,
    finalKineticEnergy,
    kineticEnergyChange,
    kineticEnergyChangePercentage
  };
}