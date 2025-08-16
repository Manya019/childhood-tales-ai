import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Story, StoryScene } from "@/types/story";
import { X, ChevronUp, ChevronDown, Play, Pause, Heart, Share, Volume2, VolumeX, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface StoryViewerProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StoryViewer = ({ story, isOpen, onClose }: StoryViewerProps) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen && story) {
      setCurrentSceneIndex(0);
      setIsPlaying(false);
    }
  }, [isOpen, story]);

  if (!story) return null;

  const currentScene = story.scenes[currentSceneIndex];
  const hasNextScene = currentSceneIndex < story.scenes.length - 1;
  const hasPrevScene = currentSceneIndex > 0;

  const handleNextScene = () => {
    if (hasNextScene) {
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrevScene = () => {
    if (hasPrevScene) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  const handleSwipeUp = () => {
    handleNextScene();
  };

  const handleSwipeDown = () => {
    handlePrevScene();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none h-screen w-screen p-0 bg-black">
        <div className="relative h-full w-full flex flex-col">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Scene content */}
          <div className="flex-1 relative overflow-hidden">
            {currentScene && (
              <div className="h-full w-full relative">
                <img
                  src={currentScene.image_url}
                  alt={`Scene ${currentSceneIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Story text overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <p className="text-white text-lg leading-relaxed font-medium">
                    {currentScene.text}
                  </p>
                </div>

                {/* Navigation hints */}
                {hasNextScene && (
                  <div className="absolute right-4 bottom-1/2 transform translate-y-1/2">
                    <div className="bg-white/20 rounded-full p-2 animate-bounce">
                      <ChevronUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {hasPrevScene && (
                  <div className="absolute left-4 bottom-1/2 transform translate-y-1/2">
                    <div className="bg-white/20 rounded-full p-2 animate-bounce">
                      <ChevronDown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {/* Scene progress */}
                <div className="absolute top-4 left-4 right-16">
                  <div className="flex gap-1">
                    {story.scenes.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
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

                {/* Story info */}
                <div className="absolute top-16 left-4">
                  <h2 className="text-white text-xl font-bold mb-1">{story.title}</h2>
                  <p className="text-white/70 text-sm">
                    Scene {currentSceneIndex + 1} of {story.scenes.length}
                  </p>
                </div>
              </div>
            )}

            {/* Touch/swipe areas for mobile */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2 cursor-pointer"
              onClick={handleSwipeDown}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2 cursor-pointer"
              onClick={handleSwipeUp}
            />
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              disabled={!hasPrevScene}
              onClick={handlePrevScene}
              className="bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronDown className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/10 text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              disabled={!hasNextScene}
              onClick={handleNextScene}
              className="bg-white/10 text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};