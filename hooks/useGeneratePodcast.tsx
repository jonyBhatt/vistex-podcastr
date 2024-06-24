import { api } from "@/convex/_generated/api";
import { GeneratePodcastProps } from "@/types";
import { useAction } from "convex/react";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid'

export const useGeneratePodcast = (props: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const getPodcastAudio = useAction(api.openai.generateAudio);

  // TODO: Logic call the open AI
  const generatePodcast = async () => {
    setIsGenerating(true);
    props.setAudio("");

    if (!props.voicePrompt) {
      // Todo: show error message
      return setIsGenerating(false);
    }
    try {
      const response = await getPodcastAudio({
        voice: props.voiceType,
        input: props.voicePrompt
      })

      const blob = new Blob([response], {type:"audio/mpeg"})
      const fileName = `podcast-${uuidv4}.mp3`
      const file = new File([blob], fileName, {type:"audio/mpeg"})


    } catch (error) {
      console.log("Error in podcast generating");
      setIsGenerating(false);
    }
  };
  return {
    isGeneratingPodcast: false,
    generatePodcast: () => {},
  };
};
