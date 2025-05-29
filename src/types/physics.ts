export type CollisionType = 'elastic' | 'inelastic';

export interface CollisionInputs {
  mass1: number;
  mass2: number;
  velocity1: number;
  velocity2: number;
}

export interface CollisionResults {
  // Final velocities
  finalVelocity1: number;
  finalVelocity2: number;
  
  // Momentum values
  initialMomentum: number;
  finalMomentum: number;
  momentumChange: number;
  momentumChangePercentage: number;
  
  // Kinetic energy values
  initialKineticEnergy: number;
  finalKineticEnergy: number;
  kineticEnergyChange: number;
  kineticEnergyChangePercentage: number;
}