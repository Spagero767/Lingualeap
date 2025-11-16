'use server';
/**
 * @fileOverview Generates a list of exercises for the user to review.
 *
 * - generateExercisesToReview - A function that generates a list of exercises to review.
 * - GenerateExercisesToReviewInput - The input type for the generateExercisesToReview function.
 * - GenerateExercisesToReviewOutput - The return type for the generateExercisesToReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExercisesToReviewInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  exercisesCompleted: z
    .array(z.string())
    .describe('List of IDs of exercises the user has completed.'),
  userProficiencyLevels: z
    .record(z.number())
    .describe(
      'A map of exercise ID to proficiency level, which ranges from 0 to 1.'
    ),
});
export type GenerateExercisesToReviewInput =
  z.infer<typeof GenerateExercisesToReviewInputSchema>;

const GenerateExercisesToReviewOutputSchema = z.object({
  exercisesToReview: z
    .array(z.string())
    .describe('List of exercises the user should review, by exercise ID.'),
});
export type GenerateExercisesToReviewOutput =
  z.infer<typeof GenerateExercisesToReviewOutputSchema>;

export async function generateExercisesToReview(
  input: GenerateExercisesToReviewInput
): Promise<GenerateExercisesToReviewOutput> {
  return generateExercisesToReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExercisesToReviewPrompt',
  input: {schema: GenerateExercisesToReviewInputSchema},
  output: {schema: GenerateExercisesToReviewOutputSchema},
  prompt: `You are an AI that suggests exercises for a user to review.

  Given a list of exercises the user has completed, their user ID, and their proficiency levels for each exercise (ranging from 0 to 1), determine which exercises the user should review to improve their skills and knowledge retention. Focus on exercises where the proficiency level is low.

  User ID: {{{userId}}}
  Exercises Completed: {{exercisesCompleted}}
  Proficiency Levels: {{userProficiencyLevels}}

  Return a JSON list of the exercise IDs to review in the 'exercisesToReview' field.
  Make sure not to suggest exercises with proficiency scores above 0.75.
  `,
});

const generateExercisesToReviewFlow = ai.defineFlow(
  {
    name: 'generateExercisesToReviewFlow',
    inputSchema: GenerateExercisesToReviewInputSchema,
    outputSchema: GenerateExercisesToReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
