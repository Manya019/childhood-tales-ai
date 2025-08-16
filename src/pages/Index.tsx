import { useState, useEffect } from "react";
import { StoryCard } from "@/components/StoryCard";
import { CreateStoryModal } from "@/components/CreateStoryModal";
import { StoryViewer } from "@/components/StoryViewer";
import { Story, CreateStoryData } from "@/types/story";
import { BookOpen, Sparkles } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-story.jpg";
import storyDragon from "@/assets/story-dragon.jpg";
import storyMouse from "@/assets/story-mouse.jpg";
import storyUnderwater from "@/assets/story-underwater.jpg";

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Sample stories for demo
  useEffect(() => {
    const sampleStories: Story[] = [
      {
        id: '1',
        title: 'The Dragon Who Loved Books',
        prompt: 'A young dragon discovers the magic of reading',
        genre: 'Fantasy',
        age_group: '4-6',
        moral_lesson: 'courage',
        emotion: 'happiness',
        art_style: 'Disney style',
        voice_option: 'Adam',
        scenes: [
          {
            id: '1-1',
            image_url: storyDragon,
            text: 'Once upon a time, in a magical land far away, there lived a small dragon named Sparkle who was different from all the other dragons.',
            duration: 5
          },
          {
            id: '1-2',
            image_url: storyDragon,
            text: 'While other dragons breathed fire and collected treasure, Sparkle loved to read books and learn new things every day.',
            duration: 5
          }
        ],
        times_played: 12,
        created_at: new Date().toISOString(),
        cover_image_url: storyDragon,
        duration_seconds: 300
      },
      {
        id: '2',
        title: 'The Brave Little Mouse Adventure',
        prompt: 'A tiny mouse goes on a big adventure through the forest',
        genre: 'Adventure',
        age_group: '4-6',
        moral_lesson: 'courage',
        emotion: 'happiness',
        art_style: 'Disney style',
        voice_option: 'Eve',
        scenes: [
          {
            id: '2-1',
            image_url: storyMouse,
            text: 'Meet Pip, the smallest mouse in the forest, who dreamed of going on the biggest adventure of all!',
            duration: 4
          }
        ],
        times_played: 8,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        cover_image_url: storyMouse,
        duration_seconds: 240
      },
      {
        id: '3',
        title: 'The Underwater Kingdom',
        prompt: 'A magical underwater world full of friendly sea creatures',
        genre: 'Fantasy',
        age_group: '6-8',
        moral_lesson: 'gratitude',
        emotion: 'empathy',
        art_style: 'Disney style',
        voice_option: 'Adam',
        scenes: [
          {
            id: '3-1',
            image_url: storyUnderwater,
            text: 'Deep beneath the ocean waves, there existed a beautiful kingdom where mermaids, dolphins, and colorful fish lived together in harmony.',
            duration: 6
          }
        ],
        times_played: 15,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        cover_image_url: storyUnderwater,
        duration_seconds: 360
      }
    ];
    setStories(sampleStories);
  }, []);

  const handleCreateStory = async (data: CreateStoryData) => {
    setIsCreating(true);
    
    try {
      // Simulate story creation with AI
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newStory: Story = {
        id: Date.now().toString(),
        title: `${data.genre} Story: ${data.prompt.substring(0, 30)}...`,
        ...data,
        scenes: [
          {
            id: `${Date.now()}-1`,
            image_url: storyDragon, // Would be generated based on prompt
            text: `This is the beginning of your ${data.genre.toLowerCase()} story about ${data.prompt.substring(0, 50)}...`,
            duration: 5
          }
        ],
        times_played: 0,
        created_at: new Date().toISOString(),
        cover_image_url: storyDragon,
        duration_seconds: 180
      };

      setStories(prev => [newStory, ...prev]);
      toast.success("✨ Your magical story has been created!");
    } catch (error) {
      toast.error("Failed to create story. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setIsViewerOpen(true);
    
    // Update play count
    setStories(prev => 
      prev.map(s => 
        s.id === story.id 
          ? { ...s, times_played: s.times_played + 1 }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-story-gradient">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Magical storytelling" 
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-story-float">
              Create Magical Stories
              <Sparkles className="inline-block w-12 h-12 ml-4 text-story-magic" />
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Generate personalized AI stories for your children with beautiful illustrations and engaging narration
            </p>
            
            <CreateStoryModal onCreateStory={handleCreateStory} isCreating={isCreating} />
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Your Story Collection</h2>
          <div className="bg-primary/10 px-3 py-1 rounded-full">
            <span className="text-primary font-medium">{stories.length} stories</span>
          </div>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">No stories yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Create your first magical story and watch your collection grow!
            </p>
            <CreateStoryModal onCreateStory={handleCreateStory} isCreating={isCreating} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stories.map((story, index) => (
              <div key={story.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <StoryCard 
                  story={story} 
                  onClick={() => handleStoryClick(story)} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Story Viewer */}
      <StoryViewer
        story={selectedStory}
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setSelectedStory(null);
        }}
      />
    </div>
  );
};

export default Index;