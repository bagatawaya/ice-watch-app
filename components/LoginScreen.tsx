
import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BotIcon, SpinnerIcon } from './icons';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface AiAssistantProps {
  onClose: () => void;
}

// Convert message format for display
const getDisplayText = (msg: Message) => msg.parts.map(p => p.text).join('');


const AiAssistant: React.FC<AiAssistantProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Base system instruction, data will be added on the server
  const systemInstruction = `You are Justo, the AI assistant inside the Watch ICE platform. Your job is to help users who are concerned about immigration issues, ICE activity, or finding legal help. You speak like a warm, supportive friend. Keep your responses short, direct, and helpful — like you're texting, not writing essays.

You have two JSON datasets: a list of trusted immigration lawyers and a list of ICE facilities.

**1. Legal Help**
When someone asks for legal help, you should:
- Politely ask what state they’re in (if not already mentioned).
- Search your internal list for matching lawyers in that state.
- Prioritize lawyers who offer pro bono help.
- Mention the lawyer name, firm, phone, and languages spoken.
- If asked, share the website or specialties.
- If no matches are found, respond kindly and explain you're still expanding your list.
- You **should not say** things like “I’m not a lawyer” or “I can’t help” — your role is to **provide helpful, comforting direction** and **connect users with legal support** when possible.

**2. ICE Facility Information**
When someone asks about ICE facilities (e.g., "Where’s the closest ICE facility?", "How do I contact the ICE office in Houston?", "Is the Atlanta detention center open on weekends?"), you should:
- Use the provided facility data to answer their questions.
- Provide the facility name, address, phone number, and hours of operation.
- If they ask for a website or other details, provide them from your data.
- If they ask for the "closest" facility, you may need to ask for their city or state to help narrow down the search.`;

  useEffect(() => {
    // Initial welcome message
    setMessages([{ role: 'model', parts: [{ text: t('aiAssistantWelcome') }] }]);
  }, [t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: inputValue }] };
    const conversationHistory = [...messages, userMessage];
    setMessages(conversationHistory);
    setInputValue('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        // Explicitly set CORS mode and credentials handling for maximum mobile compatibility.
        mode: 'cors',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: inputValue,
          systemInstruction,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        // Use the structured error from the server if available
        throw new Error(data.error || t('aiAssistantError'));
      }
      
      const modelResponse: Message = { role: 'model', parts: [{ text: data.text }] };
      setMessages(prev => [...prev, modelResponse]);

    } catch (error) {
      console.error("AI chat error:", error);
      let errorMessageText = t('aiAssistantError');
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessageText = "The request timed out. Please try again.";
        } else {
          errorMessageText = error.message;
        }
      }
      
      const errorMessage: Message = { role: 'model', parts: [{ text: errorMessageText }] };
      // Append the error message to the conversation
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <div className="w-full max-w-sm h-[60vh] bg-brand-surface rounded-lg shadow-2xl flex flex-col border border-brand-primary">
            {/* Header */}
            <div className="p-3 border-b border-brand-primary flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2">
                    <BotIcon className="h-6 w-6 text-brand-accent"/>
                    <h3 className="text-lg font-bold text-brand-text">{t('aiAssistantTitle')}</h3>
                </div>
                <button onClick={onClose} className="text-brand-secondary hover:text-brand-text text-2xl font-bold" aria-label={t('closeModal')}>
                    &times;
                </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <BotIcon className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-1" />}
                        <div className={`p-3 rounded-lg max-w-[85%] ${msg.role === 'model' ? 'bg-brand-primary text-brand-text' : 'bg-brand-accent text-white'}`}>
                             <div className="prose prose-sm prose-invert text-white" dangerouslySetInnerHTML={{ __html: md.render(getDisplayText(msg)) }} />
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-2.5">
                        <BotIcon className="w-6 h-6 text-brand-secondary flex-shrink-0 mt-1" />
                        <div className="p-3 rounded-lg bg-brand-primary text-brand-text">
                            <SpinnerIcon className="w-5 h-5" />
                        </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-brand-primary flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder={t('aiAssistantPlaceholder')}
                        disabled={isLoading}
                        className="w-full px-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50"
                    />
                    <button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {t('aiAssistantSend')}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default AiAssistant;