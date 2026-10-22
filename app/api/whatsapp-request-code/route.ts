import { MetaWhatsappAccountsService } from '@/services/manager-accounts';
import { WhatsappRequestCode } from '@/services/types/whatsapp';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
    try {
        const body: WhatsappRequestCode = await request.json()
        const { success } = await MetaWhatsappAccountsService.requestCode({ whatsappBussinessPhoneNumberId: body.whatsappBussinessPhoneNumberId })
        return NextResponse.json({ success, message: 'Request code status' })
    } catch (error: any) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 })
    }
}