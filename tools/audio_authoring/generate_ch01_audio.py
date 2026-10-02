from __future__ import annotations
import math
import random
import wave
from pathlib import Path

SR = 22050
OUT = Path(__file__).resolve().parents[2] / "public" / "assets" / "runtime" / "audio" / "ch01"
OUT.mkdir(parents=True, exist_ok=True)
RNG = random.Random(1709)

def clamp(v: float) -> float:
    return max(-1.0, min(1.0, v))

def write_wav(name: str, samples: list[float]) -> None:
    path = OUT / name
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SR)
        frames = bytearray()
        for sample in samples:
            value = int(clamp(sample) * 32767)
            frames += value.to_bytes(2, "little", signed=True)
        wav.writeframes(frames)

def noise() -> float:
    return RNG.random() * 2.0 - 1.0

def smooth_noise(length: int, strength: float, alpha: float = 0.985) -> list[float]:
    out: list[float] = []
    state = 0.0
    for _ in range(length):
        state = alpha * state + (1.0 - alpha) * noise()
        out.append(state * strength)
    return out
def rain_loop(seconds: float = 8.0) -> list[float]:
    n = int(SR * seconds)
    bed = smooth_noise(n, 0.42, 0.72)
    drops = [0.0] * n
    for _ in range(int(seconds * 95)):
        start = RNG.randrange(0, n - 80)
        amp = RNG.uniform(0.015, 0.06)
        for i in range(80):
            drops[start + i] += noise() * amp * math.exp(-i / 16)
    return [0.48 * bed[i] + drops[i] for i in range(n)]

def traffic_loop(seconds: float = 8.0) -> list[float]:
    n = int(SR * seconds)
    out = []
    phase = 0.0
    for i in range(n):
        t = i / SR
        phase += 2 * math.pi * (42 + 5 * math.sin(t * 0.23)) / SR
        rumble = math.sin(phase) * 0.045 + math.sin(phase * 0.51) * 0.025
        out.append(rumble + smooth_noise(1, 0.015, 0.4)[0])
    return out

def fluorescent_loop(seconds: float = 6.0) -> list[float]:
    n = int(SR * seconds)
    out = []
    for i in range(n):
        t = i / SR
        hum = math.sin(2 * math.pi * 50 * t) * 0.035
        hum += math.sin(2 * math.pi * 100 * t) * 0.018
        hum += math.sin(2 * math.pi * 150 * t) * 0.008
        flutter = 0.88 + 0.12 * math.sin(2 * math.pi * 0.37 * t)
        out.append(hum * flutter + noise() * 0.0025)
    return out

def room_tone_loop(seconds: float = 8.0) -> list[float]:
    n = int(SR * seconds)
    bed = smooth_noise(n, 0.055, 0.994)
    return [v + noise() * 0.003 for v in bed]
def burst(seconds: float, amp: float, decay: float, low: bool = False) -> list[float]:
    n = max(1, int(SR * seconds))
    out = []
    state = 0.0
    for i in range(n):
        x = noise()
        if low:
            state = state * 0.92 + x * 0.08
            x = state
        env = math.exp(-i / max(1.0, decay * SR))
        out.append(x * amp * env)
    return out

def phone_vibration() -> list[float]:
    n = int(SR * 0.55)
    out = []
    for i in range(n):
        t = i / SR
        gate = 1.0 if (0.04 < t < 0.19 or 0.29 < t < 0.44) else 0.0
        out.append(math.sin(2 * math.pi * 155 * t) * 0.14 * gate)
    return out

def bell() -> list[float]:
    n = int(SR * 1.85)
    freqs = [640.0, 895.0, 1180.0]
    out = []
    for i in range(n):
        t = i / SR
        env = math.exp(-t * 2.2)
        value = sum(math.sin(2 * math.pi * f * t) for f in freqs) / len(freqs)
        out.append(value * env * 0.16)
    return out

def channel_click() -> list[float]:
    out = burst(0.18, 0.22, 0.018, low=False)
    for i in range(min(120, len(out))):
        out[i] += math.sin(2 * math.pi * 1100 * (i / SR)) * 0.08 * (1 - i / 120)
    return out

def relay_click() -> list[float]:
    out = burst(0.13, 0.24, 0.012, low=True)
    for i in range(min(90, len(out))):
        out[i] += math.sin(2 * math.pi * 420 * (i / SR)) * 0.09 * (1 - i / 90)
    return out
def door_creak() -> list[float]:
    n = int(SR * 0.72)
    out = []
    phase = 0.0
    for i in range(n):
        t = i / SR
        freq = 165 - 70 * (t / 0.72)
        phase += 2 * math.pi * freq / SR
        env = math.sin(math.pi * min(1.0, t / 0.72)) ** 1.4
        out.append(math.sin(phase) * 0.045 * env + noise() * 0.012 * env)
    return out

def drawer_slide() -> list[float]:
    n = int(SR * 0.48)
    out = smooth_noise(n, 0.085, 0.82)
    for i in range(n):
        env = math.sin(math.pi * i / max(1, n - 1))
        out[i] *= env
    return out

def paper_rustle() -> list[float]:
    n = int(SR * 0.36)
    out = []
    state = 0.0
    for i in range(n):
        state = 0.55 * state + 0.45 * noise()
        env = math.sin(math.pi * i / max(1, n - 1)) ** 0.8
        out.append(state * 0.07 * env)
    return out

def footstep() -> list[float]:
    out = burst(0.26, 0.18, 0.055, low=True)
    n = len(out)
    for i in range(n):
        t = i / SR
        out[i] += math.sin(2 * math.pi * 78 * t) * 0.045 * math.exp(-t * 15)
    return out
def pa_hum_loop(seconds: float = 6.0) -> list[float]:
    n = int(SR * seconds)
    out = []
    for i in range(n):
        t = i / SR
        value = math.sin(2 * math.pi * 60 * t) * 0.026
        value += math.sin(2 * math.pi * 180 * t) * 0.007
        value += noise() * 0.003
        out.append(value)
    return out

def breathing_chair() -> list[float]:
    n = int(SR * 2.5)
    out = [0.0] * n
    breath = smooth_noise(n, 0.055, 0.97)
    for i in range(n):
        t = i / SR
        breath_env = max(0.0, math.sin(math.pi * min(1.0, t / 1.7))) if t < 1.7 else 0.0
        out[i] += breath[i] * breath_env
    start = int(SR * 1.45)
    scrape_len = int(SR * 0.75)
    scrape = smooth_noise(scrape_len, 0.12, 0.86)
    for i, value in enumerate(scrape):
        env = math.sin(math.pi * i / max(1, scrape_len - 1))
        out[start + i] += value * env + math.sin(2 * math.pi * 115 * (i / SR)) * 0.025 * env
    return out

ASSETS = {
    "rain_loop.wav": rain_loop(),
    "traffic_loop.wav": traffic_loop(),
    "fluorescent_hum_loop.wav": fluorescent_loop(),
    "room_tone_loop.wav": room_tone_loop(),
    "footstep_01.wav": footstep(),
    "phone_vibration.wav": phone_vibration(),
    "door_wood.wav": door_creak(),
    "drawer_slide.wav": drawer_slide(),
    "paper_rustle.wav": paper_rustle(),
    "corridor_bell.wav": bell(),
    "pa_hum_loop.wav": pa_hum_loop(),
    "kcr_channel_click.wav": channel_click(),
    "headset_breathing_chair.wav": breathing_chair(),
    "relay_click.wav": relay_click(),
}

for filename, samples in ASSETS.items():
    write_wav(filename, samples)
    print(filename, len(samples))
