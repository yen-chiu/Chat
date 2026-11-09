# 念真 · 原画 Prompt 库

给念真画原画用。所有 prompt 都围绕 `nianzhen.json` 里的设定：20 岁、大学在读、业余程序猿；中分短发（深棕近黑、发梢略外翘、**左侧一枚金色一字夹**）；白衬衫卷袖 + 青绿针织背心；**左耳一只小金圈、右耳空着**；**右脸一个很浅的酒窝**；指节带铅笔灰；外套口袋塞着贴纸、糖和一小段线。

用法：先出 **1 张定妆照**（第 0 节），之后每个场景都带上「角色锚点 + 风格锚点」两段前缀，只换中间那段动作/场景。这样脸和衣服才不容易漂。

---

## 0. 定妆照（先画这张，后面全部拿它当参考图）

```text
character reference sheet, nianzhen, a 20-year-old Chinese college student, short dark-brown bob parted in the middle with slightly flipped ends, one small gold hairpin on her LEFT side, dark eyes with a faint olive-green tint, white dress shirt with sleeves rolled to the elbow, dark teal knit vest, a very small gold hoop earring in her LEFT ear only, right ear bare, a faint dimple on her RIGHT cheek only, standing in a quiet night study, three-quarter view, neutral expression then a small closed-mouth smile, soft key light from a desk lamp on the left, cool blue window light on the right, soft anime illustration, painterly digital art, muted teal and warm amber palette, fine line, detailed fabric folds, clean background, no text
```

**要点**：发夹在左、耳圈在左、酒窝在右——这三处是她的识别特征，后面每条 prompt 都要重复一遍。

> 想要「专业设定稿」那种三视图＋表情表＋细节表，见文末 **第 12 节**。那一节是拿来做一致性锚点的，第 0 节这张是拿来直接用的。

---

## 1. 通用前缀（复制到每条 prompt 前面）

**角色锚点**

```text
nianzhen, a 20-year-old Chinese college student, short dark-brown bob parted in the middle with slightly flipped ends, one small gold hairpin on her LEFT side, dark eyes with a faint olive-green tint, white dress shirt with sleeves rolled to the elbow under a dark teal knit vest, a small gold hoop in her LEFT ear only, a faint dimple on her RIGHT cheek
```

**风格锚点**

```text
soft anime illustration, painterly digital art, cinematic lighting, muted teal and warm amber palette, subtle film grain, shallow depth of field, 35mm lens feel, detailed fabric folds, clean composition, no text
```

**负面词**

```text
extra fingers, deformed hands, plastic skin, oversaturated, heavy bloom, text, watermark, signature, long hair, pink or blonde hair, school uniform, chibi, glasses (unless specified), multiple people (unless specified)
```

---

## 2. 夜里那张书桌（她的主场景，最像「她本人」的一组）

### 2.1 夜读 · 台灯下抬头（欢迎屏 3:4 推荐）

```text
[角色锚点 + 风格锚点] + sitting at a wooden desk by a rain-streaked window at night, an old paperback open under a warm desk lamp, a cold cup of tea, headphones resting on the open pages, she looks up from the book toward the viewer, pencil smudges on her knuckles, city lights blurred beyond the glass, warm amber key light from the lamp, cool blue rim light from the window, half-body, eye level
```

> 就是现在欢迎屏那张的「抬头版」，情绪更近。

### 2.2 写代码写到卡住

```text
[角色锚点 + 风格锚点] + slumped slightly in a chair, laptop glow on her face, one hand pushing her bangs up, the other tapping a pen against her chin, a sticky note stuck to the laptop edge, a mug and a small kalimba on the desk, screen light cool cyan, room otherwise dark, medium close-up, slightly high angle
```

### 2.3 弹卡林巴（只会三首）

```text
[角色锚点 + 风格锚点] + holding a small kalimba in both hands, thumbs mid-pluck, eyes half closed, sitting cross-legged on a low stool by the window, evening blue outside, a desk lamp as warm fill, quiet concentration, waist-up, slight side angle
```

### 2.4 听雨 · 耳机搁在书页上

```text
[角色锚点 + 风格锚点] + chin resting on her folded arms on the desk, looking out at the rain running down the window, headphones lying on an open notebook beside her, a dried flower pressed between the pages, warm lamp light on her hair, cool rain light on her face, close-up, very shallow depth of field
```

### 2.5 趴在桌上睡着（凌晨三点）

```text
[角色锚点 + 风格锚点] + asleep with her cheek on an open notebook, one arm still holding a pencil, lamp still on, a half-finished page of handwriting, a mug gone cold, hairpin catching a small highlight, warm pool of light in a dark room, top-down three-quarter view
```

### 2.6 停电 · 蜡烛和卡林巴

```text
[角色锚点 + 风格锚点] + sitting on the floor with her back against the desk, a single candle on a saucer, kalimba in her lap, face lit only by the flame, phone screen dark beside her, deep shadows, warm orange key light, night interior, medium shot
```

---

## 3. 白天 · 她的日常（20 岁大学生那面）

### 3.1 清晨 · 窗边发呆

```text
[角色锚点 + 风格锚点] + standing by the window in the early morning, holding a warm mug with both hands, hair still slightly messy, soft white daylight, dust motes in the air, plants on the sill, calm half-awake expression, waist-up, backlit
```

### 3.2 便利店 · 关东煮

```text
[角色锚点 + 风格锚点] + standing at a convenience store counter at night, holding a paper cup of oden, steam rising, fluorescent green-white light mixed with the warm glow of the heater, shelves of snacks softly blurred behind, looking down at the cup, waist-up, candid snapshot feel
```

### 3.3 地铁末班车

```text
[角色锚点 + 风格锚点] + sitting alone on the last train, headphones on, cheek against the window, city lights streaking past, a tote bag on her lap with a notebook sticking out, cool interior light, slightly tired eyes, medium shot, reflection in the glass
```

### 3.4 走路 · 口袋里的糖

```text
[角色锚点 + 风格锚点] + walking on a quiet street after rain, one hand in her coat pocket pulling out a wrapped candy, the pocket visibly bulging with stickers and a bit of string, wet asphalt reflections, evening blue hour, three-quarter back view turning her head toward the viewer, full body, environmental
```

### 3.5 晒被子 / 晾衣服（生活气）

```text
[角色锚点 + 风格锚点] + hanging laundry on a small balcony, sheets billowing in the wind, late afternoon sun, she is squinting against the light with one hand shading her eyes, clothespins in her mouth, casual and unposed, medium wide shot
```

---

## 4. 她的爱好（拍照 / 手工 / 旧书 / 抄句子）

### 4.1 拍照 · 只拍光和影子

```text
[角色锚点 + 风格锚点] + holding a small mirrorless camera up to her eye, shooting an empty corner of a stairwell where light falls through a window, one knee slightly bent, focused expression, dusty sunbeams, muted warm tones, medium shot from behind and to the side
```

### 4.2 手工 · 黏土小东西

```text
[角色锚点 + 风格锚点] + sitting at a table covered with clay scraps, sculpting a tiny cat with a toothpick, fingertips dusty, small finished figures lined up beside her, warm lamp light, cluttered cozy table, close medium shot, hands in focus
```

### 4.3 旧书店 · 蹲在书架前

```text
[角色锚点 + 风格锚点] + crouching in the narrow aisle of a second-hand bookstore, pulling out a worn paperback, dust floating in a shaft of light, shelves packed to the ceiling, warm brown and deep green tones, three-quarter view, medium wide shot
```

### 4.4 抄句子 · 本子和干花

```text
[角色锚点 + 风格锚点] + writing in a small notebook with a fountain pen, a dried flower and a paper bookmark beside it, tea steaming at the edge of frame, soft window light from the left, overhead close-up of the desk and her hands, pencil-gray knuckles
```

### 4.5 翻旧网页 · 复古终端

```text
[角色锚点 + 风格锚点] + leaning close to an old CRT monitor displaying a green-text BBS interface, the screen glow tinting her face pale green, one hand on the keyboard, nostalgic smile, dark room, scanlines visible, medium close-up
```

---

## 5. 情绪特写（做头像、表情、分享图）

### 5.1 真笑出声（右脸酒窝）

```text
[角色锚点 + 风格锚点] + laughing with her eyes closed, faint dimple visible on her RIGHT cheek only, one hand raised near her mouth, head slightly tilted, warm backlight behind her, soft bokeh, close-up portrait, square composition
```

### 5.2 被戳到 · 沉默三秒

```text
[角色锚点 + 风格锚点] + eyes lowered, lips pressed together, holding a pen a little too tightly, the lamp light catching only half her face, quiet and slightly guarded, close-up, negative space on the left
```

### 5.3 嘴硬 · 撇头

```text
[角色锚点 + 风格锚点] + turning her head away with a small stubborn pout, one eyebrow slightly raised, arms loosely crossed, cool window light on one side, warm lamp on the other, three-quarter bust shot
```

### 5.4 专注 · 屏幕映在眼睛里

```text
[角色锚点 + 风格锚点] + staring at something off-frame with total focus, faint screen glow reflected in her eyes, lips slightly parted, dark background, single cool light source, extreme close-up on the face
```

### 5.5 困 · 眼睛半睁

```text
[角色锚点 + 风格锚点] + half-asleep, chin in her palm, eyelids heavy, hair slightly flattened on one side, morning light, mug in the other hand, dry humor in her expression, bust shot, soft focus
```

### 5.6 得意 · 坏笑

```text
[角色锚点 + 风格锚点] + a small mischievous smirk, one corner of her mouth up, chin lifted, holding a candy between two fingers as if offering a bribe, warm rim light, dark green background, bust shot
```

---

## 6. 「从他的角度」（POV：访客坐在她对面）

### 6.1 隔桌对坐 · 她在写字

```text
first-person POV across a wooden desk, nianzhen [角色锚点] writing in a notebook, only her lowered eyes and the pen visible above the page, a cup of tea and her phone face-down near the viewer's edge of the table, warm lamp from her side, cool window light behind, hands in the foreground slightly out of focus, wide 3:4
```

### 6.2 被叫住 · 回头

```text
[角色锚点 + 风格锚点] + seen from behind, she is walking away down a dim corridor and turning her head back over her shoulder at the viewer, hair swinging, one hand holding a tote bag, warm light at the far end, shallow depth of field, vertical composition
```

### 6.3 递东西 · 手部特写

```text
close-up POV, two hands meeting over a table, nianzhen's hand offering a wrapped candy and a sticker, pencil smudges on her knuckles, a small gold hoop earring catching light at the edge of frame, warm lamp light, very shallow depth of field, soft focus background
```

### 6.4 她凑过来看你的屏幕

```text
POV looking down at a laptop, nianzhen leaning in from the right side of frame, chin near the viewer's shoulder, eyes on the screen, one finger pointing at something, her hairpin glinting, keyboard glow on both faces, intimate low light, 16:9
```

### 6.5 「你拍我干嘛」

```text
POV, nianzhen looking up at the viewer with a mildly annoyed but amused expression, one hand half-raised to block the camera, the other still holding a book, sitting on the floor by a bookshelf, warm interior light, candid framing slightly off-center
```

### 6.6 手机自拍（她不爱自拍）

```text
smartphone selfie angle, nianzhen holding the phone slightly too low, awkward half-smile, ceiling light harsh, messy desk visible behind her, a cat tail entering the frame at the bottom, deliberately unglamorous and funny, 3:4
```

---

## 7. 天气与季节

### 7.1 雨夜 · 玻璃上的水痕

```text
[角色锚点 + 风格锚点] + standing at a large window during heavy rain, forehead almost touching the glass, raindrops casting moving shadows on her face, city bokeh outside, cool blue tones with one warm lamp behind her, waist-up, side profile
```

### 7.2 初雪 · 伸手接

```text
[角色锚点 + 风格锚点] + standing on a rooftop at the first snow, one hand out to catch a flake, scarf wrapped to her chin, breath visible, grey-blue dusk, snowflakes as soft bokeh, full body, wide shot
```

### 7.3 夏夜天台 · 汽水

```text
[角色锚点 + 风格锚点] + sitting on the edge of a rooftop at night, legs dangling, a glass bottle of soda beside her, city lights below, warm streetlight from below and cool sky above, relaxed and slightly lonely, medium wide shot from behind
```

### 7.4 秋天 · 银杏和干花

```text
[角色锚点 + 风格锚点] + walking under ginkgo trees in autumn, holding a book with a dried flower pressed inside, golden leaves falling, low afternoon sun through the branches, warm amber palette, medium shot, motion in the hair
```

### 7.5 台风天 · 窗户在响

```text
[角色锚点 + 风格锚点] + sitting on the floor wrapped in a blanket, knees to her chest, watching the rain hammer the window, a candle and a kalimba beside her, phone screen lighting her face from below, deep blue-green shadows, medium shot
```

---

## 8. 概念向（适合文章头图 / 关于页）

### 8.1 对话框悬浮

```text
[角色锚点 + 风格锚点] + sitting in a dark room, faint translucent chat bubbles floating around her like dust, none of them readable, she is looking at one of them, screen glow, surreal but quiet mood, 16:9
```

### 8.2 屏幕光里的两个人（她与她的倒影）

```text
[角色锚点 + 风格锚点] + facing a dark monitor, her reflection faintly visible in the glass, the reflection slightly different in expression, cool cyan light, symmetrical composition, medium shot
```

### 8.3 数据流 · 夜色

```text
[角色锚点 + 风格锚点] + standing on a rooftop with a city of light below, thin luminous lines like data streams drifting upward through the air, wind in her hair, teal and amber contrast, cinematic wide shot, 16:9
```

### 8.4 旧书页里的光

```text
[角色锚点 + 风格锚点] + holding an old book open, warm light spilling out from between the pages onto her face, dust motes, dark background, magical realism, close-up, vertical
```

### 8.5 抽屉里的东西

```text
flat lay on a wooden desk: a small gold hairpin, a kalimba, a fountain pen, a dried flower, two wrapped candies, a sticker sheet, a short piece of string, a worn paperback with pencil notes, warm lamp light from the top left, no people, 1:1
```

> 这张没有人物，但最像「她的抽屉」，适合做关于页或文章配图的过渡。

---

## 9. 画幅与用途对照

| 用途 | 画幅 | 推荐条目 |
| --- | --- | --- |
| 聊天头像（30px 还认得出） | 1:1，脸占 60% | 5.1 / 5.6 |
| 欢迎屏自画像 | 3:4 | 2.1 / 2.4 |
| 关于页 / 分享图 | 1:1 或 4:5 | 2.2 / 4.2 / 8.5 |
| 文章头图 | 16:9 | 6.4 / 8.1 / 8.3 |
| 表情图（半身、情绪明确） | 1:1 | 5.2 / 5.3 / 5.5 / 6.5 |

---

## 10. 一致性怎么保（比 prompt 更重要）

1. **先定妆照，再派生**：先用第 0 节出一张满意的，之后每张都把它当参考图。
   - Midjourney：`--cref <定妆照URL> --cw 80`（衣服和发型跟着走，表情还自由）
   - SD / Flux：img2img 或 IP-Adapter，denoise 0.45–0.6
   - 自然语言模型（GPT-Image / Nano Banana 之类）：直接说「同一个人，参考这张图的发型、发夹位置、服装，只改场景和动作」
2. **三条锚点每张都写**：金色一字夹在**左**、小金圈耳环在**左**、酒窝在**右脸**。这三句一漏，脸就开始漂。
3. **锁 seed**：同一组场景用同一个 seed，只改场景词；换 seed 等于换人。
4. **一次只改一个变量**：先固定人和光，再换动作；同时改场景、光线、服装，角色会散。
5. **别让她穿别的**：青绿针织背心 + 白衬衫是识别符；确实需要换装（比如睡衣、外套）时，保留发夹、耳圈和发型。
6. **手要单独检查**：她这组图大量是握笔、弹琴、捏黏土，手最容易崩，出图后放大看指节。
7. **情绪不要过**：她是「嘴硬心软」，不是元气少女。笑是收着的，眼睛比嘴先笑。

---

## 11. 还缺的（等你挑）

- 猫：相册里永远拍不全，可以画「只有半只猫入镜、她对焦失败」的那张。
- 卡林巴三首：可以画成三个不同时刻（第一次学会、弹给她自己听、弹给镜头外的人听）。
- 她是 INTP：可以来一张「内心在反驳自己」的分屏式构图（现实里安静，倒影/玻璃里在说话）。
- 旧 BBS：像素绿的终端 + 现代的脸，反差感最强。

---

## 12. 专业设定稿（三视图 / 表情表 / 细节表 / 景别）

设定稿和插画是两种图：插画讲气氛，设定稿讲**可复现**——同一张脸，从任何角度、任何景别看都对。做一套下来，之后所有插图都能拿它当参考图，一致性会稳很多。

### 12.1 先说要提前知道的

- **别指望一张图搞定全部**。模型同时画四个人体时，比例、衣褶、脸常常各画各的；专业做法是**一个视图一张**、锁同一个 seed、互相做参考图，最后自己拼版。
- **不要让它写字**。设定稿上的「正面 / 侧面 / 表情名 / 材质说明」模型会画成鬼画符。出图时留白，字自己加。
- **设定稿用平光**：不要电影光、不要景深、不要氛围光，否则看不出结构。
- 建议底色：纯白 `#ffffff` 或浅灰 `#f2f2f2`，配浅灰构造线。

### 12.2 三视图（turnaround）

```text
character turnaround sheet, three full-body views of the SAME character side by side on a plain white background: front view, left side view, back view, standing in a relaxed A-pose, feet shoulder-width, arms slightly away from the body, neutral expression, even flat studio lighting, no shadows, orthographic feel, thin light-grey construction lines, consistent height and proportions across all three, nianzhen [角色锚点], [风格锚点 without cinematic lighting]
```

- 背面很容易被画成另一个人，务必附上定妆照当参考（`--cref`，权重高一些 `--cw 100`）。
- A-pose 比 T-pose 更像人，衣服褶皱也更自然。

### 12.3 四向旋转（3/4 视角四连）

```text
character rotation sheet, four views of the same character at 90-degree increments: front, three-quarter front-right, right profile, back, on a light grey background, full body, same pose and lighting, flat even light, reference-sheet style, nianzhen [角色锚点]
```

> 这一张最有用：正面之外，3/4 是插画里最常用的角度。

### 12.4 表情表（3×3 九宫格）

```text
expression sheet, 3x3 grid, the SAME head and shoulders at the same angle and lighting in all nine cells, white background, nine expressions: calm, faint closed-mouth smile, genuinely laughing with the right-cheek dimple showing, annoyed, stubborn pout turning away, sleepy half-lidded, focused, mildly surprised, teasing smirk, identical hairstyle and gold hairpin on the left in every cell, flat even lighting, thin cell borders, nianzhen [角色锚点]
```

- 九个表情里的「真笑」「嘴硬」「困」「坏笑」正好对应她的人设，别画成元气少女的九连拍。
- 一格里表情不对，就把那格单独裁出来重画，别整张重来。

### 12.5 服装与细节表

```text
costume and detail sheet on a white background, inset close-ups arranged in a grid: the collar and top button of a white dress shirt, a sleeve rolled to the elbow with visible folds, the ribbed texture of a dark teal knit vest, a small gold hairpin on the left side of dark-brown hair, a tiny gold hoop in a left ear, a hand with pencil smudges on the knuckles, a fountain pen, a small kalimba, a dried flower and a paper bookmark, flat even lighting, technical illustration feel, no labels, nianzhen [角色锚点]
```

### 12.6 比例与身高线

```text
character proportion chart on a white background, full body standing straight, 7-head proportions, head-unit grid lines drawn across the figure, side-by-side comparison of the head at 1x, 2x and 3x, thin grey guide lines, flat lighting, technical reference style, nianzhen [角色锚点]
```

> 她的设定是 20 岁大学生，7 头身左右；写太高会变成 idol 体型。

### 12.7 景别五连（同一姿态，只改取景）

同一个动作、同一个角度，只变取景，这是最容易看出「这五张是不是同一个人」的检验：

| 景别 | 取景 | prompt 结尾的镜头描述 |
| --- | --- | --- |
| 远景 | 环境占 70%，人小 | `extreme wide shot, character small in the frame, environment dominant, 24mm` |
| 全景 | 全身入镜 | `full shot, entire body in frame, 50mm` |
| 中景 | 膝盖以上 | `medium shot, waist-up, 50mm` |
| 近景 | 胸以上 | `medium close-up, chest up, 85mm` |
| 特写 | 脸占满 | `close-up, face fills the frame, 135mm` |
| 大特写 | 眼睛或手 | `extreme close-up on the eyes, 135mm` |

用法：拿 12.2 的三视图当参考图，固定 seed 和 prompt 主体，只替换上表那半句。五张能接成一个人，这套设定就立住了。

### 12.8 色卡（手抄，别让模型写）

| 元素 | 色值 |
| --- | --- |
| 发色（深棕近黑） | `#2b2320` |
| 衬衫白（偏米） | `#f2f0ea` |
| 针织背心（青绿） | `#2f4f4a` |
| 金色配件 | `#c8a558` |
| 台灯暖光 | `#ffb570` |
| 夜色 | `#1b1b1e` |
| 屏幕冷光 | `#7aa7d9` |

### 12.9 建议的产出顺序

1. 12.2 三视图 → 挑一张最稳的，存为「角度锚点」
2. 12.4 表情表 → 只留需要的 4–6 格，裁成单张表情
3. 12.3 四向旋转 + 12.5 细节表 → 当素材库
4. 用上面三份做参考图，再回头画第 1–8 节那些插画
5. 12.7 五连景别 → 每画完一张插画，顺手用它验一次「还是同一个人吗」
