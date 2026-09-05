# Hero video verification

The user-provided GitHub repository is now public. `Intro.mp4` is available at the GitHub raw asset endpoint and downloaded successfully at 8.52 MB, H.264, 720×1280, approximately 31.3 seconds. `end.mp4` is available at the corresponding raw endpoint and downloaded successfully at 867 KB, H.264, 640×800, approximately 13.8 seconds.

Both videos were uploaded to managed storage and wired into the hero as `/manus-storage/intro_2471b666.mp4` followed by `/manus-storage/end_e38e37cb.mp4`. The hero uses two overlaid video elements, stage switching on `ended`, opacity crossfade, continuous looping, full-screen `object-fit: cover`, existing scroll parallax, mute/audio control, fallback handling and reduced-motion pauses.

Preview checks completed at 375×812 and 1280×720. The Intro sequence is visible full-screen on mobile and desktop, overlays remain within bounds, and the existing hero composition is preserved. Tests, TypeScript checking and production build passed.


## Crossfade follow-up

The hero now prestarts the next video during the final 0.8 seconds of the current clip, overlays both videos and crossfades opacity over 420ms. A transition guard prevents duplicate stage changes; each clip resets to time zero when activated, producing the repeating Intro → end → Intro sequence. Fresh 375×812 and 1280×720 screenshots show the two-video hero remains fullscreen, mobile-safe and preserves the existing parallax, copy, CTA and sound controls. Build and tests remain passing.


## Readiness verification

The transition now waits for the next video’s `canplay` event when its readyState is below `HAVE_FUTURE_DATA`, then retries the transition once playable. Each completed end clip increments the hero `data-hero-loop` counter, and `data-hero-stage` exposes the active stage for runtime inspection. Fresh mobile and desktop screenshots after this hardening confirm the hero remains full-screen and responsive. Tests, TypeScript checking and production build pass.
