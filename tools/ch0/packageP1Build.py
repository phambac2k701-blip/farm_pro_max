"""Package the verified production build with a Node-only local launcher."""
from pathlib import Path
import zipfile
root = Path(__file__).resolve().parents[2]
target = root / 'artifacts/ch0-p1-build.zip'
target.parent.mkdir(exist_ok=True)
readme = '''UETốt — một mẫu P1 candidate, chưa là Ch0 hoàn thiện.
Giải nén toàn bộ ZIP. Máy cần Node.js (máy Windows được kiểm tra đã có).
Windows: chạy StartP1.cmd, giữ cửa sổ mở, mở Chrome tại:
http://127.0.0.1:5181/?sample=p1&mute=1
Mac/Linux: node serve.cjs rồi mở cùng URL.
Không mở index.html bằng file:// vì GLB/audio/modules cần HTTP.
Theo chỉ đạo18:27, URL này tạm tắt tiếng. Bấm Bắt đầu mẫu. WASD/chuột/E, 1–3 ở lựa chọn,
Esc thả chuột, click cảnh để tiếp tục, R chơi lại.
Hình, giọng, thoại candidate để đánh giá; P2–P7 chưa thực hiện.
Nguồn/provenance: dist/assets/ch0/p1/CREDITS.md và catalog.json.
'''
with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as z:
    for file in sorted((root/'dist').rglob('*')):
        if file.is_file():z.write(file, file.relative_to(root).as_posix())
    z.write(root/'tools/ch0/serveP1Build.cjs', 'serve.cjs')
    z.writestr('StartP1.cmd', '@echo off\r\ncd /d "%~dp0"\r\nnode serve.cjs\r\npause\r\n')
    z.writestr('README.txt', readme)
print(target, target.stat().st_size)
