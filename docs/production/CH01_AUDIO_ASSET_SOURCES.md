# Chapter 1 Audio Asset Sources

Status: production vertical-slice audio source record for BAC-26.

## Runtime rule

Chapter 1 loads committed WAV assets only. No narrative-critical sound is synthesized procedurally at runtime. Browser audio failure is treated as non-blocking for gameplay progression.

## Project-authored sound design

The following files were authored specifically for this project with the deterministic offline script `tools/audio_authoring/generate_ch01_audio.py`. They do not contain third-party sample recordings:

- `rain_loop.wav`
- `traffic_loop.wav`
- `fluorescent_hum_loop.wav`
- `room_tone_loop.wav`
- `footstep_01.wav`
- `phone_vibration.wav`
- `door_wood.wav`
- `drawer_slide.wav`
- `paper_rustle.wav`
- `corridor_bell.wav`
- `pa_hum_loop.wav`
- `kcr_channel_click.wav`
- `headset_breathing_chair.wav`
- `relay_click.wav`

These are static authored WAV masters for the vertical slice, not runtime-generated placeholders.

## Khang climax line

`khang_climax_line.wav` contains the Chapter 1 line:

> An? Mày tới rồi à?

The vertical-slice master was generated offline with eSpeak NG 1.52 Vietnamese voice output, then band-limited and lightly degraded by `tools/audio_authoring/process_khang_voice.py` to fit the PA/intercom treatment. Only the rendered WAV is included in runtime assets; the eSpeak NG executable or source code is not distributed with the game.

eSpeak NG itself is GPL-3.0-or-later software. This source record documents the authoring tool; it is not a claim about downstream licensing of generated audio. If the project moves from vertical slice to commercial release, legal review and/or a human re-record can replace this asset without changing the AudioDirector contract.

## Mix intent

- Rain and traffic establish the wet exterior without becoming a horror drone.
- Fluorescent hum and room tone keep the school physically present.
- Corridor bell is one-shot and authored as an environmental event.
- PA hum, KCR click, headset breathing/chair scrape and Khang line are spatialized.
- Critical speech always has a subtitle callback.
- KCR-A remains deterministic and silent enough that the player notices the world change rather than receiving a scare sting.
