"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useState } from "react";
import { GeneratePodcast } from "./GeneratePodcast";
import { GenerateThumbnail } from "./GenerateThumbnail";
import { Id } from "@/convex/_generated/dataModel";
import { VoiceType } from "@/types";

const formSchema = z.object({
  podcastTitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  podcastDescription: z.string().min(2),
});
export const CreatePodcastForm = () => {
  /**
   * * Voice
   */
  const [voiceType, setVoiceType] = useState<VoiceType>("alloy");
  const [voicePrompt, setVoicePrompt] = useState("");
  /**
   * * Image
   */
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  /**
   * * Audio
   */
  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-12 flex w-full flex-col"
      >
        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
          <FormField
            control={form.control}
            name="podcastTitle"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">
                  Podcast Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="input-class outline-0  focus-visible:ring-ring focus-visible:ring-offset-0  focus-visible:ring-orange-1"
                    placeholder="Podcast"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2.5">
            <Label className="text-16 font-bold text-white-1">
              Select AI voice
            </Label>
            <Select onValueChange={(value: VoiceType) => setVoiceType(value)}>
              <SelectTrigger
                className={cn(
                  "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1 focus:ring-0"
                )}
              >
                <SelectValue
                  placeholder="Select voice"
                  className="placeholder:text-gray-1"
                />
              </SelectTrigger>
              <SelectContent className="text-16 border-none bg-black-1 font-bold text-white-1 focus:ring-orange-1">
                {voiceCategories.map((cat) => (
                  <SelectItem
                    value={cat}
                    key={cat}
                    className="capitalize focus:bg-orange-1"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
              {voiceType && (
                <audio src={`/${voiceType}.mp3`} autoPlay className="hidden" />
              )}
            </Select>
          </div>

          <FormField
            control={form.control}
            name="podcastDescription"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">
                  Podcast Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="input-class outline-0  focus-visible:ring-ring focus-visible:ring-offset-0  focus-visible:ring-orange-1"
                    placeholder="Podcast description"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col pt-10">
          <GeneratePodcast
            setAudioStorageId={setAudioStorageId}
            setAudioDuration={setAudioDuration}
            setAudio={setAudioUrl}
            audio={audioUrl}
            voiceType={voiceType}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
          />
          <GenerateThumbnail />

          <div className="mt-10 w-full">
            <Button
              type="submit"
              className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-2"
            >
              {isSubmitting ? (
                <>
                  Submitting...
                  <Loader size={20} className="animate-spin mr-2.5" />
                </>
              ) : (
                "Submit & Publish Podcast"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
