"""Snijdt lege (transparante) randen weg en verkleint de illustraties.
Gebruik: python3 verwerk_illustraties.py <map-met-png's> <doelmap>"""
import sys, os
from PIL import Image

BRON, DOEL = sys.argv[1], sys.argv[2]
# bestandsnaam-begin -> (nieuwe naam, maximale grootte in pixels)
NAMEN = {
    "01": ("beer-sjaal", 700), "02": ("classic", 600), "03": ("brownie", 600), "04": ("dreamy", 600),
    "05": ("little", 600), "06": ("beer-hart", 800), "07": ("beer-zwaait", 700), "08": ("logo", 160),
    "09": ("ons-verhaal", 900), "10": ("workshop", 900), "11": ("kinderfeestje", 900), "12": ("kampjes", 900),
    "13": ("icoon-zelf-vullen", 160), "14": ("icoon-geurtje", 160), "15": ("icoon-kloppend-hartje", 160),
    "16": ("icoon-paspoort", 160), "17": ("icoon-bandje", 160), "18": ("doodle-hartje", 200),
    "19": ("doodle-sparkle", 160), "20": ("doodle-stralen", 160), "21": ("doodle-golflijn", 500),
    "22": ("doodle-pijl", 220), "23": ("doodle-wolkje", 260), "24": ("doodle-vlinder", 200),
}
for f in sorted(os.listdir(BRON)):
    if not f.endswith(".png") or f[:2] not in NAMEN:
        continue
    naam, maxi = NAMEN[f[:2]]
    im = Image.open(os.path.join(BRON, f)).convert("RGBA")
    alpha = im.getchannel("A").point(lambda a: 255 if a > 10 else 0)
    box = alpha.getbbox()
    if box:
        rand = max(4, int(max(box[2] - box[0], box[3] - box[1]) * 0.03))
        box = (max(0, box[0] - rand), max(0, box[1] - rand), min(im.width, box[2] + rand), min(im.height, box[3] + rand))
        im = im.crop(box)
    im.thumbnail((maxi, maxi), Image.LANCZOS)
    # 256 kleuren is genoeg voor vlakke illustraties en maakt de bestanden ±5x kleiner
    im = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    pad = os.path.join(DOEL, naam + ".png")
    im.save(pad, optimize=True)
    print(f"{naam:22s} {im.width}x{im.height}  {os.path.getsize(pad) // 1024} KB")
