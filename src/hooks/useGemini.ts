import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useCallback } from 'react';
import { STATIC_VALUES } from '../utils/values';

const SYSTEM_PROMPT = `You are Ashish's portfolio assistant. Answer questions based ONLY on the provided context below. If a question is outside this context, politely say you can only discuss Ashish's professional background.

=== CONTEXT START ===

PROFESSIONAL SUMMARY:
Ashish Gusain is a Software Engineer with 1+ years of production experience, specializing in scalable backend systems and AI-powered applications. Expert in building production-grade multi-agent LLM systems.

KEY SKILLS:
- Programming: Python, Java, OOP, Pandas, NumPy
- Backend: FastAPI, Django, Flask, RESTful APIs  
- Databases: PostgreSQL, MongoDB, ElasticSearch, ChromaDB
- AI/ML: LangChain, LangGraph, OpenAI APIs, Hugging Face, RAG, Multi-Agent Systems, PyTorch, TensorFlow
- Cloud & DevOps: AWS (S3, EC2), Docker, CI/CD, Airflow

WORK EXPERIENCE:
1. Junior Software Engineer (AI/ML) at Easy Nurture (Dec 2023 - Present):
   - Engineered production-grade multi-agent LLM systems using LangChain and LangGraph
   - Built AI automation agents for YouTube and Gmail, boosting workflow efficiency by 40%
   - Developed FastAPI APIs handling 1000+ daily requests with <200ms latency
   - Achieved 85% code coverage with pytest
   - Reduced downtime by 30% in distributed systems

2. Junior Data Engineer at Orinova Innovation (Mar 2024 - Aug 2024):
   - Implemented ML-based anomaly detection reducing pipeline failures by 20%

KEY PROJECTS:
1. ConnectAI: Production multi-agent AI system with LangGraph, achieving 95% RAG accuracy with ChromaDB
2. Task Management API: FastAPI + PostgreSQL system with JWT auth, 99.9% uptime
3. VANET Collision Detection: YOLOv8-based system with 92% accuracy at 30 FPS

EDUCATION:
- MCA: G.B. Pant University (2021-2024)
- BCA: Uttarakhand University (2018-2021)

CONTACT:
- Email: ${STATIC_VALUES.email}
- LinkedIn: ${STATIC_VALUES.url.socialMedia.linkedin}
- GitHub: ${STATIC_VALUES.url.socialMedia.github}

=== CONTEXT END ===

INSTRUCTIONS:
- Be friendly, concise (2-3 sentences max unless asked for details)
- Highlight specific metrics and achievements when relevant
- Be enthusiastic about AI and technology
- Only discuss information from the context above`;


interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Available Gemini models - try in order
const GEMINI_MODELS = [
    'gemini-2.5-flash'
];

export function useGemini() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (
        messages: Message[],
        apiKey: string
    ): Promise<string> => {
        if (!apiKey) {
            throw new Error('API key is required');
        }

        setIsLoading(true);
        setError(null);

        try {
            const genAI = new GoogleGenerativeAI(apiKey);

            // Filter to only include user messages for building history
            // and ensure history starts with a user message
            const userMessages = messages.filter(m => m.role === 'user');

            if (userMessages.length === 0) {
                throw new Error('No user message found');
            }

            // Get the current user message (last one)
            const currentMessage = userMessages[userMessages.length - 1].content;

            // Build proper history: only include previous conversation pairs
            // Must start with 'user' and alternate between user/model
            const previousMessages = messages.slice(0, -1); // All except the last
            const history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

            // Skip the initial assistant greeting and build proper alternating history
            let foundFirstUser = false;
            for (const msg of previousMessages) {
                if (!foundFirstUser && msg.role === 'assistant') {
                    // Skip initial assistant greeting
                    continue;
                }
                if (msg.role === 'user') {
                    foundFirstUser = true;
                }
                if (foundFirstUser) {
                    history.push({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }],
                    });
                }
            }

            // Try models in order until one works
            let lastError: Error | null = null;

            for (const modelName of GEMINI_MODELS) {
                try {
                    const model = genAI.getGenerativeModel({ model: modelName });

                    const chat = model.startChat({
                        history: history,
                        generationConfig: {
                            maxOutputTokens: 500,
                            temperature: 0.7,
                        },
                    });

                    // Prepend system prompt to first message
                    const prompt = userMessages.length === 1
                        ? `${SYSTEM_PROMPT}\n\nUser: ${currentMessage}`
                        : currentMessage;

                    const result = await chat.sendMessage(prompt);
                    const response = result.response.text();

                    setIsLoading(false);
                    console.log(`✅ Using Gemini model: ${modelName}`);
                    return response;
                } catch (err) {
                    lastError = err instanceof Error ? err : new Error('Unknown error');
                    console.warn(`Model ${modelName} failed:`, err);
                    continue;
                }
            }

            // All models failed
            throw lastError || new Error('All Gemini models failed');

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
            console.error('Gemini API Error:', err);
            setError(errorMessage);
            setIsLoading(false);
            throw new Error(errorMessage);
        }
    }, []);

    return { sendMessage, isLoading, error };
}
