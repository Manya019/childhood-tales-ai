import { useState, useEffect } from "react";
import { StoryCard } from "@/components/StoryCard";
import { CreateStoryModal } from "@/components/CreateStoryModal";
import { ShortsViewer } from "@/components/ShortsViewer";
import { Story, CreateStoryData } from "@/types/story";
import { BookOpen, Sparkles, Play } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-story.jpg";
import storyDragon from "@/assets/story-dragon.jpg";
import storyMouse from "@/assets/story-mouse.jpg";
import storyUnderwater from "@/assets/story-underwater.jpg";

const Index = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isShortsOpen, setIsShortsOpen] = useState(false);
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
            },
            {
              id: '1-3',
              image_url: storyDragon,
              text: 'One day, Sparkle discovered a magical library hidden deep in the forest, filled with books that could transport readers to incredible adventures.',
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
          },
          {
            id: '2-2',
            image_url: storyMouse,
            text: 'Armed with nothing but courage and a tiny backpack, Pip set off through the tall grass on a quest to find the legendary Golden Acorn.',
            duration: 4
          },
          {
            id: '2-3',
            image_url: storyMouse,
            text: 'Along the way, Pip met friendly creatures who taught him that being small doesn\'t mean you can\'t do big things!',
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
          },
          {
            id: '3-2',
            image_url: storyUnderwater,
            text: 'Princess Marina, a young mermaid with a heart full of kindness, discovered that the coral reef was losing its colors and needed her help.',
            duration: 6
          },
          {
            id: '3-3',
            image_url: storyUnderwater,
            text: 'With the help of her ocean friends, Marina learned that by showing gratitude and caring for others, she could restore the reef\'s magical glow.',
            duration: 6
          }
        ],
        times_played: 15,
        created_at: new Date(Date.now() - 172800000).toISOString(),
        cover_image_url: storyUnderwater,
        duration_seconds: 450
      },
      {
        id: '4',
        title: 'The Space Adventure',
        prompt: 'A young astronaut explores distant planets and makes new friends',
        genre: 'Sci Fi',
        age_group: '6-8',
        moral_lesson: 'courage',
        emotion: 'happiness',
        art_style: 'Comic style',
        voice_option: 'Adam',
        scenes: [
          {
            id: '4-1',
            image_url: storyDragon, // Would be space-themed in real app
            text: 'Captain Luna was the youngest astronaut in the galaxy, but she had the biggest dreams of exploring new worlds.',
            duration: 5
          },
          {
            id: '4-2',
            image_url: storyDragon,
            text: 'When her spaceship landed on Planet Zephyr, she discovered friendly alien creatures who taught her about their colorful world.',
            duration: 5
          }
        ],
        times_played: 5,
        created_at: new Date(Date.now() - 259200000).toISOString(),
        cover_image_url: storyDragon,
        duration_seconds: 300
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
          },
          {
            id: `${Date.now()}-2`,
            image_url: storyDragon,
            text: `The adventure continues as our hero learns about ${data.moral_lesson} and discovers the joy of ${data.emotion}...`,
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
    const storyIndex = stories.findIndex(s => s.id === story.id);
    setSelectedStoryIndex(storyIndex);
    setIsShortsOpen(true);
  };

  const handleStoryChange = (storyId: string) => {
    // Update play count when story changes
    setStories(prev => 
      prev.map(s => 
        s.id === storyId 
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
          <>
            {/* Play All Button */}
            <div className="mb-8 text-center">
              <button
                onClick={() => {
                  setSelectedStoryIndex(0);
                  setIsShortsOpen(true);
                }}
                className="inline-flex items-center gap-3 bg-story-gradient hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 animate-magic-glow"
              >
                <Play className="w-6 h-6" fill="currentColor" />
                Watch Stories (Shorts Style)
                <div className="bg-white/20 px-2 py-1 rounded-full text-sm">
                  {stories.length}
                </div>
              </button>
            </div>

            {/* Stories Grid */}
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
          </>
        )}
      </div>

      {/* Shorts Viewer */}
      <ShortsViewer
        stories={stories}
        initialStoryIndex={selectedStoryIndex}
        isOpen={isShortsOpen}
        onClose={() => setIsShortsOpen(false)}
        onStoryChange={handleStoryChange}
      />
    </div>
  );
};

export default Index;