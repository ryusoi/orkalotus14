# ORKA LOTUS BEACH repair checklist

- [x] Inspect recent dev-server, browser-console, and network logs for the loading failure.
- [x] Reproduce or confirm the failure against the active preview.
- [x] Apply the smallest safe HMR repair without disrupting guest/server behavior.
- [x] Run type-check and production build.
- [x] Capture desktop and mobile preview screenshots.
- [x] Save a new stable checkpoint and report the fix.

## Full-stack and file-storage upgrade

- [x] Upgrade the project to the full-stack web-db-user scaffold.
- [x] Inspect the generated storage helpers, auth context, database schema and tRPC client conventions.
- [x] Add a secure file-storage procedure for hotel assets and a guest/admin-facing upload flow.
- [x] Connect stored asset URLs to the content-driven hotel experience without breaking current imagery.
- [x] Run type-check, tests and production build; verify the existing guest page still renders.
- [x] Save a new checkpoint with the full-stack integration notes.

## HMR WebSocket repair

- [x] Inspect `vite.config.ts` and the latest dev-server/browser logs for the proxy mismatch.
- [x] Apply a managed-preview HMR mitigation without hardcoding a runtime port.
- [x] Restart the dev server and verify preview rendering, HMR connection behavior, and production build.

## HMR WebSocket connection failure (latest report)

- [x] Inspect current Vite configuration and runtime logs for the external preview WebSocket mismatch.
- [x] Apply a managed-preview HMR mitigation that removes the unsupported client socket without hardcoding a runtime port.
- [x] Restart and verify the preview, browser console and production build.

## HMR verification follow-up

- [x] Run `pnpm build` after the final `server/_core/vite.ts` change.
- [x] Reload the managed preview after the final fix and confirm no new HMR WebSocket error is emitted.
- [x] Document the final mitigation accurately: managed preview disables embedded HMR and removes `/@vite/client`; local development keeps HMR enabled.

## Final full-stack verification gaps

- [x] Capture a fresh mobile-width screenshot after the HMR and full-stack changes.
- [x] Wire approved uploaded asset records into the centralized content model and guest-facing imagery with fallback URLs.
- [x] Create full-stack/file-storage integration notes.
- [x] Save and report a combined checkpoint after the full-stack implementation.

## HMR WebSocket failure reported 2026-08-27

- [x] Inspect fresh browser/server logs and the HTML delivered to the managed preview.
- [x] Remove the remaining Vite client/WebSocket path from managed preview without affecting production or local HMR.
- [x] Restart and verify the guest page plus browser-console output, then save a repair checkpoint.

## Browser Vite WebSocket error reported 2026-08-27 (latest)

- [x] Inspect current browser/server logs and served HTML for any remaining Vite client injection.
- [x] Apply the final proxy-safe client/HMR fix without disabling ordinary local HMR.
- [x] Restart, reload and verify the preview and browser console, then save a recovery checkpoint.

## Final checkpoint for latest browser-side HMR repair

- [x] Save a recovery checkpoint after the Vite client compatibility fix.
- [x] Reload once after checkpointing and confirm no fresh Vite WebSocket or SyntaxError entries.

## Synchronized mini calendar

- [x] Inspect the existing landing-page event source and the “Follow your appetite” section.
- [x] Build a reusable compact mini-calendar using the supplied calendar behavior as inspiration, adapted to the existing design system.
- [x] Ensure the mini calendar and the existing event calendar consume the same shared event data and reflect updates consistently.
- [x] Verify month navigation, event selection, responsive layout and production build.
- [x] Save a checkpoint for the synchronized calendar update.

## Animated footer wave

- [x] Inspect the existing footer bottom markup; the supplied wave attachment was empty, so the animation was adapted as a native CSS/SVG tide treatment.
- [x] Add a responsive animated wave decoration at the bottom of the footer with accessible reduced-motion behavior.
- [x] Verify desktop/mobile rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the footer animation update.

## Moving footer wave refinement

- [x] Inspect the current footer wave implementation and the supplied attachment; note that the attachment contains no usable code if still empty.
- [x] Make the footer wave visibly dynamic with layered CSS motion, stronger contrast and preserved reduced-motion behavior.
- [x] Verify desktop/mobile footer rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the moving footer wave refinement.

## Full-screen video hero

- [x] Download and validate the supplied MP4 and M4A assets, preserving them outside the project source tree.
- [x] Upload the approved media to managed web storage and use the returned stable URLs in the app.
- [x] Replace the hero image with a clear full-screen looping video and add deep scroll parallax.
- [x] Add a small transparent mute/unmute control with autoplay-safe audio behavior and reduced-motion handling.
- [x] Verify desktop/mobile playback behavior, fallback handling, tests, TypeScript check and production build.
- [x] Save a checkpoint for the video hero update.

## Video hero verification follow-up

- [x] Disable hero video autoplay and parallax when reduced motion is requested.
- [x] Add explicit video/audio load-error fallback behavior to the poster/static hero image and silent mode.
- [x] Verify the rendered video frame, loop/autoplay configuration, mute-control placement and fallback paths in the preview.

## Video hero final validation notes

- [x] Record that autoplay/loop are configured for supported browsers and audio requires a user gesture by browser policy.
- [x] Record that failure fallbacks are implemented in code and cannot be forced by the preview without replacing the asset URL.
- [x] Save a dedicated checkpoint for the completed video hero update.

## Dining image carousel

- [x] Inspect the “Follow your appetite” image row and supplied image/slider references.
- [x] Add the supplied resort image collection to the centralized content model, excluding unusable inline placeholder blobs.
- [x] Replace the static dining image row with a responsive data-driven carousel optimized for touch sliding on mobile.
- [x] Add autoplay, previous/next controls, dots, keyboard navigation, swipe gestures and site-matched background colors.
- [x] Verify desktop/mobile rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the dining image carousel update.

## Remove selected dining carousel images

- [x] Remove carousel images 2, 14, 15, 19 and 46 from the centralized image array.
- [x] Verify the remaining slide numbering, controls, tests, TypeScript check and production build.
- [x] Save a checkpoint for the requested image removals.

## Lotus Activities carousel

- [x] Inspect the current dining/image carousel component and multilingual content structure.
- [x] Add the seven supplied activity image URLs with Yoga as the first slide.
- [x] Add the “ACTIVITIES” eyebrow, “LIVE EVERY MOMENT TO THE FULLEST” headline and translated-ready description.
- [x] Place a second matching carousel directly below the first scrollable image section with mobile touch sliding and accessible controls.
- [x] Verify desktop/mobile rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the Lotus Activities carousel.

## SPA carousel

- [x] Inspect the existing Lotus Activities carousel and localized content model.
- [x] Add the eight supplied SPA image URLs with the requested spa5 image as the first slide.
- [x] Add localized SPA headline, introduction and three service descriptions for all eight supported languages.
- [x] Place a third matching carousel below Lotus Activities with the requested SPA-area captioning.
- [x] Verify desktop/mobile rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the SPA carousel.

## Restaurant & Bar carousel

- [x] Inspect the current SPA carousel, section layout and localization model.
- [x] Add the thirteen supplied restaurant and bar image URLs to the centralized content model.
- [x] Add localized Restaurant & Bar headline, gastronomy description, restaurant schedules and bar listings for all eight supported languages.
- [x] Place a fourth matching carousel below SPA with restaurant/bar captions and service information.
- [x] Verify desktop/mobile rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the Restaurant & Bar carousel.

## Mini Club carousel and kids activity schedule

- [x] Inspect the current Restaurant & Bar carousel, calendar patterns and localization model.
- [x] Add the seven supplied Mini Club image URLs with localized Mini Club content for all eight supported languages.
- [x] Add the complete Monday-to-Sunday kids activity schedule with localized day, activity and service labels.
- [x] Place a fourth matching Mini Club carousel and a polished clickable weekly schedule below the existing sections.
- [x] Verify mobile scrolling/navigation, desktop/mobile rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the Mini Club experience.

## Mini Club mobile calendar overflow fix

- [x] Inspect the weekly day-tab sizing and mobile overflow behavior.
- [x] Make all seven day frames fit within the mobile viewport, including Saturday and Sunday.
- [x] Verify mobile/desktop rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the mobile calendar fix.

## Today at Lotus mobile date-card overflow fix

- [x] Inspect the live guest schedule date-card layout and mobile styles.
- [x] Make Today, Tomorrow, Friday and Saturday cards fit clearly within the mobile viewport.
- [x] Preserve date selection behavior and verify mobile/desktop rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the schedule-card fix.

## Today at Lotus mobile date slider

- [x] Inspect the date-strip markup and current mobile behavior.
- [x] Add transparent previous/next controls at the left and right edges of the date strip.
- [x] Allow the date range to slide while preserving clickable date selection and keyboard accessibility.
- [x] Verify mobile/desktop rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the date-slider update.

## Today at Lotus date-window refinement

- [x] Inspect the current mobile date-window and edge-arrow logic.
- [x] Reduce date-card frames and position transparent arrows at the visible row edges.
- [x] Make arrows reveal additional dates in both directions while preserving date selection.
- [x] Verify mobile/desktop rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the refined date slider.

## Accommodation carousel and room catalog

- [x] Inspect the existing room data, carousel patterns and localization model.
- [x] Add the fourteen supplied room/icon image URLs and localized accommodation copy for all eight supported languages.
- [x] Add complete room options with localized names, size, guest capacity, bed and bathroom details.
- [x] Place an interactive Accommodation carousel and clickable room-detail browsing interface below the existing content.
- [x] Verify mobile/desktop room interactions, rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the Accommodation experience.

## Accommodation implementation follow-up

- [x] Implement a true interactive Accommodation image carousel using all fourteen supplied gallery assets.
- [x] Replace room-detail toasts with a real localized room detail browsing panel or modal.
- [x] Add accommodation-specific tests for the gallery, copy and nine room options, then rerun validation.
- [x] Save a new checkpoint only after the complete Accommodation experience is verified.

## Full landing-page mobile-first remediation

- [x] Audit all landing-page sections, headers, controls, cards, rails and typography for mobile overflow.
- [x] Add global mobile-first sizing and spacing rules so content stays within the viewport from top to bottom.
- [x] Add compact transparent edge arrows to horizontally browsable rails where content cannot fit naturally.
- [x] Ensure long descriptions such as “A quieter day, by design” remain readable or browsable on mobile.
- [x] Verify narrow-mobile, larger-mobile and desktop rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the complete mobile-first remediation.

## Mobile rail navigation and long-copy follow-up

- [x] Add explicit transparent edge arrow controls to each mobile horizontal rail that requires off-screen browsing.
- [x] Add a concrete expansion or full-width mobile treatment for long card copy such as “A quieter day, by design”.
- [x] Re-verify every rail and long-copy block at narrow and larger mobile widths.
- [x] Save the final mobile-first remediation checkpoint after the follow-up fixes.

## Mobile filters, date activity popup and fullscreen carousel viewer

- [x] Make All, Entertainment, Wellness, Dining, Pool, Beach, Kids and Excursions mobile-safe and fully reachable.
- [x] Open a mobile-friendly activity popup when a mini-calendar date is selected, showing every activity for that day.
- [x] Add fullscreen image popups to every carousel with transparent close, previous and next controls.
- [x] Add swipe browsing and keyboard navigation to the fullscreen image viewer.
- [x] Verify mobile/desktop interactions, accessibility, tests, TypeScript check and production build.
- [x] Save a checkpoint for the filter and popup interaction updates.

## Popup accessibility follow-up

- [x] Auto-focus the fullscreen viewer when opened so Escape and arrow-key navigation work reliably.
- [x] Re-verify filters, mini-calendar activity popup and fullscreen viewer interactions on mobile and desktop.
- [x] Save a checkpoint after the popup accessibility correction.

## Intro and ending hero video sequence

- [x] Inspect the current hero video configuration and supplied Intro/end video sources.
- [x] Replace the current hero video with the Intro video followed by the ending video.
- [x] Add seamless crossfade/sequence looping without disrupting mute, parallax, fallback or reduced-motion behavior.
- [x] Verify the two-video playback sequence and responsive hero rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the new hero sequence.

## Public Intro and ending hero video update

- [x] Recheck the now-public Intro.mp4 and end.mp4 assets and inspect the current hero implementation.
- [x] Wire Intro followed by end as the hero video sequence with playback fallbacks.
- [x] Add seamless looping transition, fullscreen mobile sizing and scroll parallax.
- [x] Verify both assets, playback configuration, responsive rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the updated two-video hero sequence.

## Hero sequence seamless-transition follow-up

- [x] Implement a true overlapping dual-video crossfade with readiness and buffering handling between Intro and end.
- [x] Capture explicit verification of the full Intro → end → Intro loop after the transition fix.
- [x] Save a checkpoint after the seamless hero transition is fully verified.

## Hero transition readiness hardening

- [x] Wait for the next hero video to reach a playable ready state before beginning the crossfade, with a safe fallback if it is not ready.
- [x] Add explicit runtime loop instrumentation or verification for Intro → end → Intro sequencing.
- [x] Save a checkpoint only after readiness and loop behavior are verified.

## Hero transition timeout fallback

- [x] Add a bounded readiness timeout that replays the current clip or falls back to the poster if the next video cannot become playable.
- [x] Re-run hero sequence validation after the timeout fallback.
- [x] Save the stable checkpoint after the fallback path is verified.

## Project permission-denied access fix

- [x] Inspect project configuration, hosting metadata and recent service logs for the insufficient-permissions error.
- [x] Confirm the guest deployment and public domain are healthy; the separate Manus project-management permission response requires support escalation.
- [x] Restart and verify project access, preview health and production build state.
- [x] Save a verified stable public-domain access state and report the separate Management UI permission limitation.

## Header, sidebar and footer language controls

- [x] Inspect current header, mobile sidebar, footer and locale-switcher markup.
- [x] Add a shared language toggle beside the day/night theme control in the header.
- [x] Add clearly visible language selection in the mobile sidebar and footer.
- [x] Preserve eight-language switching, RTL readiness and compact touch-friendly mobile sizing.
- [x] Verify language switching and responsive placement, tests, TypeScript check and production build.
- [x] Save a checkpoint for the language-control update.

## No-static hero fallback

- [x] Inspect the hero fallback markup and current video source handling.
- [x] Remove the static poster and fallback image entirely.
- [x] Use the Intro video’s first frame as the no-connection fallback without introducing another static image asset.
- [x] Verify the hero sequence, mobile/desktop rendering, tests, TypeScript check and production build.
- [x] Save a checkpoint for the no-static-fallback change.

## Supplied logo branding and scan animation

- [x] Inspect current header, sidebar and footer branding markup and asset conventions.
- [x] Upload and use the supplied logo_sub.png in the header, sidebar and footer.
- [x] Add a slow fine gold scan-line animation passing through each logo.
- [x] Keep the logo readable, mobile-sized and reduced-motion safe.
- [x] Verify all branding placements, tests, TypeScript check and production build.
- [x] Save a checkpoint for the animated branding update.

## Logo mobile sizing correction

- [x] Resize the supplied logo wrapper and image on mobile so the full mark and wordmark remain visible in the header.
- [x] Re-verify header, sidebar and footer logo placements and scan animation across mobile and desktop.
- [x] Save a checkpoint after the logo sizing correction.

## Correct attached logo_sub1 branding

- [x] Inspect the current shared logo source and verify the new attachment path.
- [x] Upload logo_sub1.png and replace the logo source in header, sidebar and footer.
- [x] Resolve stale asset caching or CSS sizing so the new logo visibly appears in every placement.
- [x] Verify mobile and desktop branding, scan animation, tests, TypeScript check and production build.
- [x] Save a checkpoint for the corrected logo branding.

## Larger luminous logo refinement

- [x] Inspect current shared logo markup, scan CSS and hero fallback references.
- [x] Increase logo sizing across header, sidebar and footer while preserving mobile fit.
- [x] Replace the scan animation with a very slow, luminous left-to-right sweep at a slight diagonal, clipped to the logo artwork.
- [x] Remove the previous static fallback/logo references and use logo_sub1 as the no-connection fallback.
- [x] Verify mobile and desktop preview, tests, TypeScript check and production build.
- [x] Save a checkpoint for the larger luminous logo refinement.

## Exact provided logo source correction

- [x] Audit every active logo source and preview-serving reference.
- [x] Replace the shared branding source with the exact user-provided logo_sub.png URL.
- [x] Remove competing teal/old logo assets and references from the project.
- [x] Verify the exact logo in the refreshed preview and run tests, TypeScript and production build.
- [x] Save a checkpoint for the exact provided logo correction.
