"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="mt-9 flex flex-col gap-9 font-manrope">
      <section className="flex  flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1 ">Trending Podcast</h1>
        <div className="podcast_grid">
          {podcastData.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              id={podcast.id}
              description={podcast.description}
              imgURL={podcast.imgURL}
              title={podcast.title}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home;
