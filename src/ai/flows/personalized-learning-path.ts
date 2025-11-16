'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning paths based on user's skill level, pace and interests.
 *
 * @exports generatePersonalizedLearningPath - An async function to generate a personalized learning path.
 * @exports PersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * @exports PersonalizedLearningPathOutput - The output type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathInputSchema = z.object({
  skillLevel: z
    .string()
    .describe('The user\'s current skill level in the language.'),
  learningPace: z
    .string()
    .describe('The user\'s preferred learning pace (e.g., slow, medium, fast).'),
  interests: z.string().describe('The user\'s interests (e.g., travel, food, culture).'),
  language: z.string().describe('The language the user wants to learn.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe('A personalized learning path tailored to the user.'),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an AI language learning expert. Create a personalized learning path for a user based on the following information:

Language: {{{language}}}
Skill Level: {{{skillLevel}}}
Learning Pace: {{{learningPace}}}
Interests: {{{interests}}}

The learning path should include specific topics, exercises, and resources tailored to the user's needs and preferences. Return the learning path as a string.
`,
});

const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output!;
  }
);
