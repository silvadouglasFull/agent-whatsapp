import { type NextRequest, NextResponse } from 'next/server';
// app/api/webhook/route.ts
export async function GET(request: NextRequest) {
    console.log('Oi')
    const verifyToken = process.env['TOKEN_WEBHOOK'];
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');
    if (mode === 'subscribe' && token === verifyToken) {
        return new NextResponse(challenge, { status: 200 });
    } else {
        return new NextResponse('Forbidden', { status: 403 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (body.object === 'whatsapp_business_account') {
            const entry = body.entry?.[0];
            const changes = entry?.changes?.[0];
            const value = changes?.value;
            if (value?.messages && value.messages.length > 0) {
                const message = value.messages[0];
                const from = message.from;
                const messageType = message.type;
                if (messageType === 'text') {
                    const userMessage = message.text.body;
                    console.log(`Mensagem recebida de ${from}: "${userMessage}"`);
                }
                if (messageType === 'location') {
                    const latitude = message.location.latitude;
                    const longitude = message.location.longitude;
                    console.log(`Localização recebida de ${from}: Lat ${latitude}, Long ${longitude}`);
                }
            }
            return new NextResponse('EVENT_RECEIVED', { status: 200 });
        } else {
            return new NextResponse('Not Found', { status: 404 });
        }
    } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        return new NextResponse('Internal Error', { status: 200 });
    }
}