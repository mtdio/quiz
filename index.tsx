'use client'

import { useState } from "react"
import { ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Question {
  id: number
  text: string
  options: {
    tidio: string
    intercom: string
  }
  results: {
    tidio: number
    intercom: number
  }
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which response do you prefer for 'I'm having a problem checking out'?",
    options: {
      tidio: "I'm sorry to hear you're having trouble checking out. Let's try to resolve this issue for you. Here are some steps you can try:\n\n- Hard refresh your browser\n- Clear the cache from your browsing history\n- Try using a different browser\n\nIf these steps don't solve the problem, please contact our customer service team for further assistance.",
      intercom: "If you're having trouble checking out during the purchase process, we recommend trying these troubleshooting steps:\n\n- Hard refresh your browser\n- Clear your browsing history cache\n- Try using a different browser\n\nIf these steps don't resolve the issue, we're here to help. What specific error or issue are you encountering during the checkout process?"
    },
    results: {
      tidio: 75,
      intercom: 25
    }
  },
  {
    id: 2,
    text: "Which response do you prefer for 'How can I get samples?'",
    options: {
      tidio: "Great question! I'd be happy to help you get some samples.\n\nWe offer free sample packs that you can easily order directly from our website. Here's what you need to know:\n\n- The sample pack includes several product samples\n- It's completely free with standard shipping (5-7 business days)\n- You can order it directly from our website\n\nIs there anything else you'd like to know about our samples or products?",
      intercom: "We offer a free sample pack that you can order directly from our website. The sample pack includes several product samples showcasing the quality and features. You can order your free sample pack from our website. The samples are shipped with an estimated delivery time of 5-7 business days."
    },
    results: {
      tidio: 78,
      intercom: 22
    }
  },
  {
    id: 3,
    text: "Which response do you prefer for 'Do you have free shipping options?'",
    options: {
      tidio: "Yes, we do offer free shipping options! Here's what you need to know:\n\n- Orders of $75 or more automatically qualify for free shipping\n- This applies to orders shipped within the USA (excluding Alaska and Hawaii)\n- Free shipping is through USPS and takes 5-7 business days\n\nIs there anything else you'd like to know about our shipping options?",
      intercom: "Yes, we offer free shipping options! For orders over $75.00, you'll automatically qualify for free shipping. This free shipping option is typically Standard Shipping, which takes 5-7 business days. If you need your order faster, we also have expedited shipping options available at checkout."
    },
    results: {
      tidio: 68,
      intercom: 32
    }
  },
  {
    id: 4,
    text: "Which response do you prefer for 'I'm trying to do a white imprint, how do I upload the art for that?'",
    options: {
      tidio: "Great question! When it comes to uploading art for a white imprint, you have a couple of options:\n\n1. Upload your artwork as is, with the white elements already in place\n2. Modify the text or elements to be white in your original design file\n3. Leave a detailed note in the 'Notes for our designers' text box\n\nIs there anything else you'd like to know about uploading your artwork?",
      intercom: "To upload art for a white imprint, simply upload your design file to our website. We accept various file types, including PNG, SVG, PDF, JPG, AI, and PSD. For the best results, we recommend using vector files (SVG) as they allow for easy resizing without quality loss. After uploading, you can leave specific instructions in the 'Notes To Designers' section."
    },
    results: {
      tidio: 62,
      intercom: 38
    }
  },
  {
    id: 5,
    text: "Which response do you prefer for 'What does the option pre-cut mean? This is my first time creating a transfer?'",
    options: {
      tidio: "Welcome to the world of transfers! I'd be happy to explain the 'pre-cut' option for you.\n\nWhen you're ordering by size, you have the option to choose 'pre-cut'. This means that instead of receiving your transfers on a single sheet, each individual transfer will arrive already cut out and ready to use.\n\nIt's a convenient option, especially for beginners, as it saves you the step of cutting out the transfers yourself.\n\nIs there anything else you'd like to know?",
      intercom: "When creating a transfer, the pre-cut option means that instead of receiving your transfers on a sheet, each individual transfer will arrive pre-cut and ready to use. This is an order option available when placing an order by size on our website. By selecting the 'pre-cut' option before checking out, your transfers will be cut to size and ready for immediate application when they arrive."
    },
    results: {
      tidio: 66,
      intercom: 34
    }
  }
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (value: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let tidioScore = 0
    Object.entries(selectedAnswers).forEach(([_, value]) => {
      if (value === 'tidio') tidioScore++
    })
    return (tidioScore / questions.length) * 100
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center border-b">
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">4.7 (1552+ reviews)</span>
        </div>
        <CardTitle className="text-3xl font-bold">AI Customer Support Quiz</CardTitle>
        <CardDescription>
          Help us understand your chatbot preferences by comparing different response styles
        </CardDescription>
      </CardHeader>

      {!showResults ? (
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-lg font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="text-xl font-bold">{questions[currentQuestion].text}</div>
            <RadioGroup
              value={selectedAnswers[currentQuestion]}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              <div className="space-y-4">
                <Label className="space-y-2">
                  <RadioGroupItem value="tidio" className="peer sr-only" />
                  <Card className="p-4 cursor-pointer border-2 peer-aria-checked:border-primary">
                    <div className="whitespace-pre-wrap">{questions[currentQuestion].options.tidio}</div>
                  </Card>
                </Label>
                <Label className="space-y-2">
                  <RadioGroupItem value="intercom" className="peer sr-only" />
                  <Card className="p-4 cursor-pointer border-2 peer-aria-checked:border-primary">
                    <div className="whitespace-pre-wrap">{questions[currentQuestion].options.intercom}</div>
                  </Card>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold">Quiz Complete!</div>
            <div className="text-lg">
              Based on your answers, you prefer responses that are more{' '}
              {calculateScore() > 50 ? 'personal and engaging' : 'direct and concise'}.
            </div>
            <div className="flex justify-center gap-8 text-lg">
              <div>
                <div className="font-bold">Tidio-style</div>
                <div>{Math.round(calculateScore())}%</div>
              </div>
              <div>
                <div className="font-bold">Intercom-style</div>
                <div>{Math.round(100 - calculateScore())}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="border-t p-6">
        {!showResults && (
          <Button
            className="w-full"
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Next Question <ChevronRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'Show Results'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}