from __future__ import annotations
import math
import random
import wave
from pathlib import Path

SRC = Path(r"C:\Users\Dell\AppData\Local\Temp\khang_raw.wav")
OUT = Path(__file__).resolve().parents[2] / "public" / "assets" / "runtime" / "audio" / "ch01" / "khang_climax_line.wav"
RNG = random.Random(1709)

with wave.open(str(SRC), "rb") as wav:
    channels = wav.getnchannels()
    width = wav.getsampwidth()
    rate = wav.getframerate()
    frames = wav.readframes(wav.getnframes())

if channels != 1 or width != 2:
    raise RuntimeError("Expected mono 16-bit eSpeak WAV")

samples = [
    int.from_bytes(frames[i:i+2], "little", signed=True) / 32768.0
    for i in range(0, len(frames), 2)
]

low = 0.0
slow = 0.0
filtered: list[float] = []
low_alpha = math.exp(-2.0 * math.pi * 3400.0 / rate)
slow_alpha = math.exp(-2.0 * math.pi * 240.0 / rate)

for sample in samples:
    low = low_alpha * low + (1.0 - low_alpha) * sample
    slow = slow_alpha * slow + (1.0 - slow_alpha) * low
    band = low - slow
    hiss = (RNG.random() * 2.0 - 1.0) * 0.004
    filtered.append(band * 1.35 + hiss)

delay = int(rate * 0.055)
for i in range(delay, len(filtered)):
    filtered[i] += filtered[i - delay] * 0.13

peak = max(0.001, max(abs(v) for v in filtered))
gain = min(0.92 / peak, 1.4)

OUT.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(OUT), "wb") as wav:
    wav.setnchannels(1)
    wav.setsampwidth(2)
    wav.setframerate(rate)
    data = bytearray()
    for sample in filtered:
        value = int(max(-1.0, min(1.0, sample * gain)) * 32767)
        data += value.to_bytes(2, "little", signed=True)
    wav.writeframes(data)

print(OUT)
