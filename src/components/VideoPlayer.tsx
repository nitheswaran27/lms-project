import { useRef, useEffect, useState, useCallback } from "react";
import { PlayCircle, PauseCircle, RotateCcw } from "lucide-react";

interface VideoPlayerProps {
  url: string;
  onProgress: (progress: number) => void;
  onEnded: () => void;
}

const VideoPlayer = ({ url, onProgress, onEnded }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const restartVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play();
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      onProgress(progress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded();
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Prevent seeking
    let lastKnownTime = 0;
    const handleSeeking = () => {
        if (video.currentTime > lastKnownTime + 1 || video.currentTime < lastKnownTime - 1) { // Allow for minor time updates, but prevent large jumps
            video.currentTime = lastKnownTime;
        }
    };
    const handleSeeked = () => {
        lastKnownTime = video.currentTime;
    };


    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("seeking", handleSeeking);
    video.addEventListener("seeked", handleSeeked);


    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("seeking", handleSeeking);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [onProgress, onEnded]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      <video
        ref={videoRef}
        src={url}
        className="h-full w-full"
        poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
        onDoubleClick={togglePlay} // Optional: double click to play/pause
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <div className="flex items-center justify-between">
          <button onClick={togglePlay} className="text-white text-2xl">
            {isPlaying ? <PauseCircle /> : <PlayCircle />}
          </button>
          <button onClick={restartVideo} className="ml-2 text-white text-2xl">
            <RotateCcw />
          </button>
          <div className="flex-grow mx-4 h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
