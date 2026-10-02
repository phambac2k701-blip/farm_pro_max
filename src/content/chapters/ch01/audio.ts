import type { AudioManifest } from "../../../audio/AudioDirector";

export const CH01_AUDIO_IDS = {
  rain: "ch01.rain",
  traffic: "ch01.traffic",
  fluorescent: "ch01.fluorescent",
  roomTone: "ch01.room-tone",
  footstep: "ch01.footstep",
  phoneVibration: "ch01.phone-vibration",
  door: "ch01.door",
  drawer: "ch01.drawer",
  paper: "ch01.paper",
  corridorBell: "ch01.corridor-bell",
  paHum: "ch01.pa-hum",
  kcrChannelClick: "ch01.kcr-channel-click",
  headsetBreathingChair: "ch01.headset-breathing-chair",
  relayClick: "ch01.relay-click",
  khangClimax: "ch01.khang-climax",
} as const;

export const CH01_AMBIENCE_IDS = [
  CH01_AUDIO_IDS.rain,
  CH01_AUDIO_IDS.traffic,
  CH01_AUDIO_IDS.fluorescent,
  CH01_AUDIO_IDS.roomTone,
] as const;

const p = (file: string): string =>
  `assets/runtime/audio/ch01/${file}`;

export const CH01_AUDIO: AudioManifest = {
  [CH01_AUDIO_IDS.rain]: {
    file: p("rain_loop.wav"),
    loop: true,
    volume: 0.22,
  },
  [CH01_AUDIO_IDS.traffic]: {
    file: p("traffic_loop.wav"),
    loop: true,
    volume: 0.08,
  },
  [CH01_AUDIO_IDS.fluorescent]: {
    file: p("fluorescent_hum_loop.wav"),
    loop: true,
    volume: 0.14,
  },
  [CH01_AUDIO_IDS.roomTone]: {
    file: p("room_tone_loop.wav"),
    loop: true,
    volume: 0.08,
  },
  [CH01_AUDIO_IDS.footstep]: {
    file: p("footstep_01.wav"),
    volume: 0.24,
    maxInstances: 2,
  },
  [CH01_AUDIO_IDS.phoneVibration]: {
    file: p("phone_vibration.wav"),
    volume: 0.28,
    maxInstances: 1,
  },
  [CH01_AUDIO_IDS.door]: {
    file: p("door_wood.wav"),
    volume: 0.28,
    maxInstances: 2,
  },
  [CH01_AUDIO_IDS.drawer]: {
    file: p("drawer_slide.wav"),
    volume: 0.24,
    maxInstances: 2,
  },
  [CH01_AUDIO_IDS.paper]: {
    file: p("paper_rustle.wav"),
    volume: 0.2,
    maxInstances: 2,
  },
  [CH01_AUDIO_IDS.corridorBell]: {
    file: p("corridor_bell.wav"),
    volume: 0.24,
    maxInstances: 1,
    spatial: {
      minDistance: 2,
      maxDistance: 22,
      rolloffFactor: 0.7,
      panningModel: "HRTF",
    },
  },
  [CH01_AUDIO_IDS.paHum]: {
    file: p("pa_hum_loop.wav"),
    loop: true,
    volume: 0.12,
    spatial: {
      minDistance: 1.5,
      maxDistance: 16,
      rolloffFactor: 0.85,
      panningModel: "HRTF",
    },
  },
  [CH01_AUDIO_IDS.kcrChannelClick]: {
    file: p("kcr_channel_click.wav"),
    volume: 0.18,
    maxInstances: 1,
    spatial: {
      minDistance: 0.8,
      maxDistance: 10,
      rolloffFactor: 1,
      panningModel: "HRTF",
    },
  },
  [CH01_AUDIO_IDS.headsetBreathingChair]: {
    file: p("headset_breathing_chair.wav"),
    volume: 0.22,
    maxInstances: 1,
    spatial: {
      minDistance: 0.7,
      maxDistance: 9,
      rolloffFactor: 1.15,
      panningModel: "HRTF",
    },
    caption: "[Tiếng thở khẽ và ghế cọ trong tai nghe.]",
  },
  [CH01_AUDIO_IDS.relayClick]: {
    file: p("relay_click.wav"),
    volume: 0.16,
    maxInstances: 1,
    spatial: {
      minDistance: 0.8,
      maxDistance: 12,
      rolloffFactor: 0.9,
      panningModel: "HRTF",
    },
    caption: "[Loa phát thanh bật tách.]",
  },
  [CH01_AUDIO_IDS.khangClimax]: {
    file: p("khang_climax_line.wav"),
    volume: 0.34,
    maxInstances: 1,
    spatial: {
      minDistance: 0.8,
      maxDistance: 11,
      rolloffFactor: 1,
      panningModel: "HRTF",
    },
    caption: "Khang: “An? Mày tới rồi à?”",
  },
};
