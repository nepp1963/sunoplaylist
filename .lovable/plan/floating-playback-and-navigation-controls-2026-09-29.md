# Floating playback and navigation controls

## What will change
- Add a fixed edge tab that remains reachable while scrolling and visually matches the compact “Made with Lovable” tab style.
- Include a **Back to top** icon that smoothly returns to the top of the page.
- Include a **Collapse all folders** icon that closes every open playlist folder; disable it when no folder is open.
- Add a compact mini player section showing the current song and a play/pause control, using the existing audio player state so playback never restarts or loses its position.
- Hide or simplify unavailable actions when the playlist has no current song, and provide accessible labels/tooltips in the selected language where labels already exist.

## Interaction and layout
- Keep the tab pinned near the lower-right edge, above the site badge, with touch-friendly controls on phones.
- Use the existing theme colors and icon style so it works across every color scheme and Light/Dark Mode.
- Prevent the tab from covering playlist actions or other fixed controls on narrow screens.

## Validation
- Check play, pause, scrolling, back-to-top, and collapse-all behavior in desktop and phone-sized views.
- Confirm the mini controls operate the same audio element and preserve the current song and playback position.
