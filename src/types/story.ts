export interface Story {
  id: string;
  title: string;
  prompt: string;
  genre: 'Fantasy' | 'Sci Fi' | 'Adventure' | 'Animals' | 'Funny' | 'Bedtime';
  age_group: '2-4' | '4-6' | '6-8' | '8-10';
  moral_lesson: 'honesty' | 'hard work' | 'courage' | 'gratitude';
  emotion: 'happiness' | 'anger' | 'sadness' | 'fear' | 'empathy';
  art_style: string;
  voice_option: 'Adam' | 'Eve';
  scenes: StoryScene[];
  times_played: number;
  created_at: string;
  cover_image_url?: string;
  duration_seconds: number;
}

export interface StoryScene {
  id: string;
  image_url: string;
  text: string;
  audio_url?: string;
  duration: number;
}

export interface CreateStoryData {
  prompt: string;
  genre: Story['genre'];
  age_group: Story['age_group'];
  moral_lesson: Story['moral_lesson'];
  emotion: Story['emotion'];
  art_style: string;
  voice_option: Story['voice_option'];
}