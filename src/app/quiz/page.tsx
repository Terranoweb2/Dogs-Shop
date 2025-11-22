
'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { dogBreeds } from '@/data/dog-breeds';
import { DogBreed } from '@/types/dog';
import { HelpCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    value: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'experience',
    question: 'Quelle est votre expérience avec les chiens ?',
    options: [
      { label: 'Première fois', value: 'beginner' },
      { label: 'Quelques années', value: 'intermediate' },
      { label: 'Très expérimenté', value: 'expert' }
    ]
  },
  {
    id: 'living',
    question: 'Où vivez-vous ?',
    options: [
      { label: 'Appartement sans jardin', value: 'apartment' },
      { label: 'Maison avec petit jardin', value: 'house_small' },
      { label: 'Maison avec grand jardin', value: 'house_large' }
    ]
  },
  {
    id: 'activity',
    question: 'Quel est votre niveau d\'activité physique ?',
    options: [
      { label: 'Sédentaire', value: 'low' },
      { label: 'Modéré (promenades régulières)', value: 'moderate' },
      { label: 'Très actif (sport quotidien)', value: 'high' }
    ]
  },
  {
    id: 'size',
    question: 'Quelle taille de chien préférez-vous ?',
    options: [
      { label: 'Petit (moins de 15 kg)', value: 'Petit' },
      { label: 'Moyen (15-30 kg)', value: 'Moyen' },
      { label: 'Grand (plus de 30 kg)', value: 'Grand' },
      { label: 'Peu importe', value: 'any' }
    ]
  },
  {
    id: 'children',
    question: 'Avez-vous des enfants ?',
    options: [
      { label: 'Oui, en bas âge', value: 'young' },
      { label: 'Oui, plus âgés', value: 'older' },
      { label: 'Non', value: 'no' }
    ]
  },
  {
    id: 'grooming',
    question: 'Combien de temps pouvez-vous consacrer au toilettage ?',
    options: [
      { label: 'Très peu', value: 'Faible' },
      { label: 'Modéré', value: 'Modéré' },
      { label: 'Beaucoup', value: 'Élevé' }
    ]
  },
  {
    id: 'purpose',
    question: 'Quel est votre objectif principal ?',
    options: [
      { label: 'Compagnie et famille', value: 'family' },
      { label: 'Sport canin', value: 'sport' },
      { label: 'Garde et protection', value: 'guard' }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<DogBreed[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [quizQuestions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults([]);
    setShowResults(false);
  };

  const calculateResults = () => {
    const scoredBreeds = dogBreeds.map(breed => {
      let score = 0;

      // Taille
      if (answers.size === 'any' || answers.size === breed.size) {
        score += 20;
      }

      // Niveau d'activité
      if (answers.activity === 'low' && (breed.exerciseNeeds === 'Faible' || breed.exerciseNeeds === 'Modéré')) {
        score += 15;
      } else if (answers.activity === 'moderate' && (breed.exerciseNeeds === 'Modéré' || breed.exerciseNeeds === 'Élevé')) {
        score += 15;
      } else if (answers.activity === 'high' && (breed.exerciseNeeds === 'Élevé' || breed.exerciseNeeds === 'Très Élevé')) {
        score += 15;
      }

      // Enfants
      if ((answers.children === 'young' || answers.children === 'older') && breed.goodWithChildren) {
        score += 20;
      } else if (answers.children === 'no') {
        score += 10;
      }

      // Toilettage
      if (answers.grooming === breed.groomingNeeds) {
        score += 15;
      }

      // Logement
      if (answers.living === 'apartment' && breed.size === 'Petit') {
        score += 15;
      } else if (answers.living === 'house_small' && (breed.size === 'Petit' || breed.size === 'Moyen')) {
        score += 15;
      } else if (answers.living === 'house_large') {
        score += 10;
      }

      // Expérience
      if (answers.experience === 'beginner' && breed.familyFriendly) {
        score += 10;
      } else if (answers.experience === 'expert') {
        score += 5;
      }

      // Objectif
      if (answers.purpose === 'family' && breed.familyFriendly) {
        score += 10;
      } else if (answers.purpose === 'sport' && breed.exerciseNeeds === 'Très Élevé') {
        score += 10;
      }

      return { breed, score };
    });

    const topBreeds = scoredBreeds
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.breed);

    setResults(topBreeds);
    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Vos races recommandées</h2>
            <p className="text-muted-foreground">
              Voici les races qui correspondent le mieux à votre profil
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {results.map((breed, index) => (
              <Card key={breed.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={breed.imageUrl}
                      alt={breed.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Badge className="mb-2">#{index + 1}</Badge>
                        <h3 className="text-xl font-bold">{breed.name}</h3>
                        <p className="text-sm text-muted-foreground">{breed.origin}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {breed.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{breed.size}</Badge>
                      <Badge variant="outline">{breed.weight}</Badge>
                      <Badge variant="outline">Exercice: {breed.exerciseNeeds}</Badge>
                      <Badge variant="outline">Toilettage: {breed.groomingNeeds}</Badge>
                    </div>

                    <Link href="/races">
                      <Button variant="outline" size="sm">
                        En savoir plus
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer le quiz
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full">
                Voir les annonces
              </Button>
            </Link>
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-6 w-6 text-[#D4A574]" />
            <h2 className="text-2xl font-bold">Trouvez votre race idéale</h2>
          </div>
          <p className="text-muted-foreground">
            Répondez à quelques questions pour découvrir les races qui vous correspondent
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} sur {quizQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {quizQuestions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option) => (
                <Button
                  key={option.value}
                  variant={answers[quizQuestions[currentQuestion].id] === option.value ? 'default' : 'outline'}
                  className="w-full justify-start text-left h-auto py-4"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>
            <Button
              onClick={handleNext}
              disabled={!answers[quizQuestions[currentQuestion].id]}
              className="flex-1"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Voir les résultats' : 'Suivant'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
