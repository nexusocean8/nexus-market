export const playFullscreen = async (videoRef: any) => {
  const video = videoRef.current;
  if (!video) return;

  try {
    // Unmute and play the video
    video.muted = false;
    video.volume = 1;

    // Enter fullscreen
    if (video.requestFullscreen) {
      await video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      await video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
      await video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
      await video.msRequestFullscreen();
    }

    // Play the video
    await video.play();
  } catch (error) {
    console.error('Error playing video in fullscreen:', error);
    // Fallback: just play with volume if fullscreen fails
    try {
      video.muted = false;
      video.volume = 1;
      await video.play();
    } catch (playError) {
      console.error('Error playing video with sound:', playError);
      // Final fallback: play muted if browser blocks unmuted autoplay
      video.muted = true;
      video.play();
    }
  }
};
