"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlusCircle, ChevronLeft, ChevronRight, Repeat, X } from "lucide-react";

// Add this CSS to your globals.css or similar
const styles = `
  .flip-card-inner {
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }

  .flipped {
    transform: rotateY(180deg);
  }
`;

const FlashcardApp = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces",
    },
    {
      id: 2,
      question: "What is JSX?",
      answer:
        "A syntax extension for JavaScript that allows you to write HTML-like code in JavaScript",
    },
    {
      id: 3,
      question: "What is a Component?",
      answer:
        "A reusable piece of UI that can contain its own content, logic, and styling",
    },
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 300);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  const handleAddCard = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      setCards([
        ...cards,
        {
          id: cards.length + 1,
          question: newQuestion,
          answer: newAnswer,
        },
      ]);
      setNewQuestion("");
      setNewAnswer("");
      setDialogOpen(false);
    }
  };

  const handleDeleteCard = () => {
    const newCards = cards.filter((_, index) => index !== currentCardIndex);
    setCards(newCards);
    if (currentCardIndex >= newCards.length) {
      setCurrentCardIndex(Math.max(0, newCards.length - 1));
    }
    setIsFlipped(false);
  };

  // Add the styles to the document
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No flashcards yet</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Flashcard</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter question"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Input
                    id="answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Enter answer"
                  />
                </div>
                <Button onClick={handleAddCard} className="w-full">
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Flashcards</h1>
          <p className="text-muted-foreground mt-2">Click the card to flip</p>
        </div>

        {/* Flashcard */}
        <div
          className="relative h-80 perspective-[1000px]"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
            <Card
              className="flip-card-front cursor-pointer"
              style={{
                backgroundImage: `
                  radial-gradient(at 100% 100%, rgb(255, 255, 255) 0%, transparent 50%),
                  radial-gradient(at 0% 0%, rgb(255, 255, 255) 0%, transparent 50%),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 100% 100%, 100% 4px",
                boxShadow: `
                  inset 0 0 20px rgba(0, 0, 0, 0.05),
                  inset 0 0 80px rgba(255, 255, 255, 0.7)
                `,
              }}
            >
              <CardContent className="absolute inset-0 flex items-center justify-center p-6">
                <div className="absolute top-4 right-4 text-sm text-muted-foreground">
                  Question
                </div>
                <h2 className="text-2xl font-semibold text-center">
                  {cards[currentCardIndex].question}
                </h2>
              </CardContent>
            </Card>

            <Card
              className="flip-card-back cursor-pointer"
              style={{
                backgroundImage: `
                  radial-gradient(at 100% 100%, rgb(255, 255, 255) 0%, transparent 50%),
                  radial-gradient(at 0% 0%, rgb(255, 255, 255) 0%, transparent 50%),
                  linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
                `,
                backgroundSize: "100% 100%, 100% 100%, 100% 4px",
                boxShadow: `
                  inset 0 0 20px rgba(0, 0, 0, 0.05),
                  inset 0 0 80px rgba(255, 255, 255, 0.7)
                `,
              }}
            >
              <CardContent className="absolute inset-0 flex items-center justify-center p-6">
                <div className="absolute top-4 right-4 text-sm text-muted-foreground">
                  Answer
                </div>
                <p className="text-xl text-center">
                  {cards[currentCardIndex].answer}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-muted-foreground px-4">
            {currentCardIndex + 1} / {cards.length}
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Flip</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleDeleteCard}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Add New Card Dialog */}
        <div className="flex justify-center">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Card
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Flashcard</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter question"
                    spellCheck={"true"}
                    autoComplete={"false"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Input
                    id="answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Enter answer"
                    spellCheck={"true"}
                    autoComplete={"false"}
                  />
                </div>
                <Button onClick={handleAddCard} className="w-full">
                  Add Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;
