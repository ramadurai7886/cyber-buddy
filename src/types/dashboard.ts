export interface SecurityActivity {
  id: string;
  target: string;
  type: 'SAST' | 'DAST' | 'SCA' | 'Secret Scan' | 'API Guardian';
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Clean';
  status: 'Fixed' | 'Investigating' | 'Blocked' | 'Monitoring';
  timestamp: string;
}

export interface SecurityMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  actionKey: string;
}
