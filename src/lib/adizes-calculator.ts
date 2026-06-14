export type PAEIScore = {
  P: number;
  A: number;
  E: number;
  I: number;
};

export type Answer = {
  questionId: number;
  ratings: {
    A: number; // maps to P
    B: number; // maps to A
    V: number; // maps to E
    G: number; // maps to I
  };
};

/**
 * Calculates the PAEI score from a set of answers.
 * Each question has 4 statements rated 1–4:
 *   A → P (Producer)
 *   B → A (Administrator)
 *   V → E (Entrepreneur)
 *   G → I (Integrator)
 */
export function calculatePAEI(answers: Answer[]): PAEIScore {
  const result: PAEIScore = { P: 0, A: 0, E: 0, I: 0 };
  answers.forEach((answer) => {
    result.P += answer.ratings.A || 0;
    result.A += answer.ratings.B || 0;
    result.E += answer.ratings.V || 0;
    result.I += answer.ratings.G || 0;
  });
  return result;
}

export function formatPAEIResult(score: PAEIScore): string {
  return `P${score.P}-A${score.A}-E${score.E}-I${score.I}`;
}
