import { useState } from "react";
import Navbar from './shared/Navbar'
import Footer from "./shared/Footer";

const HireUpAI = () => {
  // Mode switch: 'truepath' or 'resume'
  const [activeMode, setActiveMode] = useState('truepath');
  
  // TruePath AI States
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [languageMode, setLanguageMode] = useState('english');
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Resume Analyzer States
  const [resumeText, setResumeText] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeError, setResumeError] = useState(null);

  // Groq API Configuration from env
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const MODEL = "llama-3.1-8b-instant";

  // Clean text function
  const cleanText = (text) => {
    if (!text) return text;
    text = text.replace(/\*\*(.*?)\*\*/g, '$1');
    text = text.replace(/\*(.*?)\*/g, '$1');
    text = text.replace(/__(.*?)__/g, '$1');
    text = text.replace(/_(.*?)_/g, '$1');
    text = text.replace(/#{1,6}\s?(.*?)(?:\n|$)/g, '$1\n');
    text = text.replace(/`(.*?)`/g, '$1');
    return text;
  };

  // System prompt based on language for TruePath
  const getSystemPrompt = () => {
    if (languageMode === 'english') {
      return `You are HireUp AI, a senior career mentor and placement expert for students. You have 15+ years of experience in tech and non-tech fields.

YOUR EXPERTISE:
- Career guidance for all degree students (B.Tech, BCA, MCA, B.Sc, B.Com, BA, etc.)
- DSA sheets, important topics, and preparation strategies
- Placement preparation (resumes, interviews, aptitude, HR rounds)
- Time management and study schedules
- Current job market scenarios and trends
- Skill development roadmaps
- College/academic advice
- Internship and project guidance

RULES:
1. Always give accurate, practical, and actionable advice
2. Explain concepts in a simple, clear manner
3. Provide structured responses with proper sequence
4. Include examples and real-world scenarios
5. Be respectful, encouraging, and professional
6. Give DSA topic importance based on company requirements
7. Suggest resources (YouTube, websites, books) when relevant
8. Adapt advice based on student's year (1st, 2nd, 3rd, 4th)

RESPONSE FORMAT:
- Start with a brief, warm greeting
- Provide main answer in clear sections
- Use bullet points for lists and key points
- End with actionable next steps or encouragement

Remember: You are like a wise, experienced senior who genuinely wants to help students succeed.`;
    } else {
      return `You are HireUp AI, ek senior career mentor aur placement expert jo students ki madad karta hai. Aapke paas tech aur non-tech fields mein 15+ saal ka experience hai.

AAPKI EXPERTISE:
- Sabhi degree students ke liye career guidance (B.Tech, BCA, MCA, B.Sc, B.Com, BA, etc.)
- DSA sheets, important topics, aur preparation strategies
- Placement preparation (resume, interview, aptitude, HR rounds)
- Time management aur study schedules
- Current job market scenarios aur trends
- Skill development roadmaps
- College/academic advice
- Internship aur project guidance

RULES:
1. Hamesha accurate, practical, aur actionable advice do
2. Simple aur clear language mein samjhao
3. Structured responses do with proper sequence
4. Examples aur real-world scenarios include karo
5. Respectful, encouraging, aur professional raho
6. DSA topics ki importance batayo company requirements ke according
7. Resources suggest karo (YouTube, websites, books) jab relevant ho
8. Student ke year (1st, 2nd, 3rd, 4th) ke according advice adapt karo

RESPONSE FORMAT:
- Chote, warm greeting se start karo
- Main answer clear sections mein do
- Bullet points use karo lists aur key points ke liye
- Actionable next steps ya encouragement ke saath end karo

Yaad rakho: Aap ek wise, experienced senior ho jo genuinely students ki help karna chahte hain.`;
    }
  };

  // Handle TruePath AI query
  const handleAiQuery = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const prompt = languageMode === 'english'
        ? `Answer this student's query: "${aiQuery}"
           Provide accurate, practical advice based on current industry standards.
           Consider the student's perspective and give structured guidance.`
        : `Student ka sawal: "${aiQuery}"
           Accurate aur practical advice do current industry standards ke according.
           Student ke perspective se socho aur structured guidance do.`;

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
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const cleanedContent = cleanText(data.choices[0].message.content);
        
        setAiResponse({
          query: aiQuery,
          content: cleanedContent
        });
        
        generateSuggestedQuestions(aiQuery, cleanedContent);
      }
    } catch (error) {
      console.error('AI Error:', error);
      setAiResponse({
        type: 'error',
        content: languageMode === 'english' 
          ? "Sorry, I couldn't process your request. Please try again."
          : "माफ कीजिए, आपका सवाल process नहीं कर पाया। कृपया फिर से कोशिश करें।"
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  // Generate suggested questions for TruePath
  const generateSuggestedQuestions = async (query, response) => {
    try {
      const prompt = `Based on this Q&A about student/career advice:
Question: "${query}"
Answer: "${response.substring(0, 200)}..."

Suggest 3 relevant follow-up questions a student might ask. Return as comma-separated list.`;

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
          temperature: 0.3
        })
      });

      const data = await res.json();
      if (data.choices && data.choices[0]) {
        setSuggestedQuestions(data.choices[0].message.content.split(',').map(q => q.trim()));
      }
    } catch (error) {
      console.error('Suggested questions error:', error);
    }
  };

  const clearChat = () => {
    setAiResponse(null);
    setAiQuery("");
    setSuggestedQuestions([]);
  };

  // Resume Analysis Functions
  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setResumeError('Please paste your resume text first');
      return;
    }

    setIsAnalyzing(true);
    setResumeAnalysis(null);
    setResumeError(null);

    try {
      const truncatedText = resumeText.length > 5000 ? resumeText.substring(0, 5000) : resumeText;

      if (!GROQ_API_KEY) {
        throw new Error('API key not found');
      }

      const prompt = languageMode === 'english' 
        ? `You are an expert ATS resume analyzer. Analyze this resume and provide feedback in this exact format:

SCORE: [number between 0-100]

SUMMARY:
[2-3 sentences about overall resume quality]

STRENGTHS:
• [strength 1]
• [strength 2]
• [strength 3]

IMPROVEMENTS:
• [improvement 1 with specific suggestion]
• [improvement 2 with specific suggestion]
• [improvement 3 with specific suggestion]

KEYWORDS TO ADD:
[keyword1], [keyword2], [keyword3], [keyword4], [keyword5]

NEXT STEP:
[One clear actionable advice]

Resume:
${truncatedText}`
        : `You are an expert ATS resume analyzer. Is resume ka analysis karo aur Hinglish mein feedback do:

SCORE: [0-100 ke beech number]

SUMMARY:
[2-3 lines Hinglish mein overall resume quality]

STRENGTHS:
• [strength 1]
• [strength 2]
• [strength 3]

IMPROVEMENTS:
• [improvement 1 with specific suggestion]
• [improvement 2 with specific suggestion]
• [improvement 3 with specific suggestion]

KEYWORDS TO ADD:
[keyword1], [keyword2], [keyword3], [keyword4], [keyword5]

NEXT STEP:
[Ek clear advice Hinglish mein]

Resume:
${truncatedText}`;

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
              content: "You are an expert ATS resume analyst. Give concise, actionable feedback." 
            },
            { 
              role: "user", 
              content: prompt 
            }
          ],
          max_tokens: 800,
          temperature: 0.3
        })
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setResumeAnalysis(data.choices[0].message.content);
      }
    } catch (error) {
      setResumeError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Parse resume analysis
  const parseResumeAnalysis = (text) => {
    if (!text) return null;

    const sections = {
      score: text.match(/SCORE:?\s*(\d{1,3})/i)?.[1] || 'N/A',
      summary: text.match(/SUMMARY:?\s*([^\n]+)/i)?.[1] || '',
      strengths: [],
      improvements: [],
      keywords: [],
      nextStep: ''
    };

    const strengthsMatch = text.match(/STRENGTHS:?\s*([\s\S]*?)(?=IMPROVEMENTS:|KEYWORDS TO ADD:|NEXT STEP:)/i);
    if (strengthsMatch) {
      sections.strengths = strengthsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
        .map(line => line.replace(/^[•\-]\s*/, '').trim())
        .filter(Boolean)
        .slice(0, 3);
    }

    const improvementsMatch = text.match(/IMPROVEMENTS:?\s*([\s\S]*?)(?=KEYWORDS TO ADD:|NEXT STEP:)/i);
    if (improvementsMatch) {
      sections.improvements = improvementsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
        .map(line => line.replace(/^[•\-]\s*/, '').trim())
        .filter(Boolean)
        .slice(0, 3);
    }

    const keywordsMatch = text.match(/KEYWORDS TO ADD:?\s*([^\n]+)/i);
    if (keywordsMatch) {
      sections.keywords = keywordsMatch[1]
        .split(',')
        .map(k => k.trim())
        .filter(Boolean)
        .slice(0, 5);
    }

    const nextStepMatch = text.match(/NEXT STEP:?\s*([^\n]+)/i);
    if (nextStepMatch) {
      sections.nextStep = nextStepMatch[1].trim();
    }

    return sections;
  };

  const parsedResume = resumeAnalysis ? parseResumeAnalysis(resumeAnalysis) : null;

  // Format TruePath response content
  const formatResponseContent = (content) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
        return (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <span className="text-blue-600 font-bold text-lg">•</span>
            <p className="text-gray-700 flex-1">{trimmedLine.substring(1).trim()}</p>
          </div>
        );
      } else if (trimmedLine.match(/^\d+\./)) {
        return (
          <div key={idx} className="flex items-start gap-2 mb-2">
            <span className="text-purple-600 font-bold min-w-[24px]">{trimmedLine.match(/^\d+/)[0]}.</span>
            <p className="text-gray-700 flex-1">{trimmedLine.replace(/^\d+\.\s*/, '')}</p>
          </div>
        );
      } else if (trimmedLine === '') {
        return <div key={idx} className="h-2"></div>;
      } else {
        const isHeading = trimmedLine.length < 60 && (trimmedLine.includes(':') || trimmedLine === trimmedLine.toUpperCase());
        return (
          <p key={idx} className={`mb-3 ${isHeading ? 'text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent' : 'text-gray-700'}`}>
            {trimmedLine}
          </p>
        );
      }
    });
  };

  // Category-based quick questions for TruePath
  const categoryQuestions = {
    all: [
      "Best DSA sheet for placement?",
      "How to prepare for campus placements?",
      "Which field is best: Web Dev vs Data Science?",
      "How to manage college and coding?",
      "Career options for non-tech students?"
    ],
    dsa: [
      "Best DSA sheet for placement?",
      "Important DSA topics for FAANG",
      "How to solve DSA problems efficiently?",
      "DSA preparation roadmap for 2nd year"
    ],
    placement: [
      "How to prepare for campus placements?",
      "Resume tips for freshers",
      "Common HR interview questions",
      "Aptitude preparation strategy"
    ],
    career: [
      "Which field is best: Web Dev vs Data Science?",
      "How to choose between job and higher studies?",
      "Career roadmap for non-CS students",
      "Skills needed for 2025 jobs"
    ],
    timetable: [
      "How to manage college and coding?",
      "Daily study schedule for placements",
      "Time management tips for students",
      "How to balance DSA and development?"
    ],
    nontech: [
      "Career options for non-tech students",
      "How to get into product management?",
      "Best certifications for commerce students",
      "MBA preparation during graduation"
    ]
  };

  const categories = [
    { id: 'all', name: 'All', icon: '◉', gradient: 'from-blue-600 to-purple-600' },
    { id: 'dsa', name: 'DSA', icon: '⌨️', gradient: 'from-cyan-600 to-blue-600' },
    { id: 'placement', name: 'Placement', icon: '⚡', gradient: 'from-purple-600 to-pink-600' },
    { id: 'career', name: 'Career', icon: '▲', gradient: 'from-amber-500 to-orange-600' },
    { id: 'timetable', name: 'Time Table', icon: '◷', gradient: 'from-emerald-600 to-teal-600' },
    { id: 'nontech', name: 'Non-Tech', icon: '■', gradient: 'from-indigo-600 to-blue-600' }
  ];

  // Sample resume for testing
  const fillSampleResume = () => {
    setResumeText(`Abhishek Pathak
+91-7017331435 | pathakabhi290@gmail.com

EDUCATION
ABES Engineering College - B.Tech IT (2023-2027) - CGPA: 8.29

TECHNICAL SKILLS
Languages: Java, C, C++, Python, JavaScript, SQL
Frameworks: Node.js, Express.js, React.js, MongoDB
Tools: Git, Postman, VS Code

PROJECTS
LegalMitra - MERN stack with AI chatbot
HireUp - Job platform with JWT auth
WeatherSnap - Weather app with OpenWeatherMap API

EXPERIENCE
CodSoft - Web Development Intern (Dec 2024 - Jan 2025)

ACHIEVEMENTS
• Hackathon Finalist - Top 60 out of 2000+ participants
• 2 Star on CodeChef (1400+ rating)
• 750+ problems solved across platforms`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section with Mode Switch */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
                {activeMode === 'truepath' ? 'HireUp TruePath' : 'Resume ATS Analyzer'}
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              {activeMode === 'truepath' 
                ? 'Your intelligent career mentor — guiding you through placements, DSA, and beyond'
                : 'Upload your resume for instant ATS score and detailed feedback'}
            </p>
          </div>
          
          {/* Mode Switch and Language Toggle */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            {/* Mode Switch */}
            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-2xl shadow-sm border border-gray-200/50">
              <button
                onClick={() => setActiveMode('truepath')}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeMode === 'truepath' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                TruePath
              </button>
              <button
                onClick={() => setActiveMode('resume')}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeMode === 'resume' 
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Resume Analyzer
              </button>
            </div>

            {/* Language Toggle */}
            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-2xl shadow-sm border border-gray-200/50">
              <button
                onClick={() => setLanguageMode('english')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  languageMode === 'english' 
                    ? 'bg-gray-800 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguageMode('hinglish')}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  languageMode === 'hinglish' 
                    ? 'bg-gray-800 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                HI
              </button>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          
          {/* Conditional Content Based on Mode */}
          {activeMode === 'truepath' ? (
            /* ===== TRUEPATH MODE ===== */
            <>
              {/* Categories */}
              <div className="p-6 border-b border-gray-200/50 bg-white/40">
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`group px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat.id
                          ? `bg-gradient-to-r ${cat.gradient} text-white shadow-md`
                          : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200/50'
                      }`}
                    >
                      <span className="mr-1.5 opacity-70">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Questions */}
              <div className="p-6 border-b border-gray-200/50 bg-white/30">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">POPULAR QUERIES</p>
                <div className="flex flex-wrap gap-2">
                  {(activeCategory === 'all' 
                    ? categoryQuestions.all
                    : categoryQuestions[activeCategory] || []
                  ).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setAiQuery(q)}
                      className="px-4 py-2 bg-white/90 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 rounded-xl text-sm border border-gray-200/50 transition-all hover:shadow-md"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Query Input */}
              <div className="p-6 bg-gradient-to-b from-white/50 to-transparent">
                <form onSubmit={handleAiQuery}>
                  <div className="relative flex items-center">
                    <textarea
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder={languageMode === 'english' 
                        ? "Ask about placements, DSA, career, time management..." 
                        : "Placements, DSA, career, time management ke baare mein puchhe..."}
                      className="w-full p-4 pr-36 bg-white border-2 border-gray-200/70 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 resize-none transition-all text-gray-700 placeholder-gray-400"
                      rows="2"
                    />
                    <button
                      type="submit"
                      disabled={isAiLoading || !aiQuery.trim()}
                      className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
                    >
                      {isAiLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Ask AI</span>
                          <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Loading State */}
              {isAiLoading && (
                <div className="p-12 text-center">
                  <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                    <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600">
                    {languageMode === 'english' ? 'Analyzing your query...' : 'आपके सवाल का विश्लेषण हो रहा है...'}
                  </p>
                </div>
              )}

              {/* AI Response */}
              {aiResponse && !isAiLoading && (
                <div className="p-6 border-t border-gray-200/50 bg-white/40">
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 rounded-xl text-white shadow-md">
                      <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">YOUR QUESTION</p>
                      <p className="text-lg font-medium">"{aiResponse.query}"</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5">
                      <h3 className="text-white font-medium flex items-center gap-2">
                        <span className="text-lg">◈</span>
                        HireUp AI Response
                      </h3>
                    </div>
                    <div className="p-5">
                      <div className="space-y-1">
                        {formatResponseContent(aiResponse.content)}
                      </div>
                    </div>
                  </div>

                  {/* Suggested Questions */}
                  {suggestedQuestions.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">YOU MIGHT ALSO ASK</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setAiQuery(q);
                              handleAiQuery({ preventDefault: () => {} });
                            }}
                            className="px-4 py-2 bg-white/90 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 rounded-xl text-sm border border-gray-200/50 transition-all"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => navigator.clipboard.writeText(aiResponse.content)}
                      className="px-5 py-2 bg-white border border-gray-200/70 rounded-xl text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center gap-2"
                    >
                      <span className="text-lg">📋</span>
                      Copy
                    </button>
                    <button
                      onClick={clearChat}
                      className="px-5 py-2 bg-white border border-gray-200/70 rounded-xl text-sm font-medium text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-all flex items-center gap-2"
                    >
                      <span className="text-lg">✕</span>
                      New Chat
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State for TruePath */}
              {!aiResponse && !isAiLoading && (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-inner">
                    <span className="text-3xl text-gray-700">◈</span>
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent mb-2">
                    HireUp TruePath
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8">
                    Ask me anything about placements, DSA, career guidance, time management, or any student-related query
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all">
                      <p className="text-gray-800 font-semibold mb-1 flex items-center gap-2">
                        <span className="text-blue-600 text-lg">⚡</span>
                        Placement Prep
                      </p>
                      <p className="text-sm text-gray-500">Resume tips, interviews, company guides</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all">
                      <p className="text-gray-800 font-semibold mb-1 flex items-center gap-2">
                        <span className="text-purple-600 text-lg">⌨️</span>
                        DSA & Coding
                      </p>
                      <p className="text-sm text-gray-500">Sheets, important topics, strategies</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all">
                      <p className="text-gray-800 font-semibold mb-1 flex items-center gap-2">
                        <span className="text-emerald-600 text-lg">◷</span>
                        Time Management
                      </p>
                      <p className="text-sm text-gray-500">Study schedules, college + coding balance</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 hover:shadow-md transition-all">
                      <p className="text-gray-800 font-semibold mb-1 flex items-center gap-2">
                        <span className="text-amber-600 text-lg">▲</span>
                        Career Guidance
                      </p>
                      <p className="text-sm text-gray-500">Roadmaps, field selection, higher studies</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ===== RESUME ANALYZER MODE ===== */
            <div className="p-8">
              {/* Text Input Area */}
              <div className="mb-6">
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder={languageMode === 'english' 
                    ? "Paste your resume text here..." 
                    : "अपना रेज़्यूमे यहाँ पेस्ट करें..."}
                  className="w-full h-64 p-4 bg-white border-2 border-gray-200/70 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 resize-none transition-all text-gray-700 placeholder-gray-400 text-sm"
                />
                
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={fillSampleResume}
                    className="text-xs text-gray-500 hover:text-purple-600 underline"
                  >
                    {languageMode === 'english' ? 'Use sample resume' : 'सैंपल रेज़्यूमे use करें'}
                  </button>
                  <span className="text-xs text-gray-400">
                    {resumeText.length} {languageMode === 'english' ? 'characters' : 'अक्षर'}
                  </span>
                </div>
              </div>

              {/* Analyze Button */}
              {!resumeAnalysis && !resumeError && (
                <div className="text-center">
                  <button
                    onClick={analyzeResume}
                    disabled={isAnalyzing || !resumeText.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{languageMode === 'english' ? 'Analyzing...' : 'विश्लेषण हो रहा है...'}</span>
                      </div>
                    ) : (
                      <span>{languageMode === 'english' ? 'Analyze Resume' : 'रेज़्यूमे का विश्लेषण करें'}</span>
                    )}
                  </button>
                </div>
              )}

              {/* Loading State */}
              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-amber-100 rounded-full mb-4">
                    <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-gray-600">
                    {languageMode === 'english' ? 'Analyzing your resume...' : 'आपके रेज़्यूमे का विश्लेषण हो रहा है...'}
                  </p>
                </div>
              )}

              {/* Error State */}
              {resumeError && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-3 bg-red-50 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl text-red-400">!</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{resumeError}</p>
                  <button
                    onClick={() => setResumeError(null)}
                    className="px-4 py-2 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    {languageMode === 'english' ? 'Try Again' : 'पुनः प्रयास करें'}
                  </button>
                </div>
              )}

              {/* Analysis Result */}
              {parsedResume && !resumeError && (
                <div className="space-y-5 mt-6">
                  {/* Score */}
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-purple-100">
                    <span className="text-sm font-medium text-gray-600">ATS Score</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-light text-purple-700">{parsedResume.score}</span>
                      <span className="text-sm text-gray-400">/100</span>
                    </div>
                  </div>

                  {/* Summary */}
                  {parsedResume.summary && (
                    <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-purple-400 pl-4 py-1">
                      {parsedResume.summary}
                    </p>
                  )}

                  {/* Strengths & Improvements Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    {parsedResume.strengths.length > 0 && (
                      <div className="p-5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <h3 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3">✓ Strengths</h3>
                        <ul className="space-y-2">
                          {parsedResume.strengths.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-emerald-500">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {parsedResume.improvements.length > 0 && (
                      <div className="p-5 bg-amber-50/50 rounded-xl border border-amber-100">
                        <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-3">⚡ Improvements</h3>
                        <ul className="space-y-2">
                          {parsedResume.improvements.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-amber-500">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Keywords */}
                  {parsedResume.keywords.length > 0 && (
                    <div className="p-5 bg-purple-50/50 rounded-xl border border-purple-100">
                      <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-3">🔑 Keywords to Add</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedResume.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-white text-xs text-purple-700 rounded-full border border-purple-200 shadow-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Step */}
                  {parsedResume.nextStep && (
                    <div className="p-5 bg-gradient-to-r from-purple-600 to-amber-500 rounded-xl">
                      <p className="text-sm text-white/90 font-medium">{parsedResume.nextStep}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => navigator.clipboard.writeText(resumeAnalysis)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-all flex items-center gap-2"
                    >
                      <span className="text-base">📋</span>
                      Copy
                    </button>
                    <button
                      onClick={() => {
                        setResumeText('');
                        setResumeAnalysis(null);
                        setResumeError(null);
                      }}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-all flex items-center gap-2"
                    >
                      <span className="text-base">✕</span>
                      New
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State for Resume Analyzer */}
              {!resumeText && !isAnalyzing && !resumeAnalysis && !resumeError && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-inner">
                    <span className="text-3xl text-gray-700">📄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Resume ATS Analyzer</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Paste your resume text above to get instant ATS score, strengths, improvements, and actionable advice
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Powered by Groq AI · {activeMode === 'truepath' ? 'Your personal career mentor' : 'ATS-optimized resume analysis'}
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default HireUpAI;