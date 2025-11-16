import placeholderData from '@/lib/placeholder-images.json';
const {placeholderImages} = placeholderData;

export interface MultipleChoiceExerciseData {
  id: number;
  type: 'multiple-choice';
  prompt: string;
  image?: string;
  options: string[];
  correctAnswer: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface FillInTheBlankExerciseData {
  id: number;
  type: 'fill-in-the-blank';
  prompt: string;
  parts: {id: number; type: 'text' | 'blank'; text?: string; width?: number}[];
  correctAnswer: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export interface PronunciationExerciseData {
  id: number;
  type: 'pronunciation';
  prompt: string;
  correctAnswer: string;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

export type Exercise =
  | MultipleChoiceExerciseData
  | FillInTheBlankExerciseData
  | PronunciationExerciseData;

export interface Lesson {
  id: number;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  exercises: Exercise[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Unit 1: Basic Greetings',
    description: 'Learn how to introduce yourself and greet people in Spanish.',
    xp: 50,
    completed: true,
    exercises: [
      {
        id: 101,
        type: 'multiple-choice',
        prompt: 'Which of these means "Hello"?',
        image: placeholderImages.find(p => p.id === 'lesson-greetings')
          ?.imageUrl,
        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
        correctAnswer: 'Hola',
        feedback: {
          correct: '¡Excelente! "Hola" is how you say "Hello" in Spanish.',
          incorrect:
            'Not quite. "Hola" is the correct answer for "Hello".',
        },
      },
      {
        id: 102,
        type: 'fill-in-the-blank',
        prompt: 'Complete the phrase: "Buenos ___"',
        parts: [
          {id: 1, type: 'text', text: 'Buenos'},
          {id: 2, type: 'blank', width: 8},
          {id: 3, type: 'text', text: '.'},
        ],
        correctAnswer: 'Buenos días.',
        feedback: {
          correct: 'Perfect! "Buenos días" means "Good morning".',
          incorrect: 'Good try! The correct phrase is "Buenos días".',
        },
      },
      {
        id: 103,
        type: 'pronunciation',
        prompt: 'Practice saying "Good afternoon"',
        correctAnswer: 'Buenas tardes',
        feedback: {
          correct: 'That sounded great! Keep it up.',
          incorrect: "Let's give it another try. Focus on the 'rr' sound.",
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Unit 2: Family & Friends',
    description: 'Talk about your family and friends.',
    xp: 75,
    completed: false,
    exercises: [
      {
        id: 201,
        type: 'multiple-choice',
        prompt: 'What is "mother" in Spanish?',
        image: placeholderImages.find(p => p.id === 'lesson-family')?.imageUrl,
        options: ['Padre', 'Hermano', 'Madre', 'Hija'],
        correctAnswer: 'Madre',
        feedback: {
          correct: 'Correct! "Madre" is mother.',
          incorrect: 'The correct answer is "Madre".',
        },
      },
    ],
  },
];
