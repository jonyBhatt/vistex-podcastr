"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGeneratePodcast } from "@/hooks/useGeneratePodcast";
import { GeneratePodcastProps } from "@/types";
import { Loader } from "lucide-react";
import { useState } from "react";

export const GeneratePodcast = ({
  setAudioStorageId,
  setAudioDuration,
  audio,
  setVoicePrompt,
  setAudio,
  voicePrompt,
  voiceType,
}: GeneratePodcastProps) => {
  const { generatePodcast, isGeneratingPodcast } = useGeneratePodcast({
    setAudioStorageId,
    setAudioDuration,
    audio,
    setVoicePrompt,
    setAudio,
    voicePrompt,
    voiceType,
  });
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI prompt generate podcast
        </Label>
        <Textarea
          placeholder="Provide text to generate audio"
          className="input-class font-light focus-visible:ring-offset-orange-1  focus-visible:ring-ring  placeholder:text-gray-1"
          rows={5}
          value={voicePrompt}
          onChange={(e) => setVoicePrompt(e.target.value)}
        />
        <div className="mt-2 w-full max-w-[200px]">
          <Button
            type="submit"
            size={"lg"}
            className="text-16  bg-orange-1 py-4 font-bold text-white-1"
          >
            {isGeneratingPodcast ? (
              <>
                Generating...
                <Loader size={20} className="animate-spin mr-2.5" />
              </>
            ) : (
              "Generate Podcast"
            )}
          </Button>
        </div>
        {audio && (
          <audio
            controls
            src={audio}
            className="mt-5"
            autoPlay
            onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
          />
        )}
      </div>
    </div>
  );
};
