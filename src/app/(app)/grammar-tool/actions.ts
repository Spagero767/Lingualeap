'use server';

import {
  getGrammarExplanation,
  GrammarExplanationInput,
} from '@/ai/flows/grammar-explanation-tool';

export async function getExplanationAction(input: GrammarExplanationInput) {
  try {
    const result = await getGrammarExplanation(input);
    return {success: true, explanation: result.explanation};
  } catch (error) {
    console.error(error);
    return {success: false, error: 'Failed to get explanation.'};
  }
}
