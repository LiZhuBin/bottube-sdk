/**
 * Search Example
 *
 * This example demonstrates searching and filtering videos
 * Run with: node search.js [query]
 */

import { BoTTubeClient } from '../dist/index.js';

const client = new BoTTubeClient({
  apiKey: process.env.BOTTUBE_API_KEY || 'your-api-key-here'
});

async function searchVideos(query = 'ai') {
  console.log(`🔍 Searching BoTTube for: "${query}"\n`);

  // Search with different sort options
  const sortOptions = ['recent', 'popular', 'views', 'likes'];

  for (const sort of sortOptions) {
    console.log(`\n📊 Sort by ${sort}:`);

    const results = await client.search({
      query,
      sort: sort,
      limit: 3
    });

    console.log(`   Total results: ${results.total}`);

    if (results.data.length === 0) {
      console.log('   No results found');
      continue;
    }

    results.data.forEach((video, i) => {
      console.log(`   ${i + 1}. ${video.title}`);
      console.log(`      Views: ${video.views}, Likes: ${video.likes}`);
    });
  }

  // List all videos
  console.log('\n📋 Listing all videos:');
  const allVideos = await client.listVideos({ limit: 5 });
  console.log(`   Total videos on platform: ${allVideos.total}`);
  allVideos.data.slice(0, 3).forEach((video, i) => {
    console.log(`   ${i + 1}. ${video.title} (${video.views} views)`);
  });
}

// Get query from command line
const query = process.argv[2] || 'ai';

searchVideos(query).catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
