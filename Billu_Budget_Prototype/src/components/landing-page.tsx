import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  Shield, 
  Smartphone, 
  TrendingUp, 
  Target,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  userName?: string;
}

export function LandingPage({ onGetStarted, userName }: LandingPageProps) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const features = [
    {
      icon: Smartphone,
      title: 'Quick Add Expenses',
      description: 'Add transactions in seconds with smart suggestions and preset amounts'
    },
    {
      icon: TrendingUp,
      title: 'Smart Insights',
      description: 'Understand spending patterns with beautiful charts and analytics'
    },
    {
      icon: Target,
      title: 'Savings Goals',
      description: 'Set goals and get personalized suggestions to reach them faster'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays on your device. Cloud sync is optional and encrypted'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Greeting */}
          {userName && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span>{greeting}, {userName}!</span>
            </div>
          )}

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Small savings,
              <br />
              big freedom.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take control of your finances with Billu Budget. A calm, secure, and intelligent expense tracker that grows with you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={onGetStarted}
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
            >
              Learn More
            </Button>
          </div>

          {/* Daily Quote */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border-primary/10 max-w-md mx-auto">
            <blockquote className="text-center">
              <p className="text-foreground italic">"A budget is telling your money where to go instead of wondering where it went."</p>
              <footer className="text-sm text-muted-foreground mt-2">— Dave Ramsey</footer>
            </blockquote>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to manage money
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple tools that help you understand, control, and optimize your spending habits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 bg-white/70 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>No ads, ever</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}