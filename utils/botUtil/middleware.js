const DEV_NUMBER = '2348118015884';

const normalizeNumber = (jid) => {
    if (!jid) return '';
    return jid.split('@')[0].split(':')[0].replace(/\D/g, '') + '@s.whatsapp.net';
};

const middleware = async (context, next) => {
    const { m, isBotAdmin, client } = context;

    const isDev = normalizeNumber(m.sender) === normalizeNumber(DEV_NUMBER);

    // ❌ REMOVED GROUP-ONLY LOCK (now supports DM + group)

    if (!isDev && !context.isAdmin) {
        return m.reply(
`╭━━━ᕙ    FEE-XMD    ᕗ━━━
├━━━≫ Nᴏᴛ Aᴅᴍɪɴ ≪━━━
├ 
├ You are not allowed to use this command
╰━━━━━━━━━━━━━━`
        );
    }

    let resolvedIsBotAdmin = isBotAdmin;

    if (!resolvedIsBotAdmin && m.isGroup && client) {
        try {
            const botRawJid = client.user?.id || '';
            const botNum = botRawJid.split('@')[0].split(':')[0].replace(/\D/g, '');
            const meta = await client.groupMetadata(m.chat);
            const participants = meta?.participants || [];

            for (const p of participants) {
                const pJid = p.id || p.jid || '';
                const pNum = pJid.split('@')[0].split(':')[0].replace(/\D/g, '');
                const isAdminRole = p.admin === 'admin' || p.admin === 'superadmin';

                if (isAdminRole && pNum && botNum && (pNum === botNum || pNum.endsWith(botNum))) {
                    resolvedIsBotAdmin = true;
                    break;
                }
            }
        } catch {}
    }

    if (!resolvedIsBotAdmin) {
        return m.reply(
`╭━━━ᕙ    FEE-XMD    ᕗ━━━
├━━━≫ Bᴏᴛ Nᴏᴛ Aᴅᴍɪɴ ≪━━━
├ 
├ I need admin rights to work properly
╰━━━━━━━━━━━━━━`
        );
    }

    await next();
};

export default middleware;
