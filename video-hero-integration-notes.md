# ORKA LOTUS BEACH video hero

The landing hero uses the managed MP4 at `/manus-storage/orka-lotus-hero_1ea78cb6.mp4` with `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"` and the approved static resort image as its poster. The video is intentionally rendered without a visual filter; the content copy remains layered above it.

The soundtrack is a separate managed M4A at `/manus-storage/orka-lotus-summer_fddc57f2.m4a`. Browsers commonly block audible autoplay, so the soundtrack begins only after the guest activates the transparent Sound off/Sound on control. The control is disabled if the audio emits an error.

Scroll parallax is applied to the video with a requestAnimationFrame-throttled scroll listener. When `prefers-reduced-motion: reduce` is active, parallax is held at zero, video autoplay/loop are disabled and any playing video is paused.

If the MP4 fails to load, the component swaps to the approved static hero image. If the M4A fails, the control changes to Sound unavailable and the guest experience remains silent. The preview confirms the video frame, poster fallback, control placement and responsive layout; actual audible playback remains gesture-gated by the browser and must be exercised by a guest tap in a real device/browser session.
