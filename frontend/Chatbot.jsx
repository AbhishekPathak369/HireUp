import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your HireUp assistant. I can help job seekers with resumes, interviews, job search, and help companies with hiring, job postings, and recruitment strategies. Ask me anything!", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [languageMode, setLanguageMode] = useState('english');
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Groq API Key
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const MODEL = "llama-3.1-8b-instant";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = languageMode === 'english' ? 'en-IN' : 'hi-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [languageMode]);

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length === 1) {
      const welcomeMessage = languageMode === 'english' 
        ? "Hello! I'm your HireUp assistant. I can help job seekers with resumes, interviews, job search, and help companies with hiring, job postings, and recruitment strategies. Ask me anything!"
        : "नमस्ते! मैं आपका HireUp असिस्टेंट हूं। मैं job seekers की resume, interview, job search में और companies की hiring, job posting, recruitment strategies में help कर सकता हूं। आप कुछ भी पूछ सकते हैं!";
      
      setMessages([{ text: welcomeMessage, isUser: false }]);
    }
  }, [languageMode]);

  const getSystemPrompt = () => {
    if (languageMode === 'english') {
      return `You are "HireUp Assistant" - a helpful career and hiring assistant for job seekers and companies. Explain everything in VERY SIMPLE English that anyone can understand.

IMPORTANT RULES:
1. HELP WITH ALL JOB-RELATED TOPICS - resumes, interviews, job search, hiring, recruitment
2. Use extremely simple words - like you're explaining to a friend
3. Give practical "what to do" steps
4. Break answers into small points
5. Always be helpful and positive
6. Focus on Indian job market but also cover international

TOPICS YOU COVER COMPLETELY:
FOR JOB SEEKERS:
- Resume/CV writing and formatting
- Cover letter guidance
- Interview preparation and tips
- Job search strategies
- Career guidance and planning
- Salary negotiation
- Skills development
- LinkedIn profile optimization
- Job application process
- Follow-up emails and communication

FOR COMPANIES/EMPLOYERS:
- Job description writing
- Hiring process optimization
- Interview techniques
- Candidate evaluation
- Employer branding
- Recruitment strategies
- Onboarding processes
- Team building
- Performance management

INDIAN JOB MARKET SPECIFIC:
- Indian resume formats
- Local job portals (Naukri, Indeed, LinkedIn India)
- Indian interview etiquette
- Regional job markets
- Government jobs and exams
- Startup job opportunities
- IT and non-IT sectors in India
- Work from home opportunities

INTERNATIONAL JOB SEARCH:
- Global job markets
- Remote work opportunities
- Visa and work permit information
- International companies hiring in India
- Overseas education and job connections

RESPONSE STYLE:
- Use very simple English words only
- Break into small paragraphs
- Use bullet points with • 
- Give clear step-by-step guidance
- Be like a helpful career coach
- Always give practical suggestions
- Keep it positive and motivational`;
    } else {
      return `You are "HireUp Assistant" - a helpful career and hiring assistant for job seekers and companies. Explain everything in SIMPLE HINGLISH (Hindi-English mix) that common people can understand.

IMPORTANT RULES:
1. HELP WITH ALL JOB-RELATED TOPICS - resumes, interviews, job search, hiring, recruitment
2. Use simple Hinglish - mix Hindi and English naturally
3. Give practical "kya karein" steps
4. Break answers into small points
5. Always be helpful and positive
6. Focus on Indian job market but also cover international

TOPICS YOU COVER COMPLETELY:
JOB SEEKERS KE LIYE:
- Resume/CV writing aur formatting
- Cover letter guidance
- Interview preparation aur tips
- Job search strategies
- Career guidance aur planning
- Salary negotiation
- Skills development
- LinkedIn profile optimization
- Job application process
- Follow-up emails aur communication

COMPANIES/EMPLOYERS KE LIYE:
- Job description writing
- Hiring process optimization
- Interview techniques
- Candidate evaluation
- Employer branding
- Recruitment strategies
- Onboarding processes
- Team building
- Performance management

INDIAN JOB MARKET SPECIFIC:
- Indian resume formats
- Local job portals (Naukri, Indeed, LinkedIn India)
- Indian interview etiquette
- Regional job markets
- Government jobs aur exams
- Startup job opportunities
- IT aur non-IT sectors India mein
- Work from home opportunities

INTERNATIONAL JOB SEARCH:
- Global job markets
- Remote work opportunities
- Visa aur work permit information
- International companies hiring in India
- Overseas education aur job connections

RESPONSE STYLE:
- Use simple Hinglish: "Aap kya kar sakte hain", "Resume kaise banayein"
- Break into small paragraphs
- Use bullet points with • 
- Give clear step-by-step guidance
- Be like a helpful career coach
- Always give practical suggestions
- Keep it positive and motivational`;
    }
  };

  const getQuickQuestions = () => {
    if (languageMode === 'english') {
      return [
        "How to write a good resume?",
        "Interview preparation tips?",
        "Best job search websites?",
        "How to negotiate salary?",
        "Cover letter writing tips?",
        "Career change guidance?",
        "How to hire good employees?",
        "Remote work opportunities?"
      ];
    } else {
      return [
        "Achha resume kaise banayein?",
        "Interview ki preparation kaise karein?",
        "Best job search websites?",
        "Salary negotiation kaise karein?",
        "Cover letter writing tips?",
        "Career change guidance?",
        "Achhe employees kaise hire karein?",
        "Remote work opportunities?"
      ];
    }
  };

  const getPlaceholderText = () => {
    return languageMode === 'english' 
      ? "Ask about jobs, resumes, interviews..."
      : "Jobs, resume, interview, hiring ke bare mein puchiye...";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const userInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: getSystemPrompt()
            },
            {
              role: "user",
              content: userInput
            }
          ],
          max_tokens: 1000,
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botMessage = data.choices[0].message.content;
        setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = languageMode === 'english'
        ? "Sorry, I'm having connection issues. Please try again."
        : "Maaf kijiye, connection problem hai. Thodi der baad try karein.";
      
      setMessages(prev => [...prev, { 
        text: errorMessage, 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const welcomeMessage = languageMode === 'english' 
      ? "Hello! I'm your HireUp assistant. I can help job seekers with resumes, interviews, job search, and help companies with hiring, job postings, and recruitment strategies. Ask me anything!"
      : "नमस्ते! मैं आपका HireUp असिस्टेंट हूं। मैं job seekers की resume, interview, job search में और companies की hiring, job posting, recruitment strategies में help कर सकता हूं। आप कुछ भी पूछ सकते हैं!";
    
    setMessages([{ text: welcomeMessage, isUser: false }]);
    setShowQuickQuestions(false);
  };

  const toggleLanguageMode = () => {
    setLanguageMode(prev => prev === 'english' ? 'hinglish' : 'english');
  };

  const toggleQuickQuestions = () => {
    setShowQuickQuestions(prev => !prev);
  };

  const askQuickQuestion = (question) => {
    setInputMessage(question);
    setShowQuickQuestions(false);
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      const errorMsg = languageMode === 'english' 
        ? "Speech recognition not supported in your browser"
        : "Aapke browser mein voice recognition support nahi hai";
      setMessages(prev => [...prev, { text: errorMsg, isUser: false }]);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Enhanced Header */}
      <div className="chatbot-header">
        <div className="header-left">
          <div className="chatbot-avatar">
            <div className="avatar-icon">💼</div>
          </div>
          <div className="header-text">
            <h3>HireUp Assistant</h3>
            <div className="status-container">
              <span className="status-dot"></span>
              <span className="status-text">Online</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button 
            onClick={toggleLanguageMode}
            className="language-toggle-btn"
            title={languageMode === 'english' ? 'Switch to Hinglish' : 'Switch to English'}
          >
            {languageMode === 'english' ? 'हिं' : 'EN'}
          </button>
          <button onClick={clearChat} className="clear-btn" title="Clear chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Questions Toggle */}
      <div className="quick-questions-toggle">
        <button 
          onClick={toggleQuickQuestions}
          className={`quick-questions-btn ${showQuickQuestions ? 'active' : ''}`}
        >
          <span className="btn-icon">💡</span>
          {languageMode === 'english' ? 'Quick Questions' : 'Quick Questions'}
          <span className={`arrow ${showQuickQuestions ? 'up' : 'down'}`}>▼</span>
        </button>
      </div>

      {/* Quick Questions Panel */}
      {showQuickQuestions && (
        <div className="quick-questions-panel">
          <div className="panel-header">
            <span>{languageMode === 'english' ? 'Common Career Questions' : 'Common Career Questions'}</span>
          </div>
          <div className="quick-questions-grid">
            {getQuickQuestions().map((question, index) => (
              <button
                key={index}
                onClick={() => askQuickQuestion(question)}
                className="quick-question-chip"
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="messages-container">
        <div className="messages-scroll-area">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            >
              {!message.isUser && (
                <div className="bot-avatar">
                  <div className="avatar-icon">💼</div>
                </div>
              )}
              <div className="message-content">
                <div className="message-text">
                  {message.text.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {message.isUser && (
                <div className="user-avatar">
                  <div className="avatar-icon">👤</div>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message">
              <div className="bot-avatar">
                <div className="avatar-icon">💼</div>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span>HireUp is typing</span>
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Enhanced Input Area */}
      <div className="input-section">
        <div className="input-container">
          <button 
            onClick={toggleSpeechRecognition}
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            title={languageMode === 'english' ? 'Voice input' : 'Voice input'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          </button>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholderText()}
            disabled={isLoading}
            rows="1"
            className="message-input"
          />
          <button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()}
            className="send-button"
            title="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div className="input-footer">
          <span className="input-hint">
            {languageMode === 'english' ? 'Press Enter to send' : 'Send karne ke liye Enter dabayein'}
          </span>
          {isListening && (
            <span className="listening-indicator">
              ● Listening...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;