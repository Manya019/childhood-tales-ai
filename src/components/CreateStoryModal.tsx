import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateStoryData } from "@/types/story";
import { Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

interface CreateStoryModalProps {
  onCreateStory: (data: CreateStoryData) => Promise<void>;
  isCreating: boolean;
}

export const CreateStoryModal = ({ onCreateStory, isCreating }: CreateStoryModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateStoryData>({
    prompt: '',
    genre: 'Fantasy',
    age_group: '4-6',
    moral_lesson: 'courage',
    emotion: 'happiness',
    art_style: 'Disney style',
    voice_option: 'Adam'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.prompt.trim()) {
      toast.error("Please enter a story prompt");
      return;
    }

    try {
      await onCreateStory(formData);
      setOpen(false);
      setFormData({
        prompt: '',
        genre: 'Fantasy',
        age_group: '4-6',
        moral_lesson: 'courage',
        emotion: 'happiness',
        art_style: 'Disney style',
        voice_option: 'Adam'
      });
      toast.success("Story created successfully!");
    } catch (error) {
      toast.error("Failed to create story. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-story-gradient hover:opacity-90 text-white shadow-lg animate-magic-glow">
          <Wand2 className="w-5 h-5 mr-2" />
          Create Magical Story
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-story-gradient bg-clip-text text-transparent">
            Create Your Magical Story
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="prompt" className="text-base font-medium">
              Story Prompt *
            </Label>
            <Textarea
              id="prompt"
              placeholder="Tell me about a brave little rabbit who discovers a magical garden..."
              value={formData.prompt}
              onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
              className="mt-2 min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium">Genre</Label>
              <Select
                value={formData.genre}
                onValueChange={(value) => setFormData(prev => ({ ...prev, genre: value as CreateStoryData['genre'] }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fantasy">🧚‍♀️ Fantasy</SelectItem>
                  <SelectItem value="Sci Fi">🚀 Sci Fi</SelectItem>
                  <SelectItem value="Adventure">⛰️ Adventure</SelectItem>
                  <SelectItem value="Animals">🐾 Animals</SelectItem>
                  <SelectItem value="Funny">😄 Funny</SelectItem>
                  <SelectItem value="Bedtime">🌙 Bedtime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Age Group</Label>
              <Select
                value={formData.age_group}
                onValueChange={(value) => setFormData(prev => ({ ...prev, age_group: value as CreateStoryData['age_group'] }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-4">2-4 years</SelectItem>
                  <SelectItem value="4-6">4-6 years</SelectItem>
                  <SelectItem value="6-8">6-8 years</SelectItem>
                  <SelectItem value="8-10">8-10 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium">Moral Lesson</Label>
              <Select
                value={formData.moral_lesson}
                onValueChange={(value) => setFormData(prev => ({ ...prev, moral_lesson: value as CreateStoryData['moral_lesson'] }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="honesty">🤝 Honesty</SelectItem>
                  <SelectItem value="hard work">💪 Hard Work</SelectItem>
                  <SelectItem value="courage">🦁 Courage</SelectItem>
                  <SelectItem value="gratitude">🙏 Gratitude</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Emotion</Label>
              <Select
                value={formData.emotion}
                onValueChange={(value) => setFormData(prev => ({ ...prev, emotion: value as CreateStoryData['emotion'] }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happiness">😊 Happiness</SelectItem>
                  <SelectItem value="anger">😠 Anger</SelectItem>
                  <SelectItem value="sadness">😢 Sadness</SelectItem>
                  <SelectItem value="fear">😨 Fear</SelectItem>
                  <SelectItem value="empathy">🤗 Empathy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-base font-medium">Art Style</Label>
              <Select
                value={formData.art_style}
                onValueChange={(value) => setFormData(prev => ({ ...prev, art_style: value }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disney style">🏰 Disney Style</SelectItem>
                  <SelectItem value="Anime style">🎌 Anime Style</SelectItem>
                  <SelectItem value="Comic style">💥 Comic Style</SelectItem>
                  <SelectItem value="Ghibli style">🌿 Ghibli Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Voice</Label>
              <Select
                value={formData.voice_option}
                onValueChange={(value) => setFormData(prev => ({ ...prev, voice_option: value as CreateStoryData['voice_option'] }))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Adam">👨 Adam</SelectItem>
                  <SelectItem value="Eve">👩 Eve</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || !formData.prompt.trim()}
              className="flex-1 bg-story-gradient hover:opacity-90 text-white"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Story
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};