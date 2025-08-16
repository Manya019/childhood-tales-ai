import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Story } from "@/types/story";
import { Play, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface StoryCardProps {
  story: Story;
  onClick: () => void;
}

export const StoryCard = ({ story, onClick }: StoryCardProps) => {
  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'Fantasy':
        return 'bg-story-fantasy text-white';
      case 'Adventure':
        return 'bg-story-adventure text-white';
      case 'Bedtime':
        return 'bg-story-bedtime text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 animate-fade-in-up"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        <img 
          src={story.cover_image_url || "/placeholder.svg"} 
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 rounded-full p-4 animate-magic-glow">
            <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Genre badge */}
        <Badge className={`absolute top-3 left-3 ${getGenreColor(story.genre)}`}>
          {story.genre}
        </Badge>

        {/* Age badge */}
        <Badge variant="secondary" className="absolute top-3 right-3">
          {story.age_group}
        </Badge>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {story.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Play className="w-4 h-4" />
            <span>{story.times_played}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(story.duration_seconds / 60)}m</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(story.created_at), 'MMM d')}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {story.moral_lesson}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {story.emotion}
          </Badge>
        </div>
      </div>
    </Card>
  );
};