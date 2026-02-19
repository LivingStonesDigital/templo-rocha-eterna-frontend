import { MetadataRoute } from "next";

/**
 * Exemplo AVANÇADO de manifest.ts com recursos dinâmicos
 * 
 * Para usar este exemplo:
 * 1. Renomeie para app/manifest.ts
 * 2. Crie um arquivo .env.local com as variáveis
 * 3. Customize conforme necessário
 */

export default function manifest(): MetadataRoute.Manifest {
  // Detecta ambiente
  // const isDev = process.env.NODE_ENV === "development";
  
  // Usa variáveis de ambiente (opcional)
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Templo Rocha Eterna";
  const themeColor = process.env.NEXT_PUBLIC_THEME_COLOR || "#fff";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "/";
  
  // Nome diferente em dev
  // const displayName = isDev ? `${appName} (Dev)` : appName;
  const displayName = "TRE"
  
  return {
    // Informações básicas
    name: displayName,
    short_name: process.env.NEXT_PUBLIC_APP_SHORT_NAME || "TRE",
    description:
      process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
      "Templo Rocha Eterna - Igreja Evangélica Pentecostal",
    
    // URLs
    start_url: baseUrl,
    scope: baseUrl,
    
    // Aparência
    display: "standalone", // "standalone", "fullscreen", "minimal-ui", "browser"
    orientation: "portrait", // "portrait", "landscape", "any"
    
    // Cores
    background_color: "#fff",
    theme_color: themeColor,
    
    // Ícones - todos os tamanhos para máxima compatibilidade
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable", // "maskable" para Android adaptativo
      },
    ],
    
    // Metadados adicionais
    lang: "pt-BR",
    dir: "ltr", // "ltr" (esquerda→direita) ou "rtl" (direita→esquerda)
    
    // Categorias (para lojas de apps)
    categories: ["religion", "lifestyle", "social"],
    
    // Screenshots (opcional - para promover o app)
    // screenshots: [
    //   {
    //     src: "/screenshots/home.png",
    //     sizes: "540x720",
    //     type: "image/png",
    //   },
    // ],
    
    // Atalhos (aparecem ao clicar com botão direito no ícone)
    // shortcuts: [
    //   {
    //     name: "Cultos",
    //     short_name: "Cultos",
    //     description: "Ver programação de cultos",
    //     url: "/cultos",
    //     icons: [{ src: "/icons/shortcut-cultos.png", sizes: "96x96" }],
    //   },
    // ],
  };
}

/**
 * EXEMPLO DE .env.local:
 * 
 * NEXT_PUBLIC_APP_NAME="Templo Rocha Eterna"
 * NEXT_PUBLIC_APP_SHORT_NAME="TRE"
 * NEXT_PUBLIC_APP_DESCRIPTION="Templo Rocha Eterna - Igreja Evangélica Pentecostal"
 * NEXT_PUBLIC_THEME_COLOR="#000000"
 * NEXT_PUBLIC_BASE_URL="/"
 */
