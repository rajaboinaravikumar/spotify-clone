# Spotify Clone with Local Media Playback - GitHub README

#Project Overview

This Spotify Clone is a fully functional web application that mimics the core features of Spotify while allowing you to play your local music files and display local album artwork. Built with HTML, CSS, and JavaScript, this single-file solution provides a complete music player experience with playlist management, recently played tracking, and a responsive design that works across all devices.




- Local Media Playback: Play your personal MP3 files stored on your device

- Image Display: Show album artwork from your local image collection

- Spotify-like Interface: Dark theme with green accents and modern UI elements

- Playlist Management: Create and organize custom playlists

- Recently Played: Automatically tracks your listening history

- Full-Screen Player : Immersive playback experience with large album art

- Responsive Design: Works on mobile, tablet, and desktop devices

- Error Handling: Identifies missing files and provides troubleshooting guidance

# How to Use

1. Create two folders in the same directory as the HTML file:
   - `audios/` for your MP3 files
   - `images/` for your JPG/PNG files

2. Update the file paths in the JavaScript section to match your actual filenames:

```javascript
// Example path configuration
image: "images/evarevaro.jpg",
audio: "audios/ANIMAL_Evarevaro_Full_Video.mp3"
```

3. Open the HTML file in your browser to start using the player

#Technical Implementation

#File Structure
```
project-folder/
├── index.html          # Main application file
├── audios/             # Folder for audio files (MP3)
│   ├── song1.mp3
│   ├── song2.mp3
│   └── ...
└── images/             # Folder for image files (JPG/PNG)
    ├── cover1.jpg
    ├── cover2.jpg
    └── ...
```

# Key Components
- Spotify-like UI: Dark theme with responsive sidebar and player controls

- Media Playback: HTML5 Audio API for music playback

- Dynamic Content: JavaScript-generated playlists and song cards

- Error Handling: Detects missing files and provides helpful messages

- Progress Tracking: Real-time playback progress visualization

# Error Handling
The application includes robust error handling:
- Missing images show placeholder artwork
- Missing audio files generate clear error messages
- All errors are collected in a visible error panel for easy troubleshooting

# Customization

You can easily customize:
- Playlist names and description 

- Song metadata (titles, artists, durations)

- Folder paths for media files

- Color scheme to match your preferences

 