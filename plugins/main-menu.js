import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
    let { exp, diamantes, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    exp = exp || 'Desconocida';
    role = role || 'Aldeano';

        const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

        await m.react('💙')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/pk3xxk.jpg')

        const videoUrl = 'https://files.catbox.moe/ch9m5c.mp4' // URL fija del video

        let menu = `
ㅤㅤ🍁⩁꯭ ͡  ͡ᩚ꯭ ꯭⩁ㅤㅤ𑁯🤍ᰍㅤㅤ⩁꯭ ͡  ͡ᩚ꯭ ꯭⩁🍁
೯ ׅ 👤 ¡Hᴏʟᴀ! ¿Cᴏᴍᴏ Esᴛᴀ́s? ׄ ᦡᦡ
ㅤ꒰͜͡${taguser}
ㅤㅤ♡𑂳ᩙㅤ ּ ${saludo} ׄ ㅤタス
*🧇 Activo:* ${uptime}
*👥 Usuarios:* ${totalreg}
*🆙 Versión:* 3.0.0

*💎 Gemas:* ${diamantes}
*💫 Exp:* ${exp}
*🫖 Nivel:* ${level}
*🍢 Rango:* ${role}
${readMore}
ㅤ ㅤ   乂 *ʟɪsᴛᴀ ᴅᴇ ᴄᴏᴍᴀɴᴅᴏs* 乂

𓂂𓏸  𐅹੭੭   *\`mᥱᥒᥙs\`*   🍃ᩚ꤬ᰨᰍ
ര ׄ 🍃˚ .menunsfw
ര ׄ 🍃˚ .menuaudios
ര ׄ 🍃˚ .menuff
ര ׄ 🍃˚ .menuowner
ര ׄ 🍃˚ .menulogos

𓂂𓏸  𐅹੭੭   *\`іᥒ𝖿᥆\`*   🫖ᩚ꤬ᰨᰍ
ര ׄ 🫖˚ .totalf
ര ׄ 🫖˚ .grupos
ര ׄ 🫖˚ .sugerir
ര ׄ 🫖˚ .report
ര ׄ 🫖˚ .owner
ര ׄ 🫖˚ .ping
ര ׄ 🫖˚ .uptime
ര ׄ 🫖˚ .horario
ര ׄ 🫖˚ .precios

𓂂𓏸  𐅹੭੭   *\`᥆ᥒ - ᥆𝖿𝖿\`*   🌿ᩚ꤬ᰨᰍ
ര ׄ 🌿˚ .enable *opción*
ര ׄ 🌿˚ .disable *opción*
ര ׄ 🌿˚ .on *opción*
ര ׄ 🌿˚ .off *opción*
ര ׄ 🌿˚ .manual

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`*   📥ᩚ꤬ᰨᰍ
ര ׄ 📥˚ .play *texto*
ര ׄ 📥˚ .aplay *texto*
ര ׄ 📥˚ .aplay2 *texto*
ര ׄ 📥˚ .splay *texto*
ര ׄ 📥˚ .ytmp4doc *texto*
ര ׄ 📥˚ .ytmp3doc *texto*
ര ׄ 📥˚ .apk *texto*
ര ׄ 📥˚ .pinterest *texto*
ര ׄ 📥˚ .capcut *url*
ര ׄ 📥˚ .pinvid *url*
ര ׄ 📥˚ .ytmp4 *url*
ര ׄ 📥˚ .ytmp3 *url*
ര ׄ 📥˚ .tiktok *url*
ര ׄ 📥˚ .tiktok2 *url*
ര ׄ 📥˚ .instagram *url*
ര ׄ 📥˚ .facebook *url*
ര ׄ 📥˚ .mediafire *url*
ര ׄ 📥˚ .mega *url*
ര ׄ 📥˚ .playstore *url*
ര ׄ 📥˚ .xnxxdl *url*
ര ׄ 📥˚ .xvideosdl *url*
ര ׄ 📥˚ .pornhubdl *url*

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`*   🔎ᩚ꤬ᰨᰍ
ര ׄ 🔎˚ .scsearch *texto*
ര ׄ 🔎˚ .aplaysearch *texto*
ര ׄ 🔎˚ .ttsearch *texto*
ര ׄ 🔎˚ .ttsearch2 *texto*
ര ׄ 🔎˚ .ytsearch *texto*
ര ׄ 🔎˚ .hpmsearch *texto*
ര ׄ 🔎˚ .spotifysearch *texto*
ര ׄ 🔎˚ .githubsearch *texto*
ര ׄ 🔎˚ .playstoresearch *texto*
ര ׄ 🔎˚ .xnxxsearch *texto*
ര ׄ 🔎˚ .xvsearch *texto*
ര ׄ 🔎˚ .pornhubsearch *texto*
ര ׄ 🔎˚ .gnula *texto*
ര ׄ 🔎˚ .mercadolibre *texto*
ര ׄ 🔎˚ .ffstalk *id*

𓂂𓏸  𐅹੭੭   *\`іᥒ𝗍ᥱᥣіgᥱᥒᥴіᥲs\`*   ☕ᩚ꤬ᰨᰍ
ര ׄ ☕˚ .ia *texto*
ര ׄ ☕˚ .shadow *texto*
ര ׄ ☕˚ .flux *texto*
ര ׄ ☕˚ .chatgpt *texto*
ര ׄ ☕˚ .imgg *texto*
ര ׄ ☕˚ .imgg2 *texto*

𓂂𓏸  𐅹੭੭   *\`ᥣіs𝗍ᥲs\`*   📑ᩚ꤬ᰨᰍ
ര ׄ 📑˚ .infem4 *hr + p*
ര ׄ 📑˚ .inmasc4 *hr + p*
ര ׄ 📑˚ .inmixto4 *hr + p*
ര ׄ 📑˚ .infem6 *hr + p*
ര ׄ 📑˚ .inmasc6 *hr + p*
ര ׄ 📑˚ .inmixto6 *hr + p*
ര ׄ 📑˚ .v4fem *hr + p*
ര ׄ 📑˚ .v4masc *hr + p*
ര ׄ 📑˚ .v4mixto *hr + p*
ര ׄ 📑˚ .v6fem *hr + p*
ര ׄ 📑˚ .v6masc *hr + p*
ര ׄ 📑˚ .v6mixto *hr + p*

𓂂𓏸  𐅹੭੭   *\`𝖿rᥲsᥱs\`*   🌻ᩚ꤬ᰨᰍ
ര ׄ 🌻˚ .piropo
ര ׄ 🌻˚ .consejo
ര ׄ 🌻˚ .fraseromantica

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ᥎ᥱr𝗍іძ᥆rᥱs\`*   🪸ᩚ꤬ᰨᰍ
ര ׄ 🪸˚ .tourl *img*
ര ׄ 🪸˚ .tourl *aud*
ര ׄ 🪸˚ .toptt *aud*
ര ׄ 🪸˚ .toptt *vid*
ര ׄ 🪸˚ .tourl *vid*
ര ׄ 🪸˚ .tomp3 *vid*
ര ׄ 🪸˚ .toimg *sticker*

𓂂𓏸  𐅹੭੭   *\`hᥱrrᥲmіᥱᥒ𝗍ᥲs\`*   ⚒ᩚ꤬ᰨᰍ
ര ׄ ⚒️˚ .clima *texto*
ര ׄ ⚒️˚ .readmore *texto*
ര ׄ ⚒️˚ .read *texto*
ര ׄ ⚒️˚ .fake *texto + user + texto*
ര ׄ ⚒️˚ .traducir *idioma + texto*
ര ׄ ⚒️˚ .hd *img*
ര ׄ ⚒️˚ .whatmusic *aud*
ര ׄ ⚒️˚ .whatmusic *vid*
ര ׄ ⚒️˚ .flag *país*
ര ׄ ⚒️˚ .inspect *link*
ര ׄ ⚒️˚ .inspeccionar *link*
ര ׄ ⚒️˚ .nuevafotochannel
ര ׄ ⚒️˚ .nosilenciarcanal
ര ׄ ⚒️˚ .silenciarcanal
ര ׄ ⚒️˚ .seguircanal
ര ׄ ⚒️˚ .avisoschannel
ര ׄ ⚒️˚ .resiviravisos
ര ׄ ⚒️˚ .eliminarfotochannel
ര ׄ ⚒️˚ .reactioneschannel
ര ׄ ⚒️˚ .reaccioneschannel
ര ׄ ⚒️˚ .nuevonombrecanal
ര ׄ ⚒️˚ .nuevadescchannel

𓂂𓏸  𐅹੭੭   *\`grᥙ⍴᥆s\`*   🌵ᩚ꤬ᰨᰍ
ര ׄ 🌵˚ .add *número*
ര ׄ 🌵˚ .grupo *abrir / cerrar*
ര ׄ 🌵˚ .grouptime *tiempo*
ര ׄ 🌵˚ .notify *texto*
ര ׄ 🌵˚ Aviso *texto*
ര ׄ 🌵˚ Admins *texto*
ര ׄ 🌵˚ .todos *texto*
ര ׄ 🌵˚ .setwelcome *texto*
ര ׄ 🌵˚ .groupdesc *texto*
ര ׄ 🌵˚ .setbye *texto*
ര ׄ 🌵˚ .promote *@tag*
ര ׄ 🌵˚ .demote *@tag*
ര ׄ 🌵˚ .kick *@tag*
ര ׄ 🌵˚ .mute *@tag*
ര ׄ 🌵˚ .inactivos *opción*
ര ׄ 🌵˚ .tagnum *prefix*
ര ׄ 🌵˚ .link
ര ׄ 🌵˚ .fantasmas
ര ׄ 🌵˚ .enlinea

𓂂𓏸  𐅹੭੭   *\`ᥱ𝖿ᥱᥴ𝗍᥆s\`*   🪻ᩚ꤬ᰨᰍ
ര ׄ 🪻˚ .bass *vid*
ര ׄ 🪻˚ .blown *vid*
ര ׄ 🪻˚ .deep *vid*
ര ׄ 🪻˚ .earrape *vid*
ര ׄ 🪻˚ .fast *vid*
ര ׄ 🪻˚ .smooth *vid*
ര ׄ 🪻˚ .tupai *vid*
ര ׄ 🪻˚ .nightcore *vid*
ര ׄ 🪻˚ .reverse *vid*
ര ׄ 🪻˚ .robot *vid*
ര ׄ 🪻˚ .slow *vid*
ര ׄ 🪻˚ .squirrel *vid*
ര ׄ 🪻˚ .chipmunk *vid*
ര ׄ 🪻˚ .reverb *vid*
ര ׄ 🪻˚ .chorus *vid*
ര ׄ 🪻˚ .flanger *vid*
ര ׄ 🪻˚ .distortion *vid*
ര ׄ 🪻˚ .pitch *vid*
ര ׄ 🪻˚ .highpass *vid*
ര ׄ 🪻˚ .lowpass *vid*
ര ׄ 🪻˚ .underwater *vid*

𓂂𓏸  𐅹੭੭   *\`serbot\`*   🌵ᩚ꤬ᰨᰍ
ര ׄ 🪸˚ .code
ര ׄ 🪸˚ .delsesion
ര ׄ 🪸˚ .bots
ര ׄ 🪸˚ .token *(Por si perdiste tu token de reconexión)*

𓂂𓏸  𐅹੭੭   *\`ძі᥎ᥱrsі᥆ᥒ\`*   🥯ᩚ꤬ᰨᰍ
ര ׄ 🥯˚ .gay *@tag*
ര ׄ 🥯˚ .lesbiana *@tag*
ര ׄ 🥯˚ .pajero *@tag*
ര ׄ 🥯˚ .pajera *@tag*
ര ׄ 🥯˚ .puto *@tag*
ര ׄ 🥯˚ .puta *@tag*
ര ׄ 🥯˚ .manco *@tag*
ര ׄ 🥯˚ .manca *@tag*
ര ׄ 🥯˚ .rata *@tag*
ര ׄ 🥯˚ .prostituto *@tag*
ര ׄ 🥯˚ .prostituta *@tag*
ര ׄ 🥯˚ .doxear *@tag*
ര ׄ 🥯˚ .jalamela *@tag*
ര ׄ 🥯˚ .simi *texto*
ര ׄ 🥯˚ .pregunta *texto*
ര ׄ 🥯˚ .genio *texto*
ര ׄ 🥯˚ .top
ര ׄ 🥯˚ .sorteo
ര ׄ 🥯˚ .piropo
ര ׄ 🥯˚ .chiste
ര ׄ 🥯˚ .facto
ര ׄ 🥯˚ .verdad
ര ׄ 🥯˚ .pareja
ര ׄ 🥯˚ .parejas
ര ׄ 🥯˚ .love
ര ׄ 🥯˚ .personalidad

𓂂𓏸  𐅹੭੭   *\`ȷᥙᥱg᥆s\`*   🐚ᩚ꤬ᰨᰍ
ര ׄ 🐚˚ .pregunta *texto*
ര ׄ 🐚˚ .ttt *texto*
ര ׄ 🐚˚ .ptt *opción*
ര ׄ 🐚˚ .delttt
ര ׄ 🐚˚ .acertijo
ര ׄ 🐚˚ .trivia

𓂂𓏸  𐅹੭੭   *\`ᥲᥒіmᥱ\`*   🐚ᩚ꤬ᰨᰍ
ര ׄ 🏕️˚ .messi

𓂂𓏸  𐅹੭੭   *\`gі𝖿s ᥒs𝖿ա\`*   🔥ᩚ꤬ᰨᰍ
ര ׄ 🔥˚ .violar *@tag*
ര ׄ 🔥˚ .follar *@tag*
ര ׄ 🔥˚ .anal *@tag*
ര ׄ 🔥˚ .coger *@tag*
ര ׄ 🔥˚ .coger2 *@tag*
ര ׄ 🔥˚ .penetrar *@tag*
ര ׄ 🔥˚ .sexo *@tag*
ര ׄ 🔥˚ .rusa *@tag*
ര ׄ 🔥˚ .sixnine *@tag*
ര ׄ 🔥˚ .pies *@tag*
ര ׄ 🔥˚ .mamada *@tag*
ര ׄ 🔥˚ .lickpussy *@tag*
ര ׄ 🔥˚ .grabboobs *@tag*
ര ׄ 🔥˚ .suckboobs *@tag*
ര ׄ 🔥˚ .cum *@tag*
ര ׄ 🔥˚ .fap *@tag*
ര ׄ 🔥˚ .manosear *@tag*
ര ׄ 🔥˚ .lesbianas *@tag*

𓂂𓏸  𐅹੭੭   *\`s𝗍іᥴkᥱrs\`*   🍦ᩚ꤬ᰨᰍ
ര ׄ 🍦˚ .sticker *img*
ര ׄ 🍦˚ .sticker *vid*
ര ׄ 🍦˚ .brat *texto*
ര ׄ 🍦˚ .qc *texto*
ര ׄ 🍦˚ .dado

𓂂𓏸  𐅹੭੭   *\`r⍴g\`*   💸ᩚ꤬ᰨᰍ
ര ׄ 💸˚ .minar
ര ׄ 💸˚ .cofre
ര ׄ 💸˚ .slut
ര ׄ 💸˚ .nivel
ര ׄ 💸˚ .ruleta

𓂂𓏸  𐅹੭੭   *\`rᥱgіs𝗍r᥆\`*   🎣ᩚ꤬ᰨᰍ
ര ׄ 🎣˚ .perfil
ര ׄ 🎣˚ .reg
ര ׄ 🎣˚ .unreg

𓂂𓏸  𐅹੭੭   *\`᥆աᥒᥱr\`*   🍀ᩚ꤬ᰨᰍ
ര ׄ 🍀˚ .salir
ര ׄ 🍀˚ .update
ര ׄ 🍀˚ .blocklist
ര ׄ 🍀˚ .grouplist
ര ׄ 🍀˚ .restart
ര ׄ 🍀˚ .join
ര ׄ 🍀˚ .chetar
ര ׄ 🍀˚ .unbanuser
`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, // Video fijo
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 0,
                externalAdReply: {
                    title: '⏤͟͞ू⃪ ፝͜⁞Sʜᴀᴅᴏᴡ✰⃔࿐\nNᴜᴇᴠᴀ Vᴇʀsɪᴏɴ Uʟᴛʀᴀ 🚀 💫',
                    thumbnailUrl: perfil,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            gifPlayback: true,
            gifAttribution: 0
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*[ ℹ️ ] El menu cuenta actualmente con un pequeño error.*\n\n${e}`)
    }
}

handler.help = ['menuff'];
handler.tags = ['main'];
handler.customPrefix = /m|@|./i;
handler.command = ['menu', 'enu']
handler.fail = null;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
