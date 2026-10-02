from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "og-image.png"
WIDTH, HEIGHT = 1200, 630

DARK = "#111311"
LIME = "#c3ff62"
TEXT = "#e8e9e0"
MUTED = "#9ba399"

FONT_DIR = Path(r"C:\Windows\Fonts")
FONT_DISPLAY = FONT_DIR / "arialbd.ttf"
FONT_BODY = FONT_DIR / "arial.ttf"
FONT_MONO = FONT_DIR / "consola.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


image = Image.new("RGB", (WIDTH, HEIGHT), DARK)
draw = ImageDraw.Draw(image)

# Frame and header
draw.rectangle((24, 24, WIDTH - 25, HEIGHT - 25), outline=MUTED, width=1)
draw.rectangle((24, 24, 29, HEIGHT - 25), fill=LIME)
draw.rectangle((62, 54, 106, 98), outline=LIME, width=2)
draw.text((72, 65), "AS", font=font(FONT_MONO, 17), fill=LIME)
draw.text((124, 59), "ABHIJEET SAWAI", font=font(FONT_MONO, 15), fill=TEXT)
draw.text((124, 81), "PERSONAL PORTFOLIO", font=font(FONT_MONO, 10), fill=MUTED)
draw.text((872, 67), "SOFTWARE ENGINEER  /  PUNE, INDIA", font=font(FONT_MONO, 12), fill=MUTED)
draw.line((62, 122, WIDTH - 62, 122), fill=MUTED, width=1)

# Main identity
draw.text((64, 160), "SOFTWARE ENGINEER  ·  JAVA / BACKEND", font=font(FONT_MONO, 11), fill=LIME)
draw.text((60, 206), "ABHIJEET", font=font(FONT_DISPLAY, 76), fill=TEXT, stroke_width=0)
draw.text((60, 286), "SAWAI", font=font(FONT_DISPLAY, 76), fill=TEXT, stroke_width=0)
draw.rectangle((64, 380, 397, 385), fill=LIME)
draw.text((64, 410), "Java  ·  Spring Boot  ·  REST APIs", font=font(FONT_BODY, 21), fill=TEXT)
draw.text((64, 451), "Kubernetes  ·  Angular  ·  SQL  ·  ISO 20022", font=font(FONT_BODY, 16), fill=MUTED)
draw.text((64, 524), "PUNE, INDIA", font=font(FONT_MONO, 12), fill=MUTED)
draw.text((64, 548), "abhijeetsawai923@gmail.com", font=font(FONT_MONO, 12), fill=MUTED)

# Technical orbit motif
draw.ellipse((830, 128, 1090, 388), outline=MUTED, width=1)
draw.arc((813, 111, 1108, 406), start=206, end=317, fill=LIME, width=2)
draw.ellipse((1000, 130, 1009, 139), fill=LIME)
draw.ellipse((886, 385, 892, 391), fill=LIME)

# Code panel
panel = (692, 170, 1122, 480)
draw.rectangle(panel, fill=DARK, outline=MUTED, width=1)
draw.line((692, 211, 1122, 211), fill=MUTED, width=1)
for x in (711, 725, 739):
    draw.ellipse((x, 184, x + 6, 190), outline=LIME, width=1)
draw.text((771, 179), "abhijeet.java", font=font(FONT_MONO, 12), fill=TEXT)
draw.text((1035, 180), "● ONLINE", font=font(FONT_MONO, 9), fill=LIME)

code_rows = [
    ("01", "public class Engineer {"),
    ("02", '  String focus = "useful software";'),
    ("03", "  String[] toolkit = {"),
    ("04", '    "Java", "Spring Boot"'),
    ("05", "  };"),
    ("06", "}"),
]
y = 238
for number, code in code_rows:
    draw.text((715, y), number, font=font(FONT_MONO, 12), fill=LIME)
    draw.text((754, y), code, font=font(FONT_MONO, 12), fill=TEXT)
    y += 32

draw.line((692, 447, 1122, 447), fill=MUTED, width=1)
draw.text((712, 460), "BUILDING  ·  LEARNING  ·  SHIPPING", font=font(FONT_MONO, 9), fill=MUTED)

image.save(OUTPUT, format="PNG", optimize=True)
print(OUTPUT)
