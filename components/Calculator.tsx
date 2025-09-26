
import React from 'react';

interface CalculatorProps {
  displayValue: string;
  onButtonClick: (value: string) => void;
  isPasswordSet: boolean;
  onSetPasswordMode: () => void;
  isSettingPassword: boolean;
}

const Button: React.FC<{
  value: string;
  onClick: (value: string) => void;
  className?: string;
}> = ({ value, onClick, className = '' }) => (
  <button
    onClick={() => onClick(value)}
    className={`bg-gray-700 hover:bg-gray-600 text-white font-bold text-2xl rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${className}`}
  >
    {value}
  </button>
);

const Calculator: React.FC<CalculatorProps> = ({
  displayValue,
  onButtonClick,
  isPasswordSet,
  onSetPasswordMode,
  isSettingPassword
}) => {
  const buttons = [
    'C', '(', ')', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  const getButtonClass = (btn: string) => {
    if (['/', '*', '-', '+', '='].includes(btn)) {
      return 'bg-orange-600 hover:bg-orange-500';
    }
    if (btn === 'C') {
      return 'bg-red-600 hover:bg-red-500 col-span-1';
    }
     if (btn === '0') {
      return 'col-span-2';
    }
    return 'bg-gray-600 hover:bg-gray-500';
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-900 rounded-2xl shadow-2xl p-4 space-y-4 border-2 border-gray-700">
      <div className="bg-gray-800 text-white text-5xl text-right rounded-lg p-4 break-words h-24 flex items-end justify-end shadow-inner">
        {displayValue || '0'}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={onButtonClick}
            className={getButtonClass(btn)}
          />
        ))}
      </div>
      {!isPasswordSet && (
         <div className="pt-2">
            <button
                onClick={onSetPasswordMode}
                className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${isSettingPassword ? 'bg-yellow-600 cursor-default' : 'bg-green-600 hover:bg-green-500'}`}
                disabled={isSettingPassword}
            >
                {isSettingPassword ? 'ادخل العملية الحسابية واحفظها بالضغط على =' : 'دخول'}
            </button>
        </div>
      )}
    </div>
  );
};

export default Calculator;
