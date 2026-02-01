import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Send, 
  Bot, 
  User, 
  AlertTriangle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const sampleQuestions = [
  "What are my rights as a tenant in Delhi?",
  "How do I file an RTI application?",
  "Can my landlord evict me without notice?",
  "What is the process for consumer court complaint?",
  "How to register a rent agreement?"
];

const demoResponses = {
  "What are my rights as a tenant in Delhi?": `As a tenant in Delhi, you have several important rights under the Delhi Rent Control Act, 1958:

**Key Rights:**
1. **Fair Rent:** You cannot be charged more than the "fair rent" determined by the Rent Controller
2. **Protection from Eviction:** Your landlord cannot evict you without a court order and valid grounds
3. **Receipt for Rent:** You're entitled to rent receipts for all payments
4. **Essential Services:** Landlord cannot cut off water, electricity, or other essential services
5. **Security Deposit:** Maximum 2 months rent; must be returned when you vacate

**Important:** Always have a written rent agreement and keep copies of all rent receipts.

For personalized legal advice, please consult a verified lawyer on our platform.`,

  "How do I file an RTI application?": `Filing an RTI (Right to Information) application is your fundamental right as an Indian citizen.

**Step-by-Step Process:**
1. **Identify the Authority:** Determine which government department has the information
2. **Write Application:** Include your name, address, and specific information requested
3. **Pay Fee:** ₹10 via postal order, demand draft, or online payment
4. **Submit:** Send to the Public Information Officer (PIO) of that department
5. **Wait:** Response should come within 30 days

**Tips:**
- Be specific about what information you need
- Keep a copy of your application
- Note the date of submission

For personalized legal advice, please consult a verified lawyer on our platform.`,

  "default": `Thank you for your question. Based on Indian law, here's what you should know:

This appears to be a legal matter that may require specific analysis based on your situation. While I can provide general information, I recommend:

1. **Gather Documents:** Collect all relevant papers, agreements, and correspondence
2. **Timeline:** Note down all important dates related to your matter
3. **Consult Expert:** For specific advice, speak with a verified lawyer

Our platform has lawyers specializing in various areas of Indian law who can provide personalized guidance.

For personalized legal advice, please consult a verified lawyer on our platform.`
};

export default function NyayAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! I'm NyayAI, your legal information assistant. I can help you understand Indian laws, tenant rights, consumer protection, RTI process, and more. How can I assist you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (question) => {
    const userMessage = question || inputValue.trim();
    if (!userMessage) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Get demo response
    const response = demoResponses[userMessage] || demoResponses.default;
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-light pt-20">
      {/* Header */}
      <section className="bg-dark grain-overlay relative py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-emerald-900" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-600/20 text-amber-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI Legal Assistant Demo
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4">
              Meet NyayAI
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Ask legal questions in plain English or Hinglish. 
              Get simplified explanations of Indian laws and your rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Card className="overflow-hidden border-0 shadow-float">
            {/* Chat Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">NyayAI</h3>
                <p className="text-xs text-slate-400">Legal Information Assistant</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-slate-400">Demo Mode</span>
              </div>
            </div>

            {/* Messages */}
            <CardContent 
              data-testid="chat-messages"
              className="p-6 h-[400px] overflow-y-auto bg-slate-50"
            >
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-amber-600' : 'bg-slate-700'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user' 
                        ? 'bg-amber-600 text-white rounded-tr-sm' 
                        : 'bg-white shadow-sm border border-slate-100 rounded-tl-sm'
                    }`}>
                      <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        message.role === 'user' ? 'text-white' : 'text-slate-700'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white shadow-sm border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Sample Questions */}
            <div className="px-6 py-3 bg-white border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    data-testid={`sample-question-${i}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-6 py-4 bg-white border-t border-slate-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your legal question..."
                  data-testid="chat-input"
                  className="flex-1 h-12 px-4 rounded-full border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
                <Button 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  data-testid="send-btn"
                  className="w-12 h-12 p-0"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 font-medium">Important Disclaimer</p>
              <p className="text-sm text-amber-700 mt-1">
                NyayAI provides general legal information only, not legal advice. 
                For matters specific to your situation, please consult a licensed lawyer.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Need personalized legal advice?</p>
            <Link to="/find-lawyer">
              <Button variant="outline" data-testid="consult-lawyer-btn">
                Find a Verified Lawyer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
