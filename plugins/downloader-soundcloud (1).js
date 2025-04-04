import fetch from "node-fetch";
import yts from "yt-search";

// API en formato Base64
const encodedApi = "aHR0cHM6Ly9hcGkudnJlZGVuLndlYi5pZC9hcGkveXRtcDQ=";

// Función para decodificar la URL de la API
const getApiUrl = () => Buffer.from(encodedApi, "base64").toString("utf-8");

// Función para obtener datos de la API con reintentos
const fetchWithRetries = async (url, maxRetries = 2) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.status === 200 && data.result?.download?.url) {
        return data.result;
      }
    } catch (error) {
      console.error(`Intento ${attempt + 1} fallido:`, error.message);
    }
  }
  throw new Error("No se pudo obtener el video después de varios intentos.");
};

// Handler principal
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text || !text.trim()) {
    return conn.sendMessage(m.chat, {
      text: `❗ *Ingresa un término de búsqueda para encontrar el video.*\n\n*Ejemplo:* ${usedPrefix}play No llores más`,
    });
  }

  try {
    // Reacción inicial
    await conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    // Buscar video en YouTube
    const searchResults = await yts(text.trim());
    const video = searchResults.videos[0];
    if (!video) throw new Error("No se encontraron resultados.");

    // Obtener datos de descarga desde la API
    const apiUrl = `${getApiUrl()}?url=${encodeURIComponent(video.url)}`;
    const apiData = await fetchWithRetries(apiUrl);
    const audioUrl = apiData?.download?.url;
    if (!audioUrl) throw new Error("No se pudo obtener el enlace de descarga del audio.");

    // Enviar información del video con miniatura y botón
    await conn.sendMessage(m.chat, {
      image: { url: video.thumbnail },
      caption: `🎶 *Título:* ${video.title}\n👀 *Reproducciones:* ${video.views}\n⏱️ *Duración:* ${video.timestamp}\n📝 *Creador:* ${video.author.name}`,
      buttons: [
        {
          buttonId: `${usedPrefix}ytmp4 ${video.url}`,
          buttonText: { displayText: "📥 Video" },
          type: 1,
        },
      ],
    });

    // Enviar audio (NO PTT)
    const audioMessage = {
      audio: { url: audioUrl },
      mimetype: 'audio/mp4',
      fileName: `${video.title}.mp3`,
    };

    await conn.sendMessage(m.chat, audioMessage, { quoted: m });

    // Reacción final
    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

  } catch (error) {
    console.error("Error:", error);

    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    await conn.sendMessage(m.chat, {
      text: `❌ *Error al procesar tu solicitud:*\n${error.message || "Error desconocido"}`,
    });
  }
};

// Configuración del comando
handler.command = ['play', 'mp3'];
handler.help = ['play'];
handler.tags = ['play'];

export default handler;
