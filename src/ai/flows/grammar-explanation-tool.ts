'use server';

/**
 * @fileOverview Provides grammatical explanations based on user input.
 *
 * - getGrammarExplanation - A function that analyzes user inputs and identifies relevant grammatical explanations.
 * - GrammarExplanationInput - The input type for the getGrammarExplanation function.
 * - GrammarExplanationOutput - The return type for the getGrammarExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GrammarExplanationInputSchema = z.object({
  userInput: z.string().describe('The user input that needs grammatical explanation.'),
  userLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The user\u2019s current language proficiency level.'),
});
export type GrammarExplanationInput = z.infer<typeof GrammarExplanationInputSchema>;

const GrammarExplanationOutputSchema = z.object({
  explanation: z.string().describe('The grammatical explanation tailored to the user input and level.'),
});
export type GrammarExplanationOutput = z.infer<typeof GrammarExplanationOutputSchema>;

export async function getGrammarExplanation(input: GrammarExplanationInput): Promise<GrammarExplanationOutput> {
  return grammarExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'grammarExplanationPrompt',
  input: {schema: GrammarExplanationInputSchema},
  output: {schema: GrammarExplanationOutputSchema},
  prompt: `You are a language learning assistant. Your task is to analyze the user input and provide a grammatical explanation that is tailored to their level.

User Level: {{{userLevel}}}
User Input: {{{userInput}}}

Provide a simple and clear explanation of the grammar used in the user input. Focus on the specific grammatical structures and rules that apply. Explain why the input is structured the way it is, and provide examples to help the user understand.
`,
});

const grammarExplanationFlow = ai.defineFlow(
  {
    name: 'grammarExplanationFlow',
    inputSchema: GrammarExplanationInputSchema,
    outputSchema: GrammarExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
