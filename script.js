/**
 * AI Workout Planner - Application Logic
 * 
 * Architecture: React 18 Functional Components
 * State Management: Local useState
 * Styling: Tailwind CSS Utility Classes
 */

// Destructure globals for cleaner syntax (mimicking imports)
const { useState, useEffect, useRef } = React;

// --- Sub-Components ---

/**
 * Header Component
 * Displays branding and introductory text.
 */
const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
          AI
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Workout<span className="text-brand-600">Planner</span>
        </h1>
      </div>
      <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-500">
        <a href="#" className="hover:text-brand-600 transition-colors">History</a>
        <a href="#" className="hover:text-brand-600 transition-colors">Settings</a>
      </nav>
    </div>
  </header>
);

/**
 * ExerciseCard Component
 * Renders individual exercise details with visual hierarchy.
 */
const ExerciseCard = ({ exercise, index }) => {
  return (
    <div 
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="inline-block px-2 py-1 text-xs font-semibold tracking-wide text-brand-700 bg-brand-50 rounded-md mb-2 uppercase">
            {exercise.type}
          </span>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{exercise.name}</h3>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-extrabold text-gray-800">{exercise.reps}</span>
          <span className="text-xs text-gray-500 font-medium uppercase">Reps</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <span>🔄</span> {exercise.sets} Sets
        </div>
        <div className="flex items-center gap-1">
          <span>⏱️</span> {exercise.rest} Rest
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 italic border-l-2 border-brand-300">
        "{exercise.tip}"
      </div>
    </div>
  );
};

/**
 * GeneratorForm Component
 * Handles user input capture and validation.
 */
const GeneratorForm = ({ onGenerate, isLoading }) => {
  const = useState({
    level: 'beginner',
    goal: 'strength',
    duration: '30'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Session</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Fitness Level Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Fitness Level</label>
            <select 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3 transition-shadow outline-none"
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Goal Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Primary Goal</label>
            <select 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3 transition-shadow outline-none"
              value={formData.goal}
              onChange={(e) => setFormData({...formData, goal: e.target.value})}
            >
              <option value="strength">Build Strength</option>
              <option value="hypertrophy">Build Muscle</option>
              <option value="endurance">Endurance / Cardio</option>
              <option value="flexibility">Mobility & Recovery</option>
            </select>
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Duration (Min)</label>
            <select 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-3 transition-shadow outline-none"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            >
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">60 Minutes</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full text-white font-bold rounded-lg text-lg px-5 py-4 text-center transition-all duration-200 shadow-lg hover:shadow-xl
            ${isLoading 
             ? 'bg-gray-400 cursor-not-allowed transform-none' 
              : 'bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 hover:-translate-y-0.5'
            }`}
        >
          {isLoading? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Plan...
            </span>
          ) : (
            "Generate AI Workout Plan"
          )}
        </button>
      </form>
    </div>
  );
};

/**
 * Main App Component
 * Orchestrates state and business logic.
 */
const App = () => {
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Database of exercises (Simulating a backend DB)
  const exerciseDB =;

  const generatePlan = async (preferences) => {
    setIsLoading(true);
    setPlan(null);

    // Simulate API Latency (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // AI Logic Simulation: Filter and Shuffle
    // In a real app, this would be a fetch() call to an OpenAI endpoint
    const filtered = exerciseDB.filter(ex => 
      (ex.level === preferences.level |

| ex.level === 'beginner')
    );
    
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.max(3, parseInt(preferences.duration) / 10));

    const newPlan = {
      id: Date.now(),
      title: `${preferences.goal.charAt(0).toUpperCase() + preferences.goal.slice(1)} Focus Routine`,
      exercises: selected.map(ex => ({
       ...ex,
        sets: preferences.level === 'advanced'? 4 : 3,
        reps: preferences.goal === 'strength'? '5-8' : '12-15',
        rest: preferences.goal === 'endurance'? '30s' : '90s',
        tip: "Focus on form over speed."
      }))
    };

    setPlan(newPlan);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">AI Trainer</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us your goals, and our algorithm will construct a scientifically optimized workout routine just for you.
          </p>
        </div>

        <GeneratorForm onGenerate={generatePlan} isLoading={isLoading} />

        {plan && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
              <button 
                onClick={() => setPlan(null)}
                className="text-sm text-gray-500 hover:text-brand-600 underline"
              >
                Clear Results
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plan.exercises.map((ex, idx) => (
                <ExerciseCard key={idx} exercise={ex} index={idx} />
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-center text-blue-800 text-sm">
              <strong>💡 Pro Tip:</strong> Stay hydrated and ensure you warm up for at least 5 minutes before starting this routine.
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AI Workout Planner. Built with React 18 & Tailwind.
        </div>
      </footer>
    </div>
  );
};

// --- Initialization ---

// Get the DOM Root
const rootElement = document.getElementById("root");

// Initialize React 18 Root
// Note: We use createRoot API, not the legacy ReactDOM.render
const root = ReactDOM.createRoot(rootElement);

// Render the Application
root.render(<App />);