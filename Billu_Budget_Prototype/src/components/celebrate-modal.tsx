import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { 
  X, 
  Trophy, 
  Target, 
  TrendingUp, 
  Gift, 
  Share2,
  Download
} from 'lucide-react';

interface CelebrationProps {
  type: 'goal_completed' | 'savings_milestone' | 'streak_achievement' | 'budget_under';
  title: string;
  message: string;
  amount?: number;
  goalName?: string;
  onClose: () => void;
  onShare?: () => void;
}

export function CelebrateModal({ 
  type, 
  title, 
  message, 
  amount, 
  goalName, 
  onClose, 
  onShare 
}: CelebrationProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = () => {
    switch (type) {
      case 'goal_completed':
        return Trophy;
      case 'savings_milestone':
        return Target;
      case 'streak_achievement':
        return TrendingUp;
      case 'budget_under':
        return Gift;
      default:
        return Trophy;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'goal_completed':
        return 'from-yellow-400 to-orange-500';
      case 'savings_milestone':
        return 'from-green-400 to-emerald-500';
      case 'streak_achievement':
        return 'from-blue-400 to-indigo-500';
      case 'budget_under':
        return 'from-purple-400 to-pink-500';
      default:
        return 'from-yellow-400 to-orange-500';
    }
  };

  const Icon = getIcon();
  const gradientColors = getColors();

  // Confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    rotation: Math.random() * 360,
    color: ['#FFC857', '#49C07B', '#0FA3B1', '#0B2545'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: `${particle.x}vw`, 
                y: '-10vh', 
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
                y: '110vh', 
                rotate: particle.rotation,
                opacity: 0
              }}
              transition={{ 
                duration: 3, 
                delay: particle.delay,
                ease: 'easeOut'
              }}
              className="absolute w-2 h-2 rounded-sm"
              style={{ backgroundColor: particle.color }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto bg-white relative overflow-hidden">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors} opacity-5`} />
          
          {/* Close Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="p-8 text-center space-y-6 relative">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${gradientColors} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="text-muted-foreground leading-relaxed">{message}</p>
              
              {amount && (
                <div className="py-4">
                  <p className="text-3xl font-bold bg-gradient-to-r from-success to-accent bg-clip-text text-transparent">
                    ₹{amount.toLocaleString()}
                  </p>
                  {goalName && (
                    <p className="text-sm text-muted-foreground mt-1">
                      towards {goalName}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              {onShare && (
                <Button variant="outline" onClick={onShare} className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              )}
              <Button onClick={onClose} className="flex-1">
                Continue
              </Button>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm">
                <Trophy className="w-4 h-4" />
                <span>Achievement Unlocked!</span>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

// Preset celebration configurations
export const celebrationPresets = {
  goalCompleted: (goalName: string, amount: number) => ({
    type: 'goal_completed' as const,
    title: '🎉 Goal Achieved!',
    message: `Congratulations! You've successfully saved for your ${goalName}. This is a major milestone in your financial journey.`,
    amount,
    goalName
  }),
  
  savingsMilestone: (amount: number) => ({
    type: 'savings_milestone' as const,
    title: '💰 Savings Milestone!',
    message: `Amazing! You've reached a new savings milestone. Keep up the great work!`,
    amount
  }),
  
  streakAchievement: (days: number) => ({
    type: 'streak_achievement' as const,
    title: '🔥 Tracking Streak!',
    message: `You've been consistently tracking your expenses for ${days} days straight. Great habit!`
  }),
  
  budgetUnder: (savedAmount: number) => ({
    type: 'budget_under' as const,
    title: '🎯 Budget Champion!',
    message: `You came in under budget this month! You saved an extra amount that can go towards your goals.`,
    amount: savedAmount
  })
};