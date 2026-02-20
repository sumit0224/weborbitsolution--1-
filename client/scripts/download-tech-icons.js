import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const techItems = [
    { name: 'react', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'nextjs', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
    { name: 'vuejs', logo: 'https://cdn.simpleicons.org/vuedotjs/41B883' },
    { name: 'nodejs', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'laravel', logo: 'https://cdn.simpleicons.org/laravel/FF2D20' },
    { name: 'python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'flutter', logo: 'https://cdn.simpleicons.org/flutter/02569B' },
    { name: 'react-native', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'aws', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
    { name: 'firebase', logo: 'https://cdn.simpleicons.org/firebase/FFCA28' },
    { name: 'vercel', logo: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
    { name: 'figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'ga4', logo: 'https://cdn.simpleicons.org/googleanalytics/F9AB00' },
    { name: 'search-console', logo: 'https://cdn.simpleicons.org/googlesearchconsole/1A73E8' },
];

const outputDir = path.join(__dirname, '../public/images/tech');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const downloadAndConvert = async (item) => {
    try {
        const response = await fetch(item.logo);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${item.logo}: ${response.statusText}`);
        }
        const svgText = await response.text();
        const buffer = Buffer.from(svgText);
        const outputPath = path.join(outputDir, `${item.name}.webp`);

        await sharp(buffer)
            .resize(256, 256) // Ensuring they have a reasonable size
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log(`Successfully converted ${item.name} to WebP`);
    } catch (error) {
        console.error(`Error converting ${item.name}:`, error);
    }
};

const run = async () => {
    console.log('Starting icon download and conversion...');
    for (const item of techItems) {
        await downloadAndConvert(item);
    }
    console.log('Finished converting all icons!');
};

run();
