import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Story } from "@/types/story";
import { X, ChevronUp, ChevronDown, Play, Pause, Heart, Share, Volume2, VolumeX, Clock, Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface ShortsViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onStoryChange: (storyId: string) => void;
}

export const ShortsViewer = ({ stories, initialStoryIndex, isOpen, onClose, onStoryChange }: ShortsViewerProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentStoryIndex(initialStoryIndex);
      setCurrentSceneIndex(0);
      setIsPlaying(true);
      setIsLiked(false);
    }
  }, [isOpen, initialStoryIndex]);

  useEffect(() => {
    if (stories[currentStoryIndex]) {
      onStoryChange(stories[currentStoryIndex].id);
    }
  }, [currentStoryIndex, stories, onStoryChange]);

  // Auto-play scenes within a story
  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const currentStory = stories[currentStoryIndex];
    if (!currentStory) return;

    const timer = setTimeout(() => {
      if (currentSceneIndex < currentStory.scenes.length - 1) {
        setCurrentSceneIndex(prev => prev + 1);
      } else {
        // Move to next story when current story ends
        handleNextStory();
      }
    }, 4000); // 4 seconds per scene

    return () => clearTimeout(timer);
  }, [currentSceneIndex, currentStoryIndex, isPlaying, isOpen, stories]);

  if (!stories.length || !stories[currentStoryIndex]) return null;

  const currentStory = stories[currentStoryIndex];
  const currentScene = currentStory.scenes[currentSceneIndex];
  const hasNextStory = currentStoryIndex < stories.length - 1;
  const hasPrevStory = currentStoryIndex > 0;

  const handleNextStory = () => {
    if (hasNextStory) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentSceneIndex(0);
      setIsLiked(false);
    }
  };

  const handlePrevStory = () => {
    if (hasPrevStory) {
      setCurrentStoryIndex(prev => prev - 1);
      setCurrentSceneIndex(0);
      setIsLiked(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites! ❤️");
  };

  const handleShare = () => {
    navigator.share?.({
      title: currentStory.title,
      text: `Check out this magical story: ${currentStory.title}`,
      url: window.location.href
    }).catch(() => {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href);
      toast.success("Story link copied to clipboard!");
    });
  };

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'Fantasy':
        return 'bg-story-fantasy';
      case 'Adventure':
        return 'bg-story-adventure';
      case 'Bedtime':
        return 'bg-story-bedtime';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none h-screen w-screen p-0 bg-black border-none">
        <div ref={containerRef} className="relative h-full w-full overflow-hidden">
          {/* Main Story Content */}
          <div className="h-full w-full relative">
            {currentScene && (
              <div className="h-full w-full relative">
                {/* Story Image */}
                <img
                  src={currentScene.image_url}
                  alt={currentStory.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-medium">Story {currentStoryIndex + 1} of {stories.length}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/30 text-white hover:bg-black/50 rounded-full"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Story Progress Bars */}
                <div className="absolute top-16 left-4 right-4 z-20">
                  <div className="flex gap-1">
                    {currentStory.scenes.map((_, index) => (
                      <div
                        key={index}
                        className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                          index === currentSceneIndex
                            ? 'bg-white'
                            : index < currentSceneIndex
                            ? 'bg-white/70'
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Story Text */}
                <div className="absolute bottom-0 left-0 right-20 p-6 z-10">
                  <div className="space-y-4">
                    {/* Story Metadata */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={`${getGenreColor(currentStory.genre)} text-white border-none`}>
                        {currentStory.genre}
                      </Badge>
                      <Badge variant="outline" className="bg-black/20 text-white border-white/30">
                        Age {currentStory.age_group}
                      </Badge>
                      <Badge variant="outline" className="bg-black/20 text-white border-white/30">
                        {currentStory.moral_lesson}
                      </Badge>
                    </div>

                    {/* Story Title */}
                    <h2 className="text-white text-xl font-bold leading-tight">
                      {currentStory.title}
                    </h2>
                    
                    {/* Scene Text */}
                    <p className="text-white text-base leading-relaxed font-medium opacity-90">
                      {currentScene.text}
                    </p>

                    {/* Story Stats */}
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <div className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        <span>{currentStory.times_played} plays</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{Math.ceil(currentStory.duration_seconds / 60)}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(currentStory.created_at), 'MMM d')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="absolute right-4 bottom-6 flex flex-col gap-6 z-20">
                  {/* Play/Pause */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-black/30 text-white hover:bg-black/50 rounded-full w-12 h-12"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </Button>

                  {/* Like */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLike}
                      className={`${
                        isLiked 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'bg-black/30 text-white hover:bg-black/50'
                      } rounded-full w-12 h-12 transition-colors`}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <span className="text-white text-xs font-medium">Like</span>
                  </div>

                  {/* Share */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShare}
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full w-12 h-12"
                    >
                      <Share className="w-6 h-6" />
                    </Button>
                    <span className="text-white text-xs font-medium">Share</span>
                  </div>

                  {/* Sound */}
                  <div className="flex flex-col items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMuted(!isMuted)}
                      className="bg-black/30 text-white hover:bg-black/50 rounded-full w-12 h-12"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </Button>
                    <span className="text-white text-xs font-medium">Sound</span>
                  </div>
                </div>

                {/* Navigation Hints */}
                {hasNextStory && (
                  <div className="absolute right-1/2 top-1/4 transform translate-x-1/2">
                    <div className="bg-white/10 rounded-full p-2 animate-bounce">
                      <ChevronUp className="w-4 h-4 text-white" />
                      <span className="text-white text-xs block text-center mt-1">Next Story</span>
                    </div>
                  </div>
                )}

                {hasPrevStory && (
                  <div className="absolute right-1/2 bottom-1/4 transform translate-x-1/2">
                    <div className="bg-white/10 rounded-full p-2 animate-bounce">
                      <ChevronDown className="w-4 h-4 text-white" />
                      <span className="text-white text-xs block text-center mt-1">Prev Story</span>
                    </div>
                  </div>
                )}

                {/* Touch Areas for Navigation */}
                <div
                  className="absolute top-0 left-0 right-0 h-1/3 cursor-pointer z-10"
                  onClick={handlePrevStory}
                />
                <div
                  className="absolute bottom-0 left-0 right-20 h-1/3 cursor-pointer z-10"
                  onClick={handleNextStory}
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};