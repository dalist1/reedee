import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment } from "react";
import * as pdfjs from 'pdfjs-dist';

export default pdfjs;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function MockAPI() {
  const data = await fetch("/api/mock").then((response) => response.json().then((data) => data.msg))
  return data
}

export function splitTextIntoBionicComponents(text: string) {
  return text.split(' ').map((word, i) => {
    if (word.length > 3) {
      const firstThreeLetters = word.slice(0, 3);
      const restOfWord = word.slice(3);
      return (
        <Fragment key={i}>
          <span className="font-bold underline">{firstThreeLetters}</span>
          {restOfWord + ' '}
        </Fragment>
      );
    }
    return word + ' ';
  });
}

export const audioBufferToWavBlob = (audioBuffer) => {
  const numChannels = audioBuffer.numberOfChannels;
  const numFrames = audioBuffer.length;
  const sampleRate = audioBuffer.sampleRate;
  const format = 1; // PCM format
  const bitDepth = 16; // Assuming 16-bit PCM data

  const blockAlign = numChannels * bitDepth / 8;
  const byteRate = sampleRate * blockAlign;

  // Create the WAV file header
  const buffer = new ArrayBuffer(44 + numFrames * blockAlign);
  const view = new DataView(buffer);

  // "RIFF" chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + numFrames * blockAlign, true); // RIFF chunk size
  writeString(view, 8, 'WAVE'); // Format

  // "fmt " subchunk (format details)
  writeString(view, 12, 'fmt '); // Subchunk ID
  view.setUint32(16, 16, true); // Subchunk size (16 for PCM)
  view.setUint16(20, format, true); // Audio format (PCM = 1)
  view.setUint16(22, numChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, byteRate, true); // Byte rate
  view.setUint16(32, blockAlign, true); // Block align
  view.setUint16(34, bitDepth, true); // Bits per sample

  // "data" subchunk (audio data)
  writeString(view, 36, 'data');
  view.setUint32(40, numFrames * blockAlign, true); // Subchunk size (data size)

  // Write PCM data
  let offset = 44; // Skip header
  for (let i = 0; i < numFrames; i++) {
    for (let channel = 0; channel < numChannels; channel++) {
      const input = audioBuffer.getChannelData(channel);
      const sample = Math.max(-1, Math.min(1, input[i])); // Clamp to [-1, 1]
      const sample16Bit = sample < 0 ? sample * 0x8000 : sample * 0x7FFF; // Convert to 16-bit
      view.setInt16(offset, sample16Bit, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
};

// Helper function to write a string to the DataView
const writeString = (view, offset, string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};


// Merge Audio buffers helper func.
export const mergeAudioBuffers = (buffers, context) => {
  const sampleRates = new Set(buffers.map((b) => b.sampleRate));
  if (sampleRates.size > 1) {
    throw new Error('Cannot merge AudioBuffers with different sample rates.');
  }

  const numChannels = Math.max(...buffers.map((b) => b.numberOfChannels));
  const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
  const output = context.createBuffer(numChannels, totalLength, [...sampleRates][0]);

  let offset = 0;
  buffers.forEach((buffer) => {
    for (let channel = 0; channel < numChannels; channel++) {
      const bufferChannelData = buffer.getChannelData(channel);
      if (output.getChannelData(channel)) {
        output.getChannelData(channel).set(bufferChannelData, offset);
      }
    }
    offset += buffer.length;
  });

  return output;
};


export const splitTextIntoSentences = (text: string) => {
  return text.match(/[^\.!\?]+[\.!\?]+/g);
}