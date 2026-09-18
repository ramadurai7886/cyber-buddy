import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Smile, Shield, Check, Heart } from 'lucide-react';
import { SurvivorStory } from '../../types/emergency';
import { StorageService } from '../../services/storageService';

export interface ShareStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryAdded: (story: SurvivorStory) => void;
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({
  isOpen,
  onClose,
  onStoryAdded,
}) => {
  const [alias, setAlias] = useState('');
  const [tag, setTag] = useState('Image Misuse & Blackmail');
  const [storyText, setStoryText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText.trim()) return;

    const newStory: SurvivorStory = {
      id: `story_${Date.now()}`,
      author: alias.trim() ? `${alias.trim()} (Anonymous)` : 'A Brave Survivor (Anonymous)',
      story: storyText.trim(),
      tag,
      timestamp: 'Just now',
      likesCount: 1,
    };

    // Save to local storage community stories
    const saved = StorageService.getItem<SurvivorStory[]>('cyberbuddy_user_stories', []);
    StorageService.setItem('cyberbuddy_user_stories', [newStory, ...saved]);

    onStoryAdded(newStory);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Story Anonymously" maxWidth="md">
      {submitted ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <Check className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Thank You for Your Bravery
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Your anonymous story will encourage other women facing cyber intimidation to know they are not alone.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
          <div className="p-3 rounded-xl bg-cyber-500/10 border border-cyber-500/20 flex items-center gap-2 text-cyber-700 dark:text-cyber-300">
            <Shield className="w-4 h-4 shrink-0 text-cyber-500" />
            <span>100% Anonymous. No IP, email, or real identity is ever attached.</span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Display Alias / City (Optional)
            </label>
            <input
              type="text"
              value={alias}
              onChange={e => setAlias(e.target.value)}
              placeholder="e.g. Survivor, 26, Delhi or leave blank"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Category of Incident
            </label>
            <select
              value={tag}
              onChange={e => setTag(e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
            >
              <option value="Image Misuse & Blackmail">Image Misuse & Blackmail</option>
              <option value="Fake Profile / Impersonation">Fake Profile / Impersonation</option>
              <option value="Cyberstalking & Tracking">Cyberstalking & Tracking</option>
              <option value="Abusive Messages & Bullying">Abusive Messages & Bullying</option>
              <option value="Financial Extortion Scam">Financial Extortion Scam</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Your Message of Hope & How You Handled It
            </label>
            <textarea
              rows={4}
              value={storyText}
              onChange={e => setStoryText(e.target.value)}
              placeholder="Share what happened, how calling 1930/counselor helped, and what advice you would give to another woman in panic..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyber-500 resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!storyText.trim()}
              leftIcon={<Heart className="w-3.5 h-3.5" />}
              className="font-bold"
            >
              Publish Anonymously
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
