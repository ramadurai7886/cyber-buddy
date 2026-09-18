import { LanguageCode, TranslationSchema } from '../types/translations';
import { translations } from '../translations';

export interface ChatbotResponse {
  text: string;
  category: 'navigation' | 'security' | 'help' | 'system';
}

export const ChatbotService = {
  async processMessage(
    message: string,
    currentLanguage: LanguageCode,
    currentPage: string = '/'
  ): Promise<ChatbotResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const cleanMsg = message.trim().toLowerCase();

    if (!cleanMsg) {
      return {
        text: 'Please type your question or select one of the suggested prompts below.',
        category: 'help',
      };
    }

    // 1. Quick Exit Help
    if (cleanMsg.includes('quick exit') || cleanMsg.includes('hide screen') || cleanMsg.includes('weather')) {
      return {
        text: 'The Quick Exit button (visible in red at the top right) instantly hides Cyber Buddy and opens a discreet Weather screen. You can also press Escape or Alt+Q on your keyboard at any moment to trigger it.',
        category: 'security',
      };
    }

    // 2. Blackmail / Extortion / Image Misuse
    if (cleanMsg.includes('blackmail') || cleanMsg.includes('photo') || cleanMsg.includes('nude') || cleanMsg.includes('morph')) {
      return {
        text: 'Please take a calm breath. This is NOT your fault. Do NOT pay any ransom and do NOT delete messages. Go to Emergency Mode in the top bar to lock your screenshots and draft a formal cyber complaint under Sections 66E and 67A of the IT Act.',
        category: 'security',
      };
    }

    // 3. Counseling / Helplines
    if (cleanMsg.includes('counseling') || cleanMsg.includes('kiran') || cleanMsg.includes('helpline') || cleanMsg.includes('talk') || cleanMsg.includes('mental health')) {
      return {
        text: 'You can call the free 24/7 KIRAN Mental Health Helpline at 1800-599-0019 or the National Women Helpline at 181 anytime. Both are free, multilingual, and strictly confidential. Visit our "Wellness Corner" for guided breathing exercises.',
        category: 'help',
      };
    }

    // 4. Official Portal / 1930
    if (cleanMsg.includes('portal') || cleanMsg.includes('1930') || cleanMsg.includes('police') || cleanMsg.includes('cybercrime.gov.in')) {
      return {
        text: 'You can dial 1930 to speak directly with the Ministry of Home Affairs Cyber Crime Desk, or submit your complaint at cybercrime.gov.in. Cyber Buddy auto-generates the exact draft you need in Step 9 of Emergency Mode.',
        category: 'security',
      };
    }

    // 5. Page Explanation
    if (cleanMsg.includes('explain') || cleanMsg.includes('what is this') || cleanMsg.includes('how to use')) {
      if (currentPage.includes('/emergency')) {
        return {
          text: 'You are in Emergency Mode (No Login Required). This 14-step guide helps you explain what happened, gives emotional reassurance, connects you to free counseling, preserves your screenshots, and auto-drafts a complaint for cybercrime.gov.in.',
          category: 'navigation',
        };
      }
      if (currentPage.includes('/wellness')) {
        return {
          text: 'You are in the Mental Wellness Corner. Here you can practice guided 4-4-4 box breathing, read daily recovery affirmations, access free 24/7 government counselors, and read anonymous survivor stories.',
          category: 'navigation',
        };
      }
      return {
        text: 'Cyber Buddy is an AI-powered first-aid app for women cybercrime victims in India. From the home page, you can choose "Emergency Help" without logging in, or "Normal Mode" to track your saved cases and evidence vault.',
        category: 'navigation',
      };
    }

    // Fallback
    return {
      text: "I am here to support you. You can ask me how to use Emergency Mode, how to report blackmail or fake profiles, where to call for free counseling (KIRAN 1800-599-0019), or how the Quick Exit button protects your privacy.",
      category: 'help',
    };
  },
};
