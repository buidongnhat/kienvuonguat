# Current Project

## What are we building
- Dự án se được build dựa trên source code có sẵn
- Redesign lại UI/UX, không thay đổi core logic ban đầu

## What good looks like
- Dùng https://fonts.google.com/noto/specimen/Noto+Sans cho font chữ
- Dùng TailwindCSS
- Dùng React framework
- Khi tôi yêu cầu gửi website to figma, có nghĩa là bạn đọc code, generate it to figma thông qua figma desktop bridge.
- Generate ở figma phải dùng frame, auto layout và đúng kích thước như code.
- Giữ đúng tiếng Việt, không dịch ra tiếng Anh.
- Thiết kế đẹp, sang trọng, hiện đại.

## What to avoid
- Không thay đổi logic ban đầu
- Không thay đổi cấu trúc thư mục

---

## Completed work

### feedback.js (`source/components/feedback.js`)
- Badge hidden: `.fb-badge { display: none !important; }` injected via inline style
- C key shortcut disabled: `keydown` listener commented out

### Giá trị cốt lõi (`source/vi/ve-cong-ty/gia-tri-cot-loi/index.html`)
- Replaced single image with two card blocks
- **P.A.T.I** (red `#c03428`, 4 cards): Professional, Active, Teamwork, Integrity
- **S.E.R.V.E** (green `#2d7a4f`, 5 cards): See the Future, Engage & Develop, Reinvent Continuously, Value Result & Relationship, Embody Self Values
- CSS classes: `.kv-core-values`, `.kv-cv-block`, `.kv-cv-emblem`, `.kv-cv-card` — added to `site.css`

### Hệ thống phân phối (`source/vi/ve-cong-ty/he-thong-phan-phoi/index.html`)
- Interactive map with filter tabs: Tất Cả / Miền Bắc / Miền Trung / Miền Nam
- Map base: `/images/vn.svg` (simplemaps, viewBox `0 0 1000 1000`, fill `#6f9c76`, stroke `#fff`)
- Container: `padding-top: 100%` (1:1 square), `background: #d6e8ef` (ocean)
- Inner wrapper `.kv-dist__map-inner`: `transform: scale(1.4); transform-origin: center center`
- SVG overlay `viewBox="0 0 1000 1000"` — JS-rendered pins on top of map
- Tooltip JS uses `svgRect - wrapRect` offset to handle scale transform correctly
- Right panel: stats + scrollable location cards + legend

#### Pin coordinates (vn.svg 0 0 1000 1000)
| id | type | region | x | y |
|---|---|---|---|---|
| hanoi-branch | branch | north | 495 | 200 |
| bac-ninh | wh | north | 519 | 190 |
| hung-yen | wh | north | 513 | 220 |
| danang-rep | rep | central | 635 | 503 |
| danang-wh | wh | central | 627 | 517 |
| nhatrang-rep | rep | central | 686 | 732 |
| hcm-hq | hq | south | 549 | 821 |
| hcm-wh | wh | south | 562 | 834 |
| longan-wh | wh | south | 532 | 823 |
| cantho-rep | rep | south | 488 | 855 |
| vinhlong-wh | wh | south | 513 | 865 |

#### Type colors
| type | color |
|---|---|
| hq | `#c03428` |
| branch | `#e04a3e` |
| rep | `#f59e0b` |
| wh | `#8b9ab0` |

## CSS sections added to site.css
- `/* ===== CORE VALUES ===== */`
- `/* ===== DISTRIBUTION MAP ===== */`

## Key vn.svg province circle IDs (for future pin placement)
| SVG ID | Province | cx | cy |
|---|---|---|---|
| VNHN | Hà Nội | 495.3 | 199.8 |
| VN56 | Bắc Ninh | 518.6 | 189.7 |
| VN66 | Đồng Bằng Sông Hồng (Hưng Yên area) | 513.2 | 204.5 |
| VNDN | Đà Nẵng | 634.7 | 502.8 |
| VN34 | Khánh Hòa (Nha Trang) | 686 | 731.5 |
| VNSG | TP. Hồ Chí Minh | 549 | 820.8 |
| VN41 | Long An | 531.7 | 823.2 |
| VN49 | Vĩnh Long | 512.7 | 864.5 |
| VNCT | Cần Thơ | 487.9 | 854.9 |
| VN58 | Bình Phước | 565.5 | 765.6 |