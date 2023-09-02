import { useInfiniteQuery } from "@tanstack/react-query";
import VideoItem from "../components/VideoItem";
import { useState, useRef, useEffect } from "react";
import useYouTubeAPI from "../hooks/useYouTubeAPI";
import { CategoryId, FetchVideos } from "../types/instance";

const CATEGORYS: CategoryId[] = ["0", "10", "15", "17", "20"];

export default function HomePage() {
  const [category, setCategory] = useState<CategoryId>("0");
  const { instance } = useYouTubeAPI();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery<FetchVideos>(
      ["videos", category],
      ({ pageParam }) =>
        instance.fetchVideos({
          categoryId: category,
          pageToken: pageParam,
        }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPageToken,
        staleTime: 1000 * 60 * 10,
      }
    );

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || !hasNextPage) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
  }, [isLoading, hasNextPage]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error...</div>}
      {CATEGORYS.map((cat) => (
        <button
          key={cat}
          className="p-2 border mr-2"
          onClick={() => setCategory(cat)}
        >
          {cat}
        </button>
      ))}
      <div className="p-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.pages.map((page) =>
          page.items.map((video) => <VideoItem key={video.id} video={video} />)
        )}
      </div>
      <div ref={loadMoreRef} />
    </>
  );
}
