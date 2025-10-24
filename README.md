# react-voice-visualizer-playback

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Fork Notice**: This is a maintained fork of [react-voice-visualizer](https://github.com/WebDevSimplified/react-voice-visualizer) with enhanced playback functionality.

## 🎙️ Enhanced Audio Recording & Playback

A React component and hook for recording and visualizing audio with improved playback controls. This fork adds seamless pause/resume functionality during recording and better audio playback management.

## ✨ Key Features

- **Audio Recording**
  - Start, pause, resume, and stop recording
  - Real-time audio visualization
  - Save recordings as WebM files
  - Customizable visualizer appearance

- **Enhanced Playback**
  - Smooth audio playback with visual feedback
  - Pause and resume recording without losing audio data
  - Precise playback controls
  - Visual timeline scrubbing

## 🚀 Installation

```bash
npm install react-voice-visualizer-playback
# or
yarn add react-voice-visualizer-playback
```

## 💻 Basic Usage

```typescript jsx
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer-playback';

function AudioRecorder() {
  const recorderControls = useVoiceVisualizer();
  
  return (
    <div>
      <VoiceVisualizer 
        controls={recorderControls}
        mainBarColor="#4f46e5"
        height={120}
      />
      
      <div className="controls">
        <button onClick={recorderControls.startRecording}>
          Start Recording
        </button>
        <button onClick={recorderControls.togglePauseResume}>
          {recorderControls.isPausedRecording ? 'Resume' : 'Pause'}
        </button>
        <button onClick={recorderControls.stopRecording}>
          Stop
        </button>
      </div>
    </div>
  );
}
```

## 🎛️ Core Controls

| Method | Description |
|--------|-------------|
| `startRecording()` | Begins audio recording |
| `stopRecording()` | Stops recording and processes the audio |
| `togglePauseResume()` | Toggle between pause and resume (works for both recording and playback) |
| `startAudioPlayback()` | Start or resume audio playback |
| `stopAudioPlayback()` | Pause audio playback |

## 📝 License

MIT - See [LICENSE](LICENSE) for more information.

## 🙏 Credits

Forked from [react-voice-visualizer](https://github.com/WebDevSimplified/react-voice-visualizer) by Yurii Zarytskyi

## 📬 Contact

For questions or support, please contact: [hopvuvan91@gmail.com](mailto:hopvuvan91@gmail.com)
