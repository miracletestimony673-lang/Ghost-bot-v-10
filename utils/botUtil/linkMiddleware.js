export default async (context, next) => {
    const { m, isBotAdmin } = context;

    // ✅ allow both private + group chats
    // (removed group-only lock)

    // ⚠️ bot admin check should only apply for group features
    if (m.isGroup && !isBotAdmin) {
        return m.reply(
`╭━━━ᕙ    FEE-XMD    ᕗ━━━
├━━━≫ Bᴏᴛ Aᴅᴍɪɴ Rᴇϙᴜɪʀᴇᴅ ≪━━━
├ 
├ I need admin rights in this group
╰━━━━━━━━━━━━━━`
        );
    }

    await next();
};
