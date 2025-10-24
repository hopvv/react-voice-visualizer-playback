import { initialCanvasSetup } from './initialCanvasSetup.ts';
import { paintLine } from './paintLine.ts';
import { paintLineFromCenterToRight } from './paintLineFromCenterToRight.ts';

import { DrawByLiveStreamParams, BarItem } from '../types/types.ts';

// Store previous picks when paused
let previousPicks: (BarItem | null)[] = []; 
let isFirstDrawAfterPause = false;
// Store all wave data
let allPicks: (BarItem | null)[] = [];

export const drawByLiveStream = ({
  audioData,
  unit,
  index,
  index2,
  canvas,
  isRecordingInProgress,
  isPausedRecording,
  picks,
  backgroundColor,
  barWidth,
  mainBarColor,
  secondaryBarColor,
  rounded,
  animateCurrentPick,
  fullscreen,
}: DrawByLiveStreamParams) => {
  const canvasData = initialCanvasSetup({ canvas, backgroundColor });
  if (!canvasData) return;

  const { context, height, width, halfWidth } = canvasData;

  // Store previous picks when pausing
  if (isPausedRecording) {
    if (picks.length > 0 && !previousPicks.length) {
      // Only update previousPicks if we have new picks and it's not already set
      previousPicks = [...picks];
      allPicks = [...picks, ...allPicks];
    }
    isFirstDrawAfterPause = true;
  } else {
    // When not paused, clear the previousPicks to avoid using stale data
    previousPicks = [];
  }

  // Clear picks when stopping recording completely
  if (!isRecordingInProgress) {
    previousPicks = [];
    allPicks = [];
    picks.length = 0;
    return;
  }

  if (audioData?.length) {
    const audioDataArray = Array.from(audioData);
    const maxPick = Math.max(...audioDataArray);

    if (!isPausedRecording) {
      if (index2.current >= barWidth) {
        index2.current = 0;

        const startY = ((height - (maxPick / 258) * height) / height) * 100;
        const barHeight = ((-height + (maxPick / 258) * height * 2) / height) * 100;

        const newPick: BarItem | null = {
          startY,
          barHeight,
        };

        if (index.current >= unit) {
          index.current = barWidth;
        } else {
          index.current += barWidth;
        }

        // Add new pick to the beginning of the array
        picks.unshift(newPick);
        allPicks.unshift(newPick);

        // If we just resumed from pause, combine with previous picks
        if (isFirstDrawAfterPause) {
          // No need to modify picks here as we'll use allPicks for rendering
          isFirstDrawAfterPause = false;
        }

        // Limit the number of picks to fit the canvas width
        const maxPicks = Math.floor((fullscreen ? width : halfWidth) / barWidth);
        if (allPicks.length > maxPicks) {
          allPicks.length = maxPicks;
        }
      }

      index2.current += 1;
    }

    !fullscreen && paintInitialLine();

    // Draw the wave data
    if (allPicks.length > 0) {
      const canvasWidth = fullscreen ? width : halfWidth;
      const startX = canvasWidth - (index2.current % barWidth);
      
      // If we're paused or just resumed, use secondary color, otherwise use main color
      const currentColor = isPausedRecording ? secondaryBarColor : mainBarColor;
      
      // Only draw the wave once with the appropriate color
      allPicks.forEach((pick, index) => {
        if (pick) {
          // Calculate x position to ensure no gap at the right edge
          const x = startX - (index * barWidth);
          
          paintLine({
            context,
            color: currentColor,
            rounded,
            x,
            y: (pick.startY * height) / 100 > height / 2 - 1 ? height / 2 - 1 : (pick.startY * height) / 100,
            h: (pick.barHeight * height) / 100 > 2 ? (pick.barHeight * height) / 100 : 2,
            w: barWidth,
          });
        }
      });
      
      // Reset the flag after first draw after pause
      isFirstDrawAfterPause = false;
    }

    // Animate current pick if not paused
    if (animateCurrentPick && !isPausedRecording) {
      paintLine({
        context,
        rounded,
        color: mainBarColor,
        x: fullscreen ? width : halfWidth,
        y: height - (maxPick / 258) * height,
        h: -height + (maxPick / 258) * height * 2,
        w: barWidth,
      });
    }
  }

  function paintInitialLine() {
    paintLineFromCenterToRight({
      context,
      color: secondaryBarColor,
      rounded,
      width,
      height,
      barWidth,
    });
  }
};
