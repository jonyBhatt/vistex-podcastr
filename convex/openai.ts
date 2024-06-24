import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const generateAudio = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_: any, args: { input: string; voice: string }) => {
    // do something with `args.a` and `args.b`
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: args.voice as SpeechCreateParams["voice"],
      input: args.input,
    });
    const buffer = await mp3.arrayBuffer();

    // optionally return a value
    return buffer;
  },
});
