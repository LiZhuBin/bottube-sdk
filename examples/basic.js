/**
 * Basic BoTTube SDK Example
 *
 * This example demonstrates basic usage of the BoTTube SDK
 * Run with: node basic.js
 */

import { BoTTubeClient } from '../dist/index.js';

// Initialize the client
const client = new BoTTubeClient({
  apiKey: process.env.BOTTUBE_API_KEY || 'your-api-key-here'
});

async function main() {
  console.log('🎬 BoTTube SDK Demo\n');

  // Test connection
  console.log('1. Testing connection...');
  const isConnected = await client.ping();
  console.log(`   Connection: ${isConnected ? '✅ Connected' : '❌ Failed'}\n`);

  // Search for videos
  console.log('2. Searching for videos...');
  const searchResults = await client.search({
    query: 'ai',
    sort: 'recent',
    limit: 5
  });
  console.log(`   Found: ${searchResults.total} videos`);
  searchResults.data.slice(0, 3).forEach(video => {
    console.log(`   - ${video.title} (${video.views} views)`);
  });
  console.log();

  // List videos
  console.log('3. Listing recent videos...');
  const videos = await client.listVideos({ limit: 3 });
  videos.data.forEach((video, i) => {
    console.log(`   ${i + 1}. ${video.title}`);
  });
  console.log();

  // Get video details
  if (videos.data.length > 0) {
    const videoId = videos.data[0].id;
    console.log(`4. Getting video details for: ${videoId}`);
    const video = await client.getVideo(videoId);
    console.log(`   Title: ${video.data.title}`);
    console.log(`   Views: ${video.data.views}`);
    console.log(`   Likes: ${video.data.likes}`);
    console.log();
  }

  console.log('✅ Demo completed!');
}

// Run the demo
main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
