import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Wind,
  Droplets,
  Compass,
  Search,
  Calendar,
  Shield,
  Calculator as CalcIcon,
  RotateCcw,
  Sun,
  CloudRain,
  CloudLightning,
  Eye,
  Settings,
  X,
  Check,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useDiscreet, DiscreetModel } from '../context/DiscreetContext';

interface CityWeather {
  city: string;
  country: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  wind: number;
  pressure: number;
  aqi: number;
  aqiLabel: string;
  hourly: { time: string; temp: number; icon: 'sun' | 'cloud' | 'rain' }[];
  daily: { day: string; high: number; low: number; condition: string }[];
}

const CITIES_DATA: Record<string, CityWeather> = {
  'New Delhi': {
    city: 'New Delhi',
    country: 'India',
    temp: 29,
    condition: 'Partly Cloudy',
    high: 34,
    low: 21,
    humidity: 48,
    wind: 14,
    pressure: 1012,
    aqi: 86,
    aqiLabel: 'Moderate',
    hourly: [
      { time: 'Now', temp: 29, icon: 'cloud' },
      { time: '14:00', temp: 31, icon: 'sun' },
      { time: '16:00', temp: 33, icon: 'sun' },
      { time: '18:00', temp: 30, icon: 'cloud' },
      { time: '20:00', temp: 27, icon: 'cloud' },
      { time: '22:00', temp: 24, icon: 'cloud' },
    ],
    daily: [
      { day: 'Today', high: 34, low: 21, condition: 'Partly Cloudy' },
      { day: 'Tomorrow', high: 35, low: 22, condition: 'Sunny & Warm' },
      { day: 'Thursday', high: 33, low: 20, condition: 'Clear Sky' },
      { day: 'Friday', high: 31, low: 19, condition: 'Passing Clouds' },
      { day: 'Saturday', high: 32, low: 20, condition: 'Sunny' },
      { day: 'Sunday', high: 30, low: 19, condition: 'Scattered Showers' },
    ],
  },
  'Mumbai': {
    city: 'Mumbai',
    country: 'India',
    temp: 32,
    condition: 'Humid & Sunny',
    high: 34,
    low: 26,
    humidity: 78,
    wind: 18,
    pressure: 1009,
    aqi: 64,
    aqiLabel: 'Satisfactory',
    hourly: [
      { time: 'Now', temp: 32, icon: 'sun' },
      { time: '14:00', temp: 34, icon: 'sun' },
      { time: '16:00', temp: 33, icon: 'sun' },
      { time: '18:00', temp: 31, icon: 'cloud' },
      { time: '20:00', temp: 29, icon: 'cloud' },
      { time: '22:00', temp: 28, icon: 'cloud' },
    ],
    daily: [
      { day: 'Today', high: 34, low: 26, condition: 'Humid' },
      { day: 'Tomorrow', high: 33, low: 25, condition: 'Hazy Sun' },
      { day: 'Thursday', high: 32, low: 25, condition: 'Coastal Breeze' },
      { day: 'Friday', high: 33, low: 26, condition: 'Sunny' },
      { day: 'Saturday', high: 34, low: 26, condition: 'Clear' },
      { day: 'Sunday', high: 32, low: 25, condition: 'Partly Cloudy' },
    ],
  },
  'Bengaluru': {
    city: 'Bengaluru',
    country: 'India',
    temp: 24,
    condition: 'Mild & Pleasant',
    high: 28,
    low: 18,
    humidity: 56,
    wind: 12,
    pressure: 1015,
    aqi: 42,
    aqiLabel: 'Good',
    hourly: [
      { time: 'Now', temp: 24, icon: 'cloud' },
      { time: '14:00', temp: 27, icon: 'sun' },
      { time: '16:00', temp: 26, icon: 'cloud' },
      { time: '18:00', temp: 23, icon: 'rain' },
      { time: '20:00', temp: 21, icon: 'cloud' },
      { time: '22:00', temp: 19, icon: 'cloud' },
    ],
    daily: [
      { day: 'Today', high: 28, low: 18, condition: 'Pleasant Breeze' },
      { day: 'Tomorrow', high: 27, low: 18, condition: 'Scattered Drizzle' },
      { day: 'Thursday', high: 28, low: 17, condition: 'Partly Sunny' },
      { day: 'Friday', high: 29, low: 18, condition: 'Mild' },
      { day: 'Saturday', high: 27, low: 18, condition: 'Overcast' },
      { day: 'Sunday', high: 26, low: 17, condition: 'Evening Rain' },
    ],
  },
  'Chennai': {
    city: 'Chennai',
    country: 'India',
    temp: 33,
    condition: 'Warm & Breezy',
    high: 35,
    low: 27,
    humidity: 72,
    wind: 16,
    pressure: 1010,
    aqi: 58,
    aqiLabel: 'Satisfactory',
    hourly: [
      { time: 'Now', temp: 33, icon: 'sun' },
      { time: '14:00', temp: 35, icon: 'sun' },
      { time: '16:00', temp: 34, icon: 'sun' },
      { time: '18:00', temp: 31, icon: 'cloud' },
      { time: '20:00', temp: 29, icon: 'cloud' },
      { time: '22:00', temp: 28, icon: 'cloud' },
    ],
    daily: [
      { day: 'Today', high: 35, low: 27, condition: 'Sunny' },
      { day: 'Tomorrow', high: 34, low: 26, condition: 'Breezy' },
      { day: 'Thursday', high: 35, low: 27, condition: 'Clear' },
      { day: 'Friday', high: 33, low: 26, condition: 'Passing Clouds' },
      { day: 'Saturday', high: 34, low: 27, condition: 'Sunny' },
      { day: 'Sunday', high: 32, low: 26, condition: 'Isolated Showers' },
    ],
  },
};

export const DiscreetView: React.FC = () => {
  const { exitDiscreetMode, discreetModel, setDiscreetModel } = useDiscreet();

  // Selected city in weather model
  const [selectedCity, setSelectedCity] = useState<string>('New Delhi');
  const [activeWeatherTab, setActiveWeatherTab] = useState<'forecast' | 'radar'>('forecast');

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [calcExpression, setCalcExpression] = useState<string>('');
  const [calcMemory, setCalcMemory] = useState<number>(0);
  const [calcHistory, setCalcHistory] = useState<string[]>([]);
  const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false);

  // Discrete Unlock Modal
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Handle calculator button clicks
  const handleCalcNumber = (num: string) => {
    if (calcDisplay === '0' || shouldResetDisplay) {
      setCalcDisplay(num);
      setShouldResetDisplay(false);
    } else {
      if (calcDisplay.length < 14) {
        setCalcDisplay(calcDisplay + num);
      }
    }
  };

  const handleCalcDecimal = () => {
    if (shouldResetDisplay) {
      setCalcDisplay('0.');
      setShouldResetDisplay(false);
      return;
    }
    if (!calcDisplay.includes('.')) {
      setCalcDisplay(calcDisplay + '.');
    }
  };

  const handleCalcOperator = (op: string) => {
    setCalcExpression(`${calcDisplay} ${op}`);
    setShouldResetDisplay(true);
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcExpression('');
  };

  const handleCalcBackspace = () => {
    if (calcDisplay.length > 1) {
      setCalcDisplay(calcDisplay.slice(0, -1));
    } else {
      setCalcDisplay('0');
    }
  };

  const handleCalcToggleSign = () => {
    const val = parseFloat(calcDisplay);
    if (!isNaN(val)) {
      setCalcDisplay((val * -1).toString());
    }
  };

  const handleCalcPercent = () => {
    const val = parseFloat(calcDisplay);
    if (!isNaN(val)) {
      setCalcDisplay((val / 100).toString());
    }
  };

  const handleCalcSqrt = () => {
    const val = parseFloat(calcDisplay);
    if (!isNaN(val) && val >= 0) {
      const result = Math.sqrt(val);
      setCalcDisplay(result.toString());
      setCalcHistory(prev => [`√(${val}) = ${result}`, ...prev.slice(0, 4)]);
    }
  };

  const handleCalcEquals = () => {
    // Secret unlock shortcut: if user enters 1234 or 9999 and hits equals, open unlock modal
    if (calcDisplay === '1234' || calcDisplay === '9999') {
      setShowPinModal(true);
      return;
    }

    if (!calcExpression) return;
    const parts = calcExpression.split(' ');
    const firstOperand = parseFloat(parts[0]);
    const operator = parts[1];
    const secondOperand = parseFloat(calcDisplay);

    if (isNaN(firstOperand) || isNaN(secondOperand)) return;

    let result = 0;
    switch (operator) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '−':
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '×':
      case '*':
        result = firstOperand * secondOperand;
        break;
      case '÷':
      case '/':
        result = secondOperand !== 0 ? firstOperand / secondOperand : 0;
        break;
      default:
        result = secondOperand;
    }

    // Clean decimals
    const rounded = Math.round(result * 100000000) / 100000000;
    const historyEntry = `${firstOperand} ${operator} ${secondOperand} = ${rounded}`;
    setCalcHistory(prev => [historyEntry, ...prev.slice(0, 5)]);
    setCalcDisplay(rounded.toString());
    setCalcExpression('');
    setShouldResetDisplay(true);
  };

  // Keyboard shortcut listener for calculator
  useEffect(() => {
    if (discreetModel !== 'calculator') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (showPinModal) return;
      if (e.key >= '0' && e.key <= '9') {
        handleCalcNumber(e.key);
      } else if (e.key === '.') {
        handleCalcDecimal();
      } else if (e.key === '+' || e.key === '-') {
        handleCalcOperator(e.key === '+' ? '+' : '−');
      } else if (e.key === '*') {
        handleCalcOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleCalcOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalcEquals();
      } else if (e.key === 'Backspace') {
        handleCalcBackspace();
      } else if (e.key === 'c' || e.key === 'C') {
        handleCalcClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [discreetModel, calcDisplay, calcExpression, shouldResetDisplay, showPinModal]);

  const handleUnlock = () => {
    // Accepts PIN 1234 or empty string
    if (pinInput === '1234' || pinInput === '9999' || pinInput === '') {
      exitDiscreetMode();
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const currentWeather = CITIES_DATA[selectedCity] || CITIES_DATA['New Delhi'];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans select-none flex flex-col justify-between">
      {/* Top Disguised System Bar */}
      <div className="w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Desktop Utilities Suite v4.2
            </span>
          </div>

          {/* Model Switcher Tabs (Calculator vs Weather) */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setDiscreetModel('calculator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                discreetModel === 'calculator'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <CalcIcon className="w-3.5 h-3.5 text-cyber-600" />
              <span>Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => setDiscreetModel('weather')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                discreetModel === 'weather'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-500" />
              <span>Weather Radar</span>
            </button>
          </div>

          {/* Discreet settings/unlock button */}
          <button
            type="button"
            onClick={() => setShowPinModal(true)}
            title="System Preferences"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAIN CAMOUFLAGE CONTENT */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {/* ========================================================== */}
        {/* MODEL 1: SCIENTIFIC & STANDARD CALCULATOR                  */}
        {/* ========================================================== */}
        {discreetModel === 'calculator' && (
          <div className="max-w-md w-full mx-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
            {/* Calculator Title Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 font-medium">
                <CalcIcon className="w-4 h-4 text-cyber-500" />
                <span>Standard Calculator</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                DEG • Float
              </span>
            </div>

            {/* Display Screen */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-right space-y-1">
              <div className="h-5 text-xs font-mono text-slate-400 overflow-hidden text-ellipsis">
                {calcExpression || ' '}
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-slate-900 dark:text-slate-100 overflow-x-auto whitespace-nowrap">
                {calcDisplay}
              </div>
            </div>

            {/* Memory Row */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
              <button
                type="button"
                onClick={() => setCalcMemory(0)}
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                MC
              </button>
              <button
                type="button"
                onClick={() => setCalcDisplay(calcMemory.toString())}
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                MR
              </button>
              <button
                type="button"
                onClick={() => setCalcMemory(calcMemory + parseFloat(calcDisplay || '0'))}
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                M+
              </button>
              <button
                type="button"
                onClick={() => setCalcMemory(calcMemory - parseFloat(calcDisplay || '0'))}
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                M-
              </button>
              <button
                type="button"
                onClick={handleCalcSqrt}
                className="hover:text-slate-700 dark:hover:text-slate-200 font-bold"
              >
                √x
              </button>
              <button
                type="button"
                onClick={handleCalcPercent}
                className="hover:text-slate-700 dark:hover:text-slate-200"
              >
                %
              </button>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Row 1 */}
              <button
                type="button"
                onClick={handleCalcClear}
                className="p-3.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm hover:bg-rose-500/20 active:scale-95 transition-all"
              >
                AC
              </button>
              <button
                type="button"
                onClick={handleCalcBackspace}
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
              >
                ⌫
              </button>
              <button
                type="button"
                onClick={handleCalcToggleSign}
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
              >
                ±
              </button>
              <button
                type="button"
                onClick={() => handleCalcOperator('÷')}
                className="p-3.5 rounded-xl bg-cyber-500/10 text-cyber-700 dark:text-cyber-300 font-bold text-lg hover:bg-cyber-500/20 active:scale-95 transition-all"
              >
                ÷
              </button>

              {/* Row 2 */}
              <button
                type="button"
                onClick={() => handleCalcNumber('7')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                7
              </button>
              <button
                type="button"
                onClick={() => handleCalcNumber('8')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                8
              </button>
              <button
                type="button"
                onClick={() => handleCalcNumber('9')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                9
              </button>
              <button
                type="button"
                onClick={() => handleCalcOperator('×')}
                className="p-3.5 rounded-xl bg-cyber-500/10 text-cyber-700 dark:text-cyber-300 font-bold text-lg hover:bg-cyber-500/20 active:scale-95 transition-all"
              >
                ×
              </button>

              {/* Row 3 */}
              <button
                type="button"
                onClick={() => handleCalcNumber('4')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                4
              </button>
              <button
                type="button"
                onClick={() => handleCalcNumber('5')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                5
              </button>
              <button
                type="button"
                onClick={() => handleCalcNumber('6')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                6
              </button>
              <button
                type="button"
                onClick={() => handleCalcOperator('−')}
                className="p-3.5 rounded-xl bg-cyber-500/10 text-cyber-700 dark:text-cyber-300 font-bold text-lg hover:bg-cyber-500/20 active:scale-95 transition-all"
              >
                −
              </button>

              {/* Row 4 */}
              <button
                type="button"
                onClick={() => handleCalcNumber('1')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                1
              </button>
              <button
                type="button"
                onClick={() => handleCalcNumber('2')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                2
              </button>
              <button
                type="button"
                onClick={() => handleCalcNumber('3')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                3
              </button>
              <button
                type="button"
                onClick={() => handleCalcOperator('+')}
                className="p-3.5 rounded-xl bg-cyber-500/10 text-cyber-700 dark:text-cyber-300 font-bold text-lg hover:bg-cyber-500/20 active:scale-95 transition-all"
              >
                +
              </button>

              {/* Row 5 */}
              <button
                type="button"
                onClick={() => handleCalcNumber('0')}
                className="col-span-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all text-left pl-6"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleCalcDecimal}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
              >
                .
              </button>
              <button
                type="button"
                onClick={handleCalcEquals}
                className="p-3.5 rounded-xl bg-cyber-500 text-slate-950 font-bold text-lg hover:bg-cyber-400 active:scale-95 transition-all shadow-md"
              >
                =
              </button>
            </div>

            {/* Collapsible History */}
            {calcHistory.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono mb-1">Recent Calculations:</div>
                <div className="space-y-1 text-xs font-mono text-slate-500 dark:text-slate-400 max-h-20 overflow-y-auto">
                  {calcHistory.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-0.5">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================== */}
        {/* MODEL 2: WEATHER CHECKING & RADAR APPLICATION             */}
        {/* ========================================================== */}
        {discreetModel === 'weather' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Weather Search & Quick City Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(CITIES_DATA).map(cityName => (
                  <button
                    key={cityName}
                    type="button"
                    onClick={() => setSelectedCity(cityName)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedCity === cityName
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {cityName}
                  </button>
                ))}
              </div>

              {/* View Toggle (Forecast vs Radar) */}
              <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveWeatherTab('forecast')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeWeatherTab === 'forecast'
                      ? 'bg-blue-500 text-white font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveWeatherTab('radar')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeWeatherTab === 'radar'
                      ? 'bg-blue-500 text-white font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Precipitation Radar
                </button>
              </div>
            </div>

            {activeWeatherTab === 'forecast' ? (
              <>
                {/* Hero Current Weather Card */}
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{currentWeather.city}, {currentWeather.country}</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight pt-2">
                        {currentWeather.city}
                      </h2>
                      <p className="text-sm opacity-90 font-medium">
                        {currentWeather.condition} • High {currentWeather.high}° / Low {currentWeather.low}°
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <CloudSun className="w-20 h-20 text-amber-300 animate-pulse" />
                      <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight">
                        {currentWeather.temp}°
                      </div>
                    </div>
                  </div>

                  {/* Hourly Forecast Timeline */}
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="text-xs uppercase font-mono tracking-wider opacity-80 mb-3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Hourly Forecast
                    </div>
                    <div className="grid grid-cols-6 gap-2 text-center text-xs">
                      {currentWeather.hourly.map((h, i) => (
                        <div key={i} className="p-2 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                          <span className="opacity-80 text-[11px] block">{h.time}</span>
                          <div className="flex justify-center py-1">
                            {h.icon === 'sun' ? (
                              <Sun className="w-4 h-4 text-amber-300" />
                            ) : h.icon === 'rain' ? (
                              <CloudRain className="w-4 h-4 text-cyan-300" />
                            ) : (
                              <CloudSun className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="font-bold font-mono text-sm">{h.temp}°</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metric Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/20 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Droplets className="w-4 h-4 text-cyan-200" />
                      <div>
                        <div className="opacity-75 text-[11px]">Humidity</div>
                        <div className="font-bold text-sm">{currentWeather.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Wind className="w-4 h-4 text-cyan-200" />
                      <div>
                        <div className="opacity-75 text-[11px]">Wind Speed</div>
                        <div className="font-bold text-sm">{currentWeather.wind} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Compass className="w-4 h-4 text-cyan-200" />
                      <div>
                        <div className="opacity-75 text-[11px]">Pressure</div>
                        <div className="font-bold text-sm">{currentWeather.pressure} hPa</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-200" />
                      <div>
                        <div className="opacity-75 text-[11px]">Air Quality (AQI)</div>
                        <div className="font-bold text-sm">{currentWeather.aqi} • {currentWeather.aqiLabel}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6-Day Outlook Table */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    6-Day Extended Weather Outlook
                  </h3>

                  <div className="space-y-2.5">
                    {currentWeather.daily.map(d => (
                      <div
                        key={d.day}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs"
                      >
                        <span className="font-semibold w-24">{d.day}</span>
                        <span className="text-slate-500 flex-1">{d.condition}</span>
                        <div className="flex items-center gap-3 font-mono">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{d.high}°</span>
                          <span className="text-slate-400">{d.low}°</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Simulated Weather Radar View */
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                    <Compass className="w-4 h-4 text-blue-500" />
                    Live Doppler Radar & Cloud Cover
                  </h3>
                  <span className="text-xs text-slate-500">Live Feed • Updated 2 mins ago</span>
                </div>

                {/* Radar Mockup Map */}
                <div className="h-80 w-full rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden flex items-center justify-center border border-slate-800">
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
                  
                  {/* Concentric radar rings */}
                  <div className="w-64 h-64 rounded-full border border-cyan-500/20 absolute" />
                  <div className="w-44 h-44 rounded-full border border-cyan-500/30 absolute" />
                  <div className="w-24 h-24 rounded-full border border-cyan-500/40 absolute" />
                  
                  {/* Radar sweep */}
                  <div className="absolute w-32 h-32 origin-bottom-right top-1/2 left-1/2 -translate-x-full -translate-y-full bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full animate-spin [animation-duration:4s]" />

                  <div className="relative text-center space-y-2 z-10 text-white">
                    <CloudRain className="w-10 h-10 text-cyan-400 mx-auto animate-bounce" />
                    <p className="text-xs font-mono font-bold">RADAR STATION: {selectedCity.toUpperCase()}</p>
                    <p className="text-[11px] text-cyan-200">No severe precipitation or thunderstorm alerts in 50km radius</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Subtle Footer Disguised Notice & Unlock Shortcut */}
      <div className="py-4 text-center border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950">
        <button
          type="button"
          onClick={() => setShowPinModal(true)}
          className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-2 rounded inline-flex items-center gap-1.5"
        >
          <span>• Utility Options & App Preferences •</span>
        </button>
      </div>

      {/* Discrete Unlock Dialog */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyber-500/10 text-cyber-600 mx-auto flex items-center justify-center">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Resume Cyber Buddy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Enter your session PIN to return safely. For testing, default PIN is <strong>1234</strong> or leave blank.
              </p>
            </div>

            <input
              type="password"
              maxLength={4}
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              placeholder="•••• (Enter 4 Digits)"
              className="w-full text-center tracking-widest text-2xl font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 focus:outline-none focus:ring-2 focus:ring-cyber-500"
            />

            {pinError && (
              <p className="text-xs text-rose-500 font-medium">Incorrect PIN. Try 1234.</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Keep Camouflage
              </button>
              <button
                type="button"
                onClick={handleUnlock}
                className="flex-1 py-2.5 text-xs rounded-xl bg-cyber-500 hover:bg-cyber-400 text-slate-950 font-bold shadow-md transition-colors"
              >
                Resume Safely
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
