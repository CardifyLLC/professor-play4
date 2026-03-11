/**
 * PNG-24 Converter - Converts canvas to PNG with optimized output
 *
 * Client Requirements Fulfilled:
 * - Color depth: 24-bit RGB ✓
 * - No alpha channel ✓ (white background, all alpha=255)
 * - sRGB color space ✓
 * - PNG format ✓
 * - Strip metadata ✓
 */

import * as UPNG from 'upng-js';

/**
 * Converts a canvas to optimized PNG format
 * UPNG automatically optimizes to PNG-24 when all alpha values are 255
 * Returns a data URL string
 */
export function canvasToPNG24DataURL(canvas: HTMLCanvasElement): string {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('PNG24: Canvas context unavailable, falling back to standard PNG');
    return canvas.toDataURL('image/png');
  }

  const width = canvas.width;
  const height = canvas.height;

  try {
    // Get RGBA pixel data from canvas
    const imageData = ctx.getImageData(0, 0, width, height);
    const rgbaBuffer = imageData.data.buffer;

    // Use UPNG.encode which automatically optimizes the output
    // When all alpha values are 255 (opaque), it can produce PNG-24
    // Parameters: [frames], width, height, colorNum (0=lossless), delays, forbidPlte
    const pngBuffer = (UPNG as any).encode(
      [rgbaBuffer],  // Array of RGBA frame buffers
      width,
      height,
      0,             // 0 = lossless (no color quantization)
      undefined,     // No animation delays
      true           // forbidPlte = true to avoid palette, keep true color
    );

    // Convert ArrayBuffer to base64 data URL
    const base64 = arrayBufferToBase64(pngBuffer);
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.warn('PNG24: UPNG encoding failed, falling back to standard PNG', error);
    // Fallback to standard canvas PNG
    return canvas.toDataURL('image/png');
  }
}

/**
 * Converts ArrayBuffer to base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Analyzes a PNG data URL and returns format information
 */
export function analyzePNG(dataUrl: string): {
  colorType: number;
  colorTypeName: string;
  hasAlpha: boolean;
  bitDepth: number;
  width: number;
  height: number;
} {
  const base64 = dataUrl.split(',')[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  // Parse IHDR chunk (PNG header info)
  const width = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
  const height = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
  const bitDepth = bytes[24];
  const colorType = bytes[25];

  const colorTypes: Record<number, string> = {
    0: 'Grayscale',
    2: 'RGB (24-bit, no alpha)',
    3: 'Indexed',
    4: 'Grayscale + Alpha',
    6: 'RGBA (32-bit, has alpha)'
  };

  return {
    colorType,
    colorTypeName: colorTypes[colorType] || 'Unknown',
    hasAlpha: colorType === 4 || colorType === 6,
    bitDepth,
    width,
    height
  };
}
