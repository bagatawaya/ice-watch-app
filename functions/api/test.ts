// functions/api/test.ts

export const onRequest: (context: any) => Promise<Response> = async ({ request, env }) => {
    console.log("--- The test.ts endpoint was successfully called! ---");

    const data = {
        message: "Hello from the test endpoint!",
        timestamp: new Date().toISOString()
    };

    const response = new Response(JSON.stringify(data), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // Add CORS header
        }
    });

    return response;
};

export default onRequest;