import React, { useState } from 'react';
import { Sparkles, Save, RotateCcw, Eye, Rocket, Share2, Check, AlertCircle, Loader2, Zap, Code, Database } from 'lucide-react';

export const AIBuilderLayout: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState([
    { id: 1, name: 'Requirement Analysis', status: 'pending' as const },
    { id: 2, name: 'Feature Mapping', status: 'pending' as const },
    { id: 3, name: 'Screen Generation', status: 'pending' as const },
    { id: 4, name: 'API Planning', status: 'pending' as const },
    { id: 5, name: 'Database Schema', status: 'pending' as const },
    { id: 6, name: 'Flow Generation', status: 'pending' as const },
    { id: 7, name: 'Integration', status: 'pending' as const },
    { id: 8, name: 'Deployment', status: 'pending' as const },
  ]);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedPlan(null);
    
    for (let i = 1; i <= 8; i++) {
      setPipelineSteps(prev =>
        prev.map(step => step.id === i ? { ...step, status: 'in-progress' as const } : step)
      );
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      setPipelineSteps(prev =>
        prev.map(step => step.id === i ? { ...step, status: 'completed' as const } : step)
      );
    }

    setGeneratedPlan({
      features: ['User Authentication', 'Product Management', 'Shopping Cart', 'Payment Processing', 'Order Tracking', 'Admin Dashboard'],
      modules: ['Auth Module', 'Product Module', 'Cart Module', 'Payment Module', 'Order Module', 'Admin Module'],
      screens: ['Login', 'Register', 'Dashboard', 'Product List', 'Product Detail', 'Shopping Cart', 'Checkout', 'Order Confirmation'],
      apis: ['POST /auth/login', 'POST /auth/register', 'GET /products', 'GET /products/:id', 'POST /cart/add', 'POST /orders/create'],
      database: ['users', 'products', 'cart_items', 'orders', 'order_items', 'payments']
    });

    setIsGenerating(false);
  };

  const handleSavePrompt = () => {
    if (prompt.trim() && !savedPrompts.includes(prompt)) {
      setSavedPrompts([...savedPrompts, prompt]);
    }
  };

  const getStepColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (status === 'in-progress') return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    return 'bg-slate-700/50 text-slate-400 border-slate-700/50';
  };

  const getStepIcon = (status: string) => {
    if (status === 'completed') return <Check className="w-3 h-3" />;
    if (status === 'in-progress') return <Loader2 className="w-3 h-3 animate-spin" />;
    return null;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col overflow-hidden">
      <div className="border-b border-slate-700/50 bg-slate-950/50 backdrop-blur px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Vala AI Builder</h1>
        <p className="text-sm text-slate-400 mt-1">Build, Deploy & Launch - Powered by AI</p>
      </div>

      <div className="flex-1 flex overflow-hidden gap-0">
        {/* LEFT PANEL */}
        <div className="w-80 border-r border-slate-700/50 bg-slate-900/50 flex flex-col">
          <div className="px-4 py-4 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-white">Prompt Builder</h2>
          </div>
          <div className="flex-1 flex flex-col p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="Describe your app..."
              className="flex-1 bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-500 p-3 rounded resize-none focus:outline-none focus:border-cyan-500/50"
            />
            <div className="text-xs text-slate-500 mt-2">{prompt.length} characters</div>
          </div>

          <div className="px-4 py-3 border-t border-slate-700/50 space-y-2">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleSavePrompt}
                disabled={isGenerating || !prompt.trim()}
                className="flex-1 border border-slate-700/50 hover:bg-slate-800/50 text-white py-2 rounded text-sm flex items-center justify-center gap-1"
              >
                <Save className="w-3 h-3" />
                Save
              </button>
              <button
                onClick={() => setPrompt('')}
                disabled={isGenerating}
                className="flex-1 border border-slate-700/50 hover:bg-slate-800/50 text-white py-2 rounded text-sm flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            </div>
          </div>

          {savedPrompts.length > 0 && (
            <div className="border-t border-slate-700/50 px-4 py-3 max-h-48 overflow-y-auto">
              <h3 className="text-sm font-semibold text-white mb-2">Saved Prompts</h3>
              <div className="space-y-2">
                {savedPrompts.map((saved, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(saved)}
                    className="w-full text-left p-2 bg-slate-800/50 hover:bg-slate-800 rounded text-xs text-slate-300 line-clamp-2"
                  >
                    {saved}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CENTER PANEL */}
        <div className="flex-1 border-r border-slate-700/50 bg-slate-900/30 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-white">AI Generated Plan</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {isGenerating ? (
              <div className="h-full flex items-center justify-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Generating...
              </div>
            ) : !generatedPlan ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-400">Generate a plan to see details</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white text-sm mb-3">Features</h3>
                  <div className="space-y-2">
                    {generatedPlan.features?.map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-white text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-3">APIs</h3>
                  <div className="space-y-2">
                    {generatedPlan.apis?.map((api: string, i: number) => (
                      <div key={i} className="p-2 bg-slate-800/50 rounded">
                        <code className="text-xs text-orange-400">{api}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-96 border-l border-slate-700/50 bg-slate-900/50 flex flex-col">
          <div className="px-4 py-4 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-white">Live Preview</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isGenerating ? (
              <div className="text-slate-400 text-center">Generating...</div>
            ) : !generatedPlan ? (
              <div className="text-slate-400 text-sm">Preview will appear here</div>
            ) : (
              <>
                <div className="bg-slate-800/50 rounded border border-slate-700/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-semibold text-white text-sm">UI Components</h3>
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Ready</span>
                  </div>
                  <p className="text-xs text-slate-300">✓ {generatedPlan.screens?.length || 0} Screens</p>
                </div>

                <div className="bg-slate-800/50 rounded border border-slate-700/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-purple-400" />
                    <h3 className="font-semibold text-white text-sm">API Endpoints</h3>
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Ready</span>
                  </div>
                  <p className="text-xs text-slate-300">✓ {generatedPlan.apis?.length || 0} Endpoints</p>
                </div>

                <div className="bg-slate-800/50 rounded border border-slate-700/50 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-green-400" />
                    <h3 className="font-semibold text-white text-sm">Database</h3>
                    <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Ready</span>
                  </div>
                  <p className="text-xs text-slate-300">✓ {generatedPlan.database?.length || 0} Tables</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PIPELINE */}
      <div className="border-t border-slate-700/50 bg-slate-950/50 px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-medium whitespace-nowrap ${getStepColor(step.status)}`}>
                {getStepIcon(step.status)}
                {step.name}
              </div>
              {i < pipelineSteps.length - 1 && <div className="w-4 h-px bg-slate-700/50"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-700/50 bg-slate-950/80 px-6 py-4">
        <div className="flex items-center justify-end gap-3">
          <button
            disabled={!generatedPlan}
            className="px-4 py-2 border border-slate-700/50 hover:bg-slate-800/50 rounded text-white text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Eye className="w-4 h-4" />
            Preview Product
          </button>
          <button
            disabled={!generatedPlan}
            className="px-4 py-2 border border-slate-700/50 hover:bg-slate-800/50 rounded text-white text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Rocket className="w-4 h-4" />
            Deploy Demo
          </button>
          <button
            disabled={!generatedPlan}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
};
