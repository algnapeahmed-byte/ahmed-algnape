
import React, { useState, useCallback } from 'react';
import Calculator from './components/Calculator';
import Browser from './components/Browser';

type View = 'calculator' | 'browser';

const App: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [password, setPassword] = useState<string | null>(null);
  const [isSettingPassword, setIsSettingPassword] = useState<boolean>(false);
  const [view, setView] = useState<View>('calculator');

  const handleGoToCalculator = useCallback(() => {
    setView('calculator');
  }, []);

  const handleSetPasswordMode = useCallback(() => {
    setIsSettingPassword(true);
    setExpression('');
  }, []);

  const handleEquals = useCallback(() => {
    if (!expression) return;

    if (isSettingPassword) {
      setPassword(expression);
      setIsSettingPassword(false);
      try {
        // eslint-disable-next-line no-eval
        const result = eval(expression.replace(/[^-()\d/*+.]/g, ''));
        setExpression(String(result));
      } catch (error) {
        setExpression('Error');
      }
      return;
    }

    if (password && expression === password) {
      setView('browser');
      setExpression('');
      return;
    }

    try {
      // eslint-disable-next-line no-eval
      const result = eval(expression.replace(/[^-()\d/*+.]/g, ''));
      setExpression(String(result));
    } catch (error) {
      setExpression('Error');
    }
  }, [expression, isSettingPassword, password]);

  const handleButtonClick = useCallback((value: string) => {
    if (value === 'C') {
      setExpression('');
    } else if (value === '=') {
      handleEquals();
    } else {
      if (expression === 'Error') {
        setExpression(value);
      } else {
        setExpression(prev => prev + value);
      }
    }
  }, [expression, handleEquals]);

  if (view === 'browser') {
    return <Browser onGoBack={handleGoToCalculator} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <Calculator
        displayValue={expression}
        onButtonClick={handleButtonClick}
        isPasswordSet={!!password}
        onSetPasswordMode={handleSetPasswordMode}
        isSettingPassword={isSettingPassword}
      />
    </div>
  );
};

export default App;
