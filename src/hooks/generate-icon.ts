#!/usr/bin/env bun
/**
 * Script para gerar todos os ícones PWA necessários a partir de uma imagem base.
 * Requer: sharp (bun add sharp)
 *
 * Uso:
 *   bun generate-icons.ts seu-logo.png
 */

import { mkdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';

let sharp: any;

try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('❌ sharp não instalado!');
  console.error('📦 Instale com: bun add sharp');
  process.exit(1);
}

// Tamanhos de ícones para PWA
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Cores padrão
const BACKGROUND_COLOR = '#000000';
const FOREGROUND_COLOR = '#ffffff';

/**
 * Cria um ícone placeholder com 'TRE' escrito via SVG
 */
async function createPlaceholderIcon(size: number, outputPath: string) {
  const fontSize = Math.floor(size * 0.3);

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${BACKGROUND_COLOR}"/>
      <text
        x="50%" y="50%"
        font-family="Arial, sans-serif"
        font-size="${fontSize}"
        font-weight="bold"
        fill="${FOREGROUND_COLOR}"
        text-anchor="middle"
        dominant-baseline="central"
      >TRE</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ Criado: icon-${size}x${size}.png (${size}x${size})`);
}

/**
 * Redimensiona uma imagem para o tamanho especificado
 */
async function resizeImage(inputPath: string, size: number, outputPath: string) {
  try {
    await sharp(inputPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(outputPath);

    console.log(`✅ Criado: icon-${size}x${size}.png (${size}x${size})`);
  } catch (err:any) {
    console.error(`❌ Erro ao processar imagem: ${err.message}`);
  }
}

async function prompt(question: string | Uint8Array<ArrayBufferLike>) {
  process.stdout.write(question);
  for await (const line of process.stdin) {
    return line.toString().trim();
  }
}

async function main() {
  let inputImage = null;

  if (process.argv.length < 3) {
    console.log('📖 Uso: bun generate-icons.ts <imagem-base.png>');
    console.log('\n🎨 Ou execute sem argumentos para criar ícones placeholder:');
    console.log('   bun generate-icons.ts');

    const response = await prompt('\n❓ Criar ícones placeholder? (s/n): ');
    if (response.toLowerCase() !== 's') {
      process.exit(0);
    }
  } else {
    inputImage = resolve(process.argv[2]);

    if (!existsSync(inputImage)) {
      console.error(`❌ Arquivo não encontrado: ${inputImage}`);
      process.exit(1);
    }
  }

  // Cria pasta de ícones
  const outputDir = join(process.cwd(), 'public', 'icons');
  mkdirSync(outputDir, { recursive: true });

  console.log('\n🎨 Gerando ícones PWA...\n');

  for (const size of ICON_SIZES) {
    const outputPath = join(outputDir, `icon-${size}x${size}.png`);

    if (inputImage) {
      await resizeImage(inputImage, size, outputPath);
    } else {
      await createPlaceholderIcon(size, outputPath);
    }
  }

  console.log('\n✅ Todos os ícones foram gerados!');
  console.log(`📁 Local: ${outputDir}`);

  console.log('\n📝 Próximos passos:');
  if (!inputImage) {
    console.log('   1. Substitua os ícones placeholder pelo seu logo real');
    console.log('   2. Execute novamente: bun generate-icons.ts seu-logo.png');
  } else {
    console.log('   1. Verifique os ícones gerados');
    console.log('   2. Execute: npm run build && npm run start');
    console.log('   3. Teste o PWA no navegador!');
  }
}

main();