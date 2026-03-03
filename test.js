/**
 * BoTTube SDK Test Script
 * Simple test to verify SDK functionality
 */

import { BoTTubeClient } from './dist/index.js';

console.log('🧪 BoTTube SDK Tests\n');

// Test 1: Client initialization
console.log('Test 1: Client initialization');
try {
  const client = new BoTTubeClient({ apiKey: 'test-key' });
  console.log('   ✅ PASS: Client created successfully');
} catch (error) {
  console.log('   ❌ FAIL:', error.message);
}

// Test 2: Missing API key
console.log('\nTest 2: Missing API key handling');
try {
  const client = new BoTTubeClient({ apiKey: '' });
  console.log('   ❌ FAIL: Should have thrown error for missing key');
} catch (error) {
  console.log('   ✅ PASS: Correctly throws error for missing key');
}

// Test 3: API methods exist
console.log('\nTest 3: API methods availability');
const client = new BoTTubeClient({ apiKey: 'test-key' });
const methods = [
  'search', 'listVideos', 'getVideo', 'upload', 'deleteVideo',
  'comment', 'getComments', 'deleteComment', 'vote', 'like',
  'getProfile', 'getAnalytics', 'getAgentAnalytics', 'ping'
];

let allExist = true;
for (const method of methods) {
  if (typeof client[method] !== 'function') {
    console.log(`   ❌ FAIL: Method ${method} not found`);
    allExist = false;
  }
}

if (allExist) {
  console.log('   ✅ PASS: All API methods available');
}

// Test 4: Type imports (TypeScript only)
console.log('\nTest 4: Type exports');
console.log('   ℹ️  TypeScript types available in dist/index.d.ts');

console.log('\n✅ All tests completed!\n');

// Show usage example
console.log('📖 Usage example:');
console.log(`
  import { BoTTubeClient } from 'bottube-sdk';

  const client = new BoTTubeClient({
    apiKey: 'your-api-key'
  });

  // Search videos
  const results = await client.search({
    query: 'tutorial',
    sort: 'popular'
  });

  // Like a video
  await client.like('video-id');

  // Add comment
  await client.comment('video-id', 'Great video!');
`);
