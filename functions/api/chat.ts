// functions/api/chat.ts
console.log("\n\n--- LOADING NEW chat.ts - Version 2.0 ---\n\n");

import { lawyers } from '../../data/lawyers';
import { iceFacilities } from '../../data/iceFacilities';

// Helper to set CORS headers on every response
const setCorsHeaders = (response: Response): Response => {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
};

// --- INTELLIGENT DATA INJECTION ---
// This function now filters data to be more targeted and lightweight.
function buildGeminiContents(history: any[], message: string): any[] {
    let dataToInject = '';
    const lowerCaseMessage = message.toLowerCase();

    const lawyerKeywords = ['lawyer', 'legal', 'attorney', 'abogado', 'ayuda legal', 'representation', 'representación'];
    const facilityKeywords = ['facility', 'facilities', 'detention', 'center', 'office', 'instalación', 'instalaciones', 'centro', 'oficina', 'dirección'];
    
    const needsLawyers = lawyerKeywords.some(kw => lowerCaseMessage.includes(kw));
    const needsFacilities = facilityKeywords.some(kw => lowerCaseMessage.includes(kw));

    if (needsLawyers) {
        // Example of intelligent filtering: find a state in the message
        const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
        const foundState = states.find(state => new RegExp(`\\b${state}\\b`, 'i').test(message));
        
        let relevantLawyers = lawyers;
        if (foundState) {
            relevantLawyers = lawyers.filter(l => l.state.toUpperCase() === foundState.toUpperCase());
        }

        // Create simplified objects to reduce token count
        const simplifiedLawyers = relevantLawyers.map(l => ({
            name: l.name,
            firm: l.firm,
            phone: l.phone,
            state: l.state,
            proBono: l.proBono,
            languages: l.languages,
            specialties: l.specialties,
        })).slice(0, 25); // Limit to a reasonable number to prevent timeouts

        dataToInject += `\n\nHere is a list of lawyers. Use this JSON data to answer my question:\n\`\`\`json\n${JSON.stringify(simplifiedLawyers, null, 2)}\n\`\`\``;
        console.log(`[CHAT_PROXY] Injecting ${simplifiedLawyers.length} lawyer(s) for state: ${foundState || 'All'}.`);
    }

    if (needsFacilities) {
        // Summarize facility info as well
        const simplifiedFacilities = iceFacilities.map(f => ({
            name: f.name,
            address: f.address,
            phone: f.phone,
            state: f.state,
        })).slice(0, 25);

        dataToInject += `\n\nHere is a list of ICE facilities. Use this JSON data to answer my question:\n\`\`\`json\n${JSON.stringify(simplifiedFacilities, null, 2)}\n\`\`\``;
        console.log(`[CHAT_PROXY] Injecting ${simplifiedFacilities.length} facility data.`);
    }
    
    const finalUserPrompt = message + dataToInject;
    
    return [...(history || []), { role: 'user', parts: [{ text: finalUserPrompt }] }];
}

export const onRequest: (context: any) => Promise<Response> = async ({ request, env }) => {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
        return setCorsHeaders(new Response(null, { status: 204 }));
    }
    
    if (request.method !== 'POST') {
        return setCorsHeaders(new Response(JSON.stringify({ error: 'Method Not Allowed' }), { 
            status: 405, 
            headers: { 'Content-Type': 'application/json' } 
        }));
    }

    try {
        const requestBody = await request.json();
        const { history, message, systemInstruction } = requestBody;

        if (!message || !systemInstruction) {
             return setCorsHeaders(new Response(JSON.stringify({ error: "Bad Request: 'message' and 'systemInstruction' are required." }), { 
                 status: 400, 
                 headers: { 'Content-Type': 'application/json' } 
             }));
        }

        const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("[CHAT_PROXY] FATAL: GEMINI_API_KEY is not configured on the server.");
            return setCorsHeaders(new Response(JSON.stringify({ error: "API key not configured on server" }), {
                 status: 500,
                 headers: { 'Content-Type': 'application/json' }
            }));
        }
        
        const contents = buildGeminiContents(history, message);

        const model = 'gemini-1.5-flash-latest'; // Using a stable, recent model
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        
        const geminiRequestPayload = {
            contents,
            system_instruction: {
                parts: [{ text: systemInstruction }]
            },
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
            }
        };
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

        let geminiResponse;
        try {
            console.log(`[CHAT_PROXY] Sending payload to Gemini for model ${model}.`);
            geminiResponse = await fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify(geminiRequestPayload),
                signal: controller.signal
            });
        } finally {
            clearTimeout(timeoutId);
        }
        
        if (!geminiResponse.ok) {
            const errorBody = await geminiResponse.text();
            console.error(`[CHAT_PROXY] Gemini API Error: ${geminiResponse.status}`, errorBody);
            return setCorsHeaders(new Response(JSON.stringify({ error: `The AI service failed with status ${geminiResponse.status}.` }), {
                 status: geminiResponse.status,
                 headers: { 'Content-Type': 'application/json' }
            }));
        }
        
        const geminiJson = await geminiResponse.json();
        const responseText = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!responseText) {
             console.warn("[CHAT_PROXY] Gemini response was successful but contained no text parts.");
             return setCorsHeaders(new Response(JSON.stringify({ error: "The AI returned an empty response." }), {
                 status: 500,
                 headers: { 'Content-Type': 'application/json' }
            }));
        }

        const clientResponse = new Response(JSON.stringify({ text: responseText }), {
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });

        return setCorsHeaders(clientResponse);

    } catch (error) {
        let errorMessage = 'An unknown server error occurred.';
        let statusCode = 500;
        
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                errorMessage = "The request to the AI service timed out.";
                statusCode = 504; // Gateway Timeout
            } else {
                 errorMessage = `Server error: ${error.message}`;
            }
        }
        
        console.error('[CHAT_PROXY] Unhandled error in chat proxy:', error);
        
        const errorResponse = new Response(JSON.stringify({ error: errorMessage }), { 
            status: statusCode,
            headers: { 'Content-Type': 'application/json' }
        });
        return setCorsHeaders(errorResponse);
    }
};

export default onRequest;