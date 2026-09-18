import React, { useState, useEffect } from 'react';
import {
  Heart,
  PhoneCall,
  ExternalLink,
  Wind,
  Smile,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Plus,
  Volume2,
  VolumeX,
  Eye,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { GOVERNMENT_HELPLINES, GOVERNMENT_PORTALS } from '../../services/emergencyService';
import { calmingAudio } from '../../utils/audioChime';
import { ShareStoryModal } from './ShareStoryModal';
import { SurvivorStory } from '../../types/emergency';
import { StorageService } from '../../services/storageService';

const DAILY_AFFIRMATIONS = [
  "You survived the hardest moment. You are safe now, and healing is your right.",
  "This is NOT your fault. What happened reflects the criminal's behavior, not your dignity.",
  "You have immense courage. Reaching out and taking action is true strength.",
  "Your peace of mind and digital freedom are sacred. You are not alone.",
  "Every storm passes. Law enforcement and counselors are standing with you.",
];

const INITIAL_STORIES: SurvivorStory[] = [
  {
    id: 'story_1',
    author: "Riya M., 24, Bengaluru",
    story: "Someone created a fake profile with my pictures on Instagram and harassed my friends. I felt paralyzed with shame. Cyber Buddy guided me to keep the URLs, call 1930, and talk to an iCall counselor. Within 48 hours the account was taken down. Don't suffer in silence.",
    tag: "Fake Profile & Impersonation",
    timestamp: 'Verified Survivor',
    likesCount: 24,
  },
  {
    id: 'story_2',
    author: "Pooja S., 29, Delhi NCR",
    story: "An ex-colleague threatened to circulate private screenshots if I didn't pay. Cyber Buddy showed me the IT Act provisions and told me 'Never pay'. I filed a complaint with the cyber cell and called the KIRAN helpline for panic attacks. Today he is facing prosecution.",
    tag: "Blackmail & Extortion",
    timestamp: 'Verified Survivor',
    likesCount: 38,
  },
  {
    id: 'story_3',
    author: "Ananya K., 21, Pune",
    story: "Continuous stalking on WhatsApp and Telegram made me afraid to look at my phone. The 181 Women Helpline team gave me legal counseling and local police intervened. You are stronger than any cyberbully.",
    tag: "Cyberstalking",
    timestamp: 'Verified Survivor',
    likesCount: 19,
  },
];

const GROUNDING_STEPS = [
  {
    count: 5,
    sense: 'SEE',
    title: '5 Things You Can See',
    instruction: 'Look around your surroundings. Notice 5 separate items or colors without judgment.',
    examples: ['A window or patch of sky', 'A pattern on your clothes', 'A pen, water bottle, or phone', 'Your own hands and fingers', 'Shadow or light on the wall'],
  },
  {
    count: 4,
    sense: 'TOUCH',
    title: '4 Things You Can Physically Feel',
    instruction: 'Bring your awareness to physical tactile sensations.',
    examples: ['The solid floor supporting your feet', 'The texture of your shirt or dupatta', 'The cool, smooth surface of your phone', 'Your hands resting gently together'],
  },
  {
    count: 3,
    sense: 'HEAR',
    title: '3 Things You Can Hear',
    instruction: 'Tune into background noises that your brain normally filters out.',
    examples: ['A ceiling fan or AC humming', 'Distant birds, vehicles, or rustling leaves', 'The soft sound of your own gentle breathing'],
  },
  {
    count: 2,
    sense: 'SMELL',
    title: '2 Things You Can Smell',
    instruction: 'Inhale gently through your nose and notice any faint scent.',
    examples: ['Soap or lotion on your hands', 'Fresh air or ambient room scent', 'Or take two slow, fragrant deep breaths'],
  },
  {
    count: 1,
    sense: 'TASTE',
    title: '1 Thing You Can Taste',
    instruction: 'Notice any taste in your mouth, or relax your jaw.',
    examples: ['A sip of cool water', 'Lingering mint or tea', 'Swallow gently and unclench your teeth'],
  },
];

export const MentalWellnessCorner: React.FC = () => {
  // Active somatic tool toggle
  const [activeTool, setActiveTool] = useState<'breathing' | 'grounding'>('breathing');

  // Grounding exercise state (5-4-3-2-1)
  const [groundingIndex, setGroundingIndex] = useState(0);
  const [groundingCompleted, setGroundingCompleted] = useState(false);

  // Breathing exercise state (4s Inhale, 4s Hold, 4s Exhale, 4s Rest)
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathingSeconds, setBreathingSeconds] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Journal state
  const [journalEntry, setJournalEntry] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  // Stories state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [stories, setStories] = useState<SurvivorStory[]>(() => {
    const userStories = StorageService.getItem<SurvivorStory[]>('cyberbuddy_user_stories', []);
    return [...userStories, ...INITIAL_STORIES];
  });

  const affirmation = DAILY_AFFIRMATIONS[new Date().getDay() % DAILY_AFFIRMATIONS.length];

  useEffect(() => {
    if (!isBreathingActive) return;

    // Play tone on phase entry if sound not muted
    if (!isSoundMuted) {
      calmingAudio.playBreathTone(breathingPhase);
    }

    const interval = setInterval(() => {
      setBreathingSeconds(prev => {
        if (prev <= 1) {
          setBreathingPhase(currentPhase => {
            switch (currentPhase) {
              case 'Inhale': return 'Hold';
              case 'Hold': return 'Exhale';
              case 'Exhale': return 'Rest';
              case 'Rest': return 'Inhale';
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase, isSoundMuted]);

  const handleSaveJournal = () => {
    if (!journalEntry.trim()) return;
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 3000);
  };

  const handleNextGrounding = () => {
    if (groundingIndex < GROUNDING_STEPS.length - 1) {
      setGroundingIndex(prev => prev + 1);
      if (!isSoundMuted) calmingAudio.playCalmChime(432 + (groundingIndex + 1) * 30, 1.5);
    } else {
      setGroundingCompleted(true);
      if (!isSoundMuted) calmingAudio.playCalmChime(528, 2.5);
    }
  };

  const handleResetGrounding = () => {
    setGroundingIndex(0);
    setGroundingCompleted(false);
    if (!isSoundMuted) calmingAudio.playCalmChime(432, 1.2);
  };

  const handleStoryAdded = (newStory: SurvivorStory) => {
    setStories(prev => [newStory, ...prev]);
  };

  const handleLikeStory = (id: string) => {
    setStories(prev =>
      prev.map(s => (s.id === id ? { ...s, likesCount: (s.likesCount || 0) + 1 } : s))
    );
  };

  const currentGrounding = GROUNDING_STEPS[groundingIndex];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-500/10 via-brand-500/10 to-cyber-500/10 border border-rose-500/20 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-xs font-bold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Compassionate Psychological Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Mental Wellness Corner
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              When someone targets you online, the fear, panic, and self-blame are overwhelming. Your emotional safety is just as important as legal reporting. Take a deep breath — we are with you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[220px]">
            <a href="tel:18005990019">
              <Button
                variant="primary"
                size="md"
                leftIcon={<PhoneCall className="w-4 h-4" />}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold w-full"
              >
                Call KIRAN (1800-599-0019)
              </Button>
            </a>
            <a href="tel:181">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<PhoneCall className="w-4 h-4 text-rose-500" />}
                className="w-full"
              >
                Women Helpline 181
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Daily Affirmation */}
      <Card className="border-cyber-500/30 bg-cyber-500/5 p-6 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-bold tracking-wider text-cyber-600 dark:text-cyber-400">
          <Sparkles className="w-4 h-4" /> Daily Recovery Affirmation
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 italic max-w-2xl mx-auto">
          "{affirmation}"
        </p>
      </Card>

      {/* Somatic Calming Tools & Private Safe Journal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col justify-between space-y-4 relative">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setIsSoundMuted(!isSoundMuted)}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title={isSoundMuted ? 'Unmute therapeutic chimes' : 'Mute sound'}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyber-500" />}
          </button>

          {/* Exercise Type Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-xs mx-auto text-xs font-bold w-full">
            <button
              type="button"
              onClick={() => setActiveTool('breathing')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeTool === 'breathing'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              4-4-4 Breathing
            </button>
            <button
              type="button"
              onClick={() => setActiveTool('grounding')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                activeTool === 'grounding'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              5-4-3-2-1 Grounding
            </button>
          </div>

          {/* VIEW 1: 4-4-4 Box Breathing */}
          {activeTool === 'breathing' ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
              <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <Wind className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  Guided 4-4-4 Box Breathing
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-xs">
                Box breathing synchronizes the vagus nerve to reduce heart palpitation and panic in under 2 minutes.
              </p>

              {/* Animated Circle */}
              <div className="relative w-40 h-40 flex items-center justify-center my-2">
                <div
                  className={`absolute inset-0 rounded-full border-4 border-cyber-500 transition-all duration-1000 ${
                    isBreathingActive
                      ? breathingPhase === 'Inhale'
                        ? 'scale-110 border-cyber-400 bg-cyber-500/10'
                        : breathingPhase === 'Hold'
                        ? 'scale-110 border-brand-500 bg-brand-500/10'
                        : breathingPhase === 'Exhale'
                        ? 'scale-90 border-amber-500 bg-amber-500/10'
                        : 'scale-95 border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                />
                <div className="flex flex-col items-center z-10">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    {isBreathingActive ? breathingPhase : 'Ready'}
                  </span>
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-slate-50 my-1">
                    {isBreathingActive ? breathingSeconds : '4'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {isBreathingActive ? 'Breathe rhythmically' : 'Click to begin'}
                  </span>
                </div>
              </div>

              <Button
                variant={isBreathingActive ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => {
                  const next = !isBreathingActive;
                  setIsBreathingActive(next);
                  if (next && !isSoundMuted) calmingAudio.playBreathTone('Inhale');
                }}
                className="font-bold"
              >
                {isBreathingActive ? 'Stop Breathing' : 'Start Box Breathing'}
              </Button>
            </div>
          ) : (
            /* VIEW 2: 5-4-3-2-1 Sensory Grounding Tool */
            <div className="flex flex-col justify-between space-y-4 my-auto">
              {groundingCompleted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      You are Safe & Grounded in the Present
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                      You brought your mind back into physical reality. The online threat is separate from your physical body in this room right now.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleResetGrounding}
                    leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                    className="font-semibold"
                  >
                    Repeat Grounding Exercise
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in">
                  {/* Step counter dots */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      {GROUNDING_STEPS.map((step, idx) => (
                        <div
                          key={idx}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            idx === groundingIndex
                              ? 'bg-rose-500 ring-2 ring-rose-500/30 w-5'
                              : idx < groundingIndex
                              ? 'bg-emerald-500'
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
                      STEP {groundingIndex + 1} OF 5: {currentGrounding.sense}
                    </span>
                  </div>

                  {/* Current Step Instruction */}
                  <div className="space-y-1 text-left">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-rose-500" />
                      {currentGrounding.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {currentGrounding.instruction}
                    </p>
                  </div>

                  {/* Sensory Examples to guide awareness */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-left">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Examples to identify around you:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {currentGrounding.examples.map((ex, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      Take your time. There is no rush.
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleNextGrounding}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="font-bold bg-rose-600 hover:bg-rose-700 text-white"
                    >
                      {groundingIndex === GROUNDING_STEPS.length - 1 ? 'Finish Grounding' : 'Next Sense'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Private Safe Journal */}
        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <BookOpen className="w-4 h-4 text-cyber-500" />
                Private Emotion Journal
              </h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
                <Lock className="w-3 h-3" /> Stays strictly on device
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Writing down your thoughts helps release emotional trauma. Nobody else can see this.
            </p>
          </div>

          <textarea
            rows={5}
            value={journalEntry}
            onChange={e => setJournalEntry(e.target.value)}
            placeholder="Write how you are feeling right now... (E.g. I felt so anxious when I saw the message, but I know I have support now.)"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyber-500 resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-emerald-500 font-medium">
              {journalSaved ? 'Saved locally on your device ✓' : ''}
            </span>
            <Button variant="primary" size="sm" onClick={handleSaveJournal}>
              Save Thought
            </Button>
          </div>
        </Card>
      </div>

      {/* Free Government Counseling Helplines Directory */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Free Government Counseling & Support Helplines
          </h3>
          <p className="text-xs text-slate-500">
            All numbers below are verified, free of cost, and strictly confidential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GOVERNMENT_HELPLINES.map(item => (
            <Card key={item.id} className="p-5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{item.organization}</p>
                  </div>
                  <Badge variant={item.category === 'mental_health' ? 'cyber' : item.category === 'women_safety' ? 'error' : 'success'}>
                    {item.timing}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-cyber-600 dark:text-cyber-400">
                  {item.number}
                </span>
                <a href={`tel:${item.number.replace(/[^0-9]/g, '')}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
                    className="text-xs py-1.5"
                  >
                    Call Now
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Government Support Portals */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Official Government Portals & Initiatives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GOVERNMENT_PORTALS.map((portal, idx) => (
            <Card key={idx} className="p-4 flex flex-col justify-between space-y-2">
              <div>
                <Badge variant="neutral" className="mb-2">{portal.tag}</Badge>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {portal.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  {portal.description}
                </p>
              </div>
              <a
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyber-600 dark:text-cyber-400 hover:underline"
              >
                Visit Portal <ExternalLink className="w-3 h-3" />
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Anonymous Survivor Recovery Stories with Share Button */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Smile className="w-4 h-4 text-emerald-500" />
              Stories of Recovery & Strength
            </h3>
            <p className="text-xs text-slate-500">
              Real experiences of Indian women who stood up to cyber harassment and reclaimed their peace.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsShareModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5 text-cyber-500" />}
          >
            Share Your Story Anonymously
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stories.map(story => (
            <Card key={story.id} className="p-5 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="cyber">{story.tag}</Badge>
                  <button
                    type="button"
                    onClick={() => handleLikeStory(story.id)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>{story.likesCount || 0}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{story.story}"
                </p>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 text-right pt-2 border-t border-slate-100 dark:border-slate-800">
                — {story.author}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Story Modal */}
      <ShareStoryModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onStoryAdded={handleStoryAdded}
      />
    </div>
  );
};
