// Clips rendered end-to-end by AutoClipper (github.com/mohanadbarakattt/autoclipper)
// from public livestreams. Source files live in Google Drive (My Drive/AutoClipper);
// the copies in /public/clips are 720p web re-encodes of those files.
//
// Titles, captions and scores are copied from each clip's caption .txt file that
// AutoClipper writes next to the video. Keep /public/clips.json in sync with this
// list: it is the machine-readable version other agents (e.g. Grok Bot) link to.

export type Clip = {
  id: string;
  title: string;
  streamer: string;
  caption: string;
  tags: string[];
  /** AutoClipper's own viral score (0–10) for the moment. */
  score: number;
  durationSec: number;
  video: string;
  poster: string;
  game: string;
};

export const CLIPS: Clip[] = [
  {
    id: 'clip-2',
    title: "Kai Cenat's insane and bizarre GTA 6 mission reaction",
    streamer: 'kaicenatlive',
    caption: 'Kai Cenat gets completely lost trying to solve the most bizarre puzzle in GTA 6 history. You won\'t believe what he has to do to pass this level!',
    tags: ['#gta6', '#kaicenat', '#gta6gameplay', '#funny', '#gaming'],
    score: 9.5,
    durationSec: 40,
    video: '/clips/clip-2.mp4',
    poster: '/clips/clip-2.jpg',
    game: 'GTA 6',
  },
  {
    id: 'clip-1',
    title: "Kai Cenat's insane skyscraper parachute jump in GTA!",
    streamer: 'kaicenatlive',
    caption: 'Kai Cenat had the most cinematic reaction while parachuting over the city. You have to see how this ends!',
    tags: ['#kaicenat', '#gta6', '#gtav', '#gaming', '#streamermoments'],
    score: 8.5,
    durationSec: 26,
    video: '/clips/clip-1.mp4',
    poster: '/clips/clip-1.jpg',
    game: 'GTA 6',
  },
  {
    id: 'clip-3',
    title: 'Adin Ross panics trying to land a crop-duster in GTA!',
    streamer: 'adinross',
    caption: 'Adin Ross nearly loses his mind trying to land this plane. The ending is priceless!',
    tags: ['#gta6', '#adinross', '#gtavclips', '#gaming', '#funny'],
    score: 8.5,
    durationSec: 27,
    video: '/clips/clip-3.mp4',
    poster: '/clips/clip-3.jpg',
    game: 'GTA 6',
  },
  {
    id: 'clip-4',
    title: 'Adin Ross insults NPC wife and immediately regrets it',
    streamer: 'adinross',
    caption: 'Adin Ross could not handle how the NPC reacted to his insult. Pure chaos on stream!',
    tags: ['#gta6', '#adinross', '#gamingmoments', '#funny'],
    score: 8.5,
    durationSec: 18,
    video: '/clips/clip-4.mp4',
    poster: '/clips/clip-4.jpg',
    game: 'GTA 6',
  },
  {
    id: 'clip-5',
    title: 'Adin Ross loses his mind during chaotic GTA driving session',
    streamer: 'adinross',
    caption: 'Watching Adin Ross try to drive in GTA is pure chaos. Bro could not catch a break.',
    tags: ['#gta6', '#adinross', '#gtavclips', '#funny', '#gaming'],
    score: 7.5,
    durationSec: 18,
    video: '/clips/clip-5.mp4',
    poster: '/clips/clip-5.jpg',
    game: 'GTA 6',
  },
  {
    id: 'clip-6',
    title: 'GTA 6 streamer beats up tow truck driver, then steals the truck',
    streamer: 'adinross',
    caption: 'Adin Ross picks a fight with a tow truck worker over nothing, knocks him out, and just drives off in the truck. Pure GTA 6 chaos.',
    tags: ['#gta6', '#adinross', '#gta6gameplay', '#gaming', '#funnymoments'],
    score: 7.5,
    durationSec: 20,
    video: '/clips/clip-6.mp4',
    poster: '/clips/clip-6.jpg',
    game: 'GTA 6',
  },
];

export const AUTOCLIPPER_REPO = 'https://github.com/mohanadbarakattt/autoclipper';
