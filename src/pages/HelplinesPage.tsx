import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Heart, ExternalLink, ShieldCheck, Scale, Globe, FileCheck, Info, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { GOVERNMENT_HELPLINES, GOVERNMENT_PORTALS, PLATFORM_TAKEDOWNS, INDIAN_CYBER_LAWS } from '../services/emergencyService';

export const HelplinesPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>24/7 Verified Helplines Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Emergency & Counseling Helplines
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            All helplines listed here are free of cost, run by the Government of India or premier recognized organizations, and provide confidential assistance.
          </p>
        </div>

        {/* Priority Quick Call Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-700 text-white shadow-lg space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider opacity-80">Police & Rescue</span>
            <div className="text-3xl font-extrabold font-mono">112 / 181</div>
            <p className="text-xs opacity-90">National Emergency & Women Helpline</p>
            <div className="pt-2">
              <a href="tel:181" className="inline-block w-full">
                <Button variant="secondary" size="sm" className="w-full text-rose-700 bg-white font-bold">
                  Call 181 Now
                </Button>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyber-600 to-teal-700 text-white shadow-lg space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider opacity-80">Cyber Crime Helpline</span>
            <div className="text-3xl font-extrabold font-mono">1930</div>
            <p className="text-xs opacity-90">Ministry of Home Affairs Cyber Desk</p>
            <div className="pt-2">
              <a href="tel:1930" className="inline-block w-full">
                <Button variant="secondary" size="sm" className="w-full text-teal-800 bg-white font-bold">
                  Call 1930 Now
                </Button>
              </a>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-lg space-y-2">
            <span className="text-xs uppercase font-mono tracking-wider opacity-80">Mental Health Counseling</span>
            <div className="text-2xl font-extrabold font-mono">1800-599-0019</div>
            <p className="text-xs opacity-90">KIRAN Toll-Free 24x7 Multilingual</p>
            <div className="pt-2">
              <a href="tel:18005990019" className="inline-block w-full">
                <Button variant="secondary" size="sm" className="w-full text-indigo-800 bg-white font-bold">
                  Call KIRAN Now
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVERNMENT_HELPLINES.map(item => (
            <Card key={item.id} className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500">{item.organization}</p>
                  </div>
                  <Badge variant={item.category === 'mental_health' ? 'cyber' : 'error'}>
                    {item.timing}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="font-mono text-base font-bold text-cyber-600 dark:text-cyber-400">
                  {item.number}
                </span>
                <a href={`tel:${item.number.replace(/[^0-9]/g, '')}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
                    className="font-bold"
                  >
                    Call Helpline
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* Portals */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Official Online Portals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GOVERNMENT_PORTALS.map((portal, idx) => (
              <Card key={idx} className="p-5 flex flex-col justify-between space-y-2">
                <div>
                  <Badge variant="neutral">{portal.tag}</Badge>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                    {portal.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {portal.description}
                  </p>
                </div>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyber-600 dark:text-cyber-400 hover:underline"
                >
                  Visit Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Takedowns & Image Removal */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-500/10 text-cyber-600 dark:text-cyber-400 text-xs font-bold mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Direct Intermediary Grievance & Content Removal</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Platform Abuse Forms & Hash-Sharing Tools
            </h2>
            <p className="text-xs text-slate-500">
              Direct official reporting channels to remove fake accounts, abusive messages, and intimate photos without filing police complaints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLATFORM_TAKEDOWNS.map((item, idx) => (
              <Card key={idx} className="p-5 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                      {item.platform}
                    </span>
                    <Badge variant="cyber">{item.badge}</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button variant="secondary" size="sm" className="w-full text-xs font-semibold" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      {item.action}
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Know Your Legal Rights: Indian Cyber Law */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold mb-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Indian Legal Framework</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Know Your Rights: Indian Penal & Cyber Laws
            </h2>
            <p className="text-xs text-slate-500">
              Indian law provides stringent penalties against blackmail, non-consensual image sharing, and cyberstalking against women.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INDIAN_CYBER_LAWS.map((law, idx) => (
              <Card key={idx} className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                      {law.section}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {law.title}
                    </h3>
                    <p className="text-[11px] text-slate-400">{law.act}</p>
                  </div>
                  <Badge variant="error">Punishable</Badge>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/15 text-xs text-rose-900 dark:text-rose-200 font-medium">
                  ⚖️ Penalty: {law.penalty}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {law.explanation}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/5 p-2 rounded-lg">
                  <strong>💡 Survivor Tip:</strong> {law.victimTip}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Frequent Concerns / Rights FAQ */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 pb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions & Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <Card className="p-5 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                Can I report anonymously without my family finding out?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes. Under the National Cyber Crime Reporting Portal (cybercrime.gov.in), you can choose <strong>"Report Anonymously"</strong> for crimes involving women or children. You are not forced to disclose your identity to the public or family.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                I shared the pictures voluntarily in the past. Do I still have legal rights?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>YES, absolutely.</strong> Consensual sharing in a private relationship does NOT grant anyone the right to forward, threaten, or publish those images. Non-consensual forwarding is a severe crime under Section 66E and 67A of the IT Act.
              </p>
            </Card>

            <Card className="p-5 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                What is the 24-Hour Intermediary Rule?
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Under Rule 3(2)(b) of the Information Technology Rules, 2021, platforms like Meta, WhatsApp, Instagram, and X are legally obligated to remove non-consensual sexually explicit or private bodily imagery within <strong>24 hours</strong> of complaint receipt.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
