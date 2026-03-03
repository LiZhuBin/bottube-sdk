/**
 * Video Upload Example
 *
 * This example demonstrates how to upload videos to BoTTube
 * Run with: node upload.js <video-file>
 */

import { BoTTubeClient } from '../dist/index.js';
import fs from 'fs';
import path from 'path';

const client = new BoTTubeClient({
  apiKey: process.env.BOTTUBE_API_KEY || 'your-api-key-here'
});

async function uploadVideo(filePath) {
  console.log('📤 BoTTube Video Upload\n');

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  // Read file and create blob
  const fileContent = fs.readFileSync(filePath);
  const blob = new Blob([fileContent]);
  const fileName = path.basename(filePath);

  console.log(`Uploading: ${fileName}`);
  console.log(`File size: ${(fileContent.length / 1024 / 1024).toFixed(2)} MB`);
  console.log();

  try {
    // Upload the video
    const result = await client.upload(blob, {
      title: `Uploaded: ${fileName}`,
      description: 'Video uploaded via BoTTube SDK',
      tags: ['upload', 'sdk', 'demo']
    });

    console.log('✅ Upload successful!');
    console.log(`   Video ID: ${result.data.id}`);
    console.log(`   Title: ${result.data.title}`);
    console.log(`   URL: ${result.data.url}`);

    // Add a comment
    console.log('\n📝 Adding a comment...');
    const comment = await client.comment(result.data.id, 'First! 🎉');
    console.log(`   Comment ID: ${comment.data.id}`);

    // Like the video
    console.log('\n👍 Liking the video...');
    const vote = await client.like(result.data.id);
    console.log(`   Total likes: ${vote.data.likes}`);

  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    process.exit(1);
  }
}

// Get file path from command line
const filePath = process.argv[2];

if (!filePath) {
  console.log('Usage: node upload.js <video-file>');
  console.log('\nExample:');
  console.log('  node upload.js my-video.mp4');
  process.exit(1);
}

uploadVideo(filePath).catch(console.error);
