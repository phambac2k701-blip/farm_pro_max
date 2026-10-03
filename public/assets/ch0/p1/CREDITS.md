# Nguồn bộ candidate P1

Toàn bộ bộ này phục vụ **đánh giá mẫu P1**, chưa là asset/canon/final. Metadata, transform, collision, clip, hash và slot nằm trong [catalog.json](catalog.json). Thoại/giọng từng cue ở [voice_provenance.json](audio/voice_provenance.json).

| Thành phần | Nguồn | Giấy phép / trạng thái |
| --- | --- | --- |
| Tài xế, topology tay/forearm, rig nền | [Quaternius — Universal Base Characters](https://quaternius.com/packs/universalbasecharacters.html), bản Standard miễn phí, Superhero male | CC0; derivative áo/material/mũ/pose/clip do dự án dựng. Base hero còn lực lưỡng; chưa duyệt style/NPC final |
| Xe con + colormap | [Kenney — Car Kit](https://kenney.nl/assets/car-kit), sedan.glb và Textures/colormap.png | CC0; scale/placement/path do runtime |
| Phố tạm, xe buýt, xe máy, điện thoại, âm kết cuộc gọi | Dựng trong repo, `buildP1Candidates.py`, `P1World.ts`, `generateP1Voice.py` | Do dự án tạo; không gán CC0 của pack ngoài cho toàn repo. Xe/áo/phố chưa chất lượng cuối |
| Phố | [Kanny100 — Freesound 835521](https://freesound.org/people/Kanny100/sounds/835521/), Traffic_Suburbs_HoChiMinhCity_Nov2014_NK | CC0; chọn riêng `amb_urban_traffic_05` từ audio WIP. Thu tại TP.HCM, không gọi là ghi âm Hà Nội; candidate mix |
| Máy xe buýt | [Mihacappy — Freesound 803761](https://freesound.org/people/Mihacappy/sounds/803761/), busmid.wav MAN/Solaris 2000RPM | CC0; sử dụng HQ MP3 preview để kiểm chứng spatial loop. Không dùng để huấn luyện AI |
| 27 cue thoại Việt | Microsoft Edge Speech qua edge-tts 7.2.8; HoaiMyNeural/NamMinhNeural; đúng draft đang có | TTS tạm để nghe thử. Quyền/nguồn giọng cho bản phát hành chưa chốt; không gán CC0. Bắc và tài xế hiện cùng giọng nam; chưa diễn xuất/lip-sync final |

Generator Blender cần file Quaternius glTF gốc (không đóng gói zip nguồn128MB vào repo). Script xử lý material/rig rồi xuất GLB; không sửa nguồn/WIP cũ. Asset nhập phải được kiểm bằng validator **và** ảnh/video trong cảnh thật. Validator không chứng minh thẩm mỹ hoặc duyệt canon.
