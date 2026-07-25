import { useState } from 'react';
import { InputForm } from './components/InputForm';
import type { FormData } from './components/InputForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultCard } from './components/ResultCard';
import { generateVibeID } from './services/ai';
import type { VibeData } from './services/ai';

type AppState = 'input' | 'loading' | 'result';

function App() {
  const [appState, setAppState] = useState<AppState>('input');
  const [vibeData, setVibeData] = useState<VibeData | null>(null);

  const handleSubmit = async (data: FormData) => {
    setAppState('loading');
    try {
      const result = await generateVibeID(data.handle, data.speed, data.energy, data.fuel);
      setVibeData(result);
      setAppState('result');
    } catch (error) {
      console.error("Error generating vibe ID:", error);
      // In case of a total failure, we'll just show the form again
      setAppState('input');
    }
  };

  const handleReset = () => {
    setAppState('input');
    setVibeData(null);
  };

  return (
    <div className="min-h-screen flex flex-col pt-8 pb-12 px-4 sm:px-6">
      {appState === 'input' && <InputForm onSubmit={handleSubmit} />}
      {appState === 'loading' && <LoadingScreen />}
      {appState === 'result' && vibeData && (
        <ResultCard data={vibeData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
