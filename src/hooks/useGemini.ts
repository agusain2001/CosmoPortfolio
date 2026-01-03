import { GoogleGenerativeAI } from '@google/generative-ai';
import { useState, useCallback } from 'react';

const SYSTEM_PROMPT = `You are an AI assistant for Ashish Gusain's portfolio website. You help visitors learn about Ashish's skills, projects, and experience. Be friendly, helpful, and concise.

About Ashish Gusain:
- Junior Gen AI Engineer specializing in AI Agents, LangChain, LangGraph, and Multi-Agent Systems
- Master's in Computer Applications from G.B. Pant University (CGPA: 7.2)
- Location: Kotdwara, Uttarakhand, India
- Skills: Python, TensorFlow, Keras, LangChain, LangGraph, FastAPI, PostgreSQL, Docker, AWS, GCP
- Improved data processing speed by 30% through ETL pipeline optimization
- Currently exploring Fine-tuning LLMs and RAG Systems

Projects:
1. ConnectAI - Multi-Platform Agent: AI agent integrating Slack, Google Drive, Meet, Telegram for workflow automation
2. Real Estate Price Predictor: ML system with recommendation engine and data visualization
3. VANET Collision Detection: Real-time traffic analysis using YOLO for collision detection
4. Virtual Manager: AI-powered virtual assistant for task automation

Contact:
- Email: 2001.ashish.official@gmail.com
- LinkedIn: linkedin.com/in/ashish-gusain-aa279a280
- GitHub: github.com/agusain2001
- Twitter/X: @2001agusain

Keep responses brief (2-3 sentences max) unless asked for details. Be enthusiastic about AI and technology!`;

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
