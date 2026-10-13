import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    // Você define esta string no seu código e coloca a MESMA lá no painel da Meta
    const verifyToken = process.env['TOKEN_WEBHOOK'];
    // Pega os parâmetros da URL utilizando o searchParams
    const searchParams = request.nextUrl.searchParams;

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // Validação do Webhook da Meta
    if (mode === 'subscribe' && token === verifyToken) {
        // Retorna o challenge como texto puro com status 200
        return new NextResponse(challenge, { status: 200 });
    } else {
        // Retorna status 403 (Proibido) caso a validação falhe
        return new NextResponse('Forbidden', { status: 403 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        // Verifica se a notificação pertence ao WhatsApp Business
        if (body.object === 'whatsapp_business_account') {
            const entry = body.entry?.[0];
            const changes = entry?.changes?.[0];
            const value = changes?.value;
            // Verifica se existem mensagens recebidas no payload
            if (value?.messages && value.messages.length > 0) {
                const message = value.messages[0];

                const from = message.from; // Número do remetente
                const messageType = message.type; // Ex: 'text', 'location', 'interactive'

                // Trata mensagens de texto
                if (messageType === 'text') {
                    const userMessage = message.text.body;
                    console.log(`Mensagem recebida de ${from}: "${userMessage}"`);

                    // TODO: Chame a lógica do seu Agente de IA passando o texto e o número do usuário
                }

                // Trata localização (se o cliente enviar a localização diretamente pelo WhatsApp)
                if (messageType === 'location') {
                    const latitude = message.location.latitude;
                    const longitude = message.location.longitude;
                    console.log(`Localização recebida de ${from}: Lat ${latitude}, Long ${longitude}`);
                }
            }

            // IMPORTANTE: Responda sempre 200 OK rapidamente para a Meta não reenviar a mensagem
            return new NextResponse('EVENT_RECEIVED', { status: 200 });
        } else {
            return new NextResponse('Not Found', { status: 404 });
        }
    } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        // Mesmo com erro interno, é recomendado retornar 200 para evitar retentativas contínuas da Meta
        return new NextResponse('Internal Error', { status: 200 });
    }
}