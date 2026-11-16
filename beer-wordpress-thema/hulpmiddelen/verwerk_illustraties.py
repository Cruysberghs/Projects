"""Snijdt lege (transparante) randen weg en verkleint de illustraties.
Gebruik: python3 verwerk_illustraties.py <map-met-png's> <doelmap>"""
import sys, os
from PIL import Image

BRON, DOEL = sys.argv[1], sys.argv[2]
# originele bestandsnaam (zonder .png) -> (nieuwe naam, maximale grootte in pixels)
NAMEN = {
    # set 1: 24 illustraties
    "01_beer_hero_sjaal": ("beer-sjaal", 700), "02_classic_bear": ("classic", 600), "03_brownie_bear": ("brownie", 600),
    "04_dreamy_bear": ("dreamy", 600), "05_little_bear": ("little", 600), "06_beer_met_groot_hart": ("beer-hart", 800),
    "07_zwaaiende_beer": ("beer-zwaait", 700), "08_beer_logo_icoon": ("logo", 160), "09_ons_verhaal_knuffels": ("ons-verhaal", 900),
    "10_workshop_kinderen_beer": ("workshop", 900), "11_kinderfeestje_beer": ("kinderfeestje", 900),
    "12_kampjes_beer_met_rugzak": ("kampjes", 900), "13_icoon_zelf_vullen": ("icoon-zelf-vullen", 200),
    "14_icoon_geurtje": ("icoon-geurtje", 200), "15_icoon_kloppend_hartje": ("icoon-kloppend-hartje", 200),
    "16_icoon_paspoort": ("icoon-paspoort", 200), "17_icoon_vriendschapsbandje": ("icoon-bandje", 200),
    "18_doodle_hartje": ("doodle-hartje", 200), "19_doodle_sparkle": ("doodle-sparkle", 160), "20_doodle_stralen": ("doodle-stralen", 160),
    "21_doodle_golflijn_hartje": ("doodle-golflijn", 500), "22_doodle_gebogen_pijl": ("doodle-pijl", 220),
    "23_doodle_wolkje": ("doodle-wolkje", 260), "24_doodle_vlinder": ("doodle-vlinder", 200),
    # set 2: 7 grote illustraties
    "01_Hero_knuffelberen": ("groot-hero", 900), "02_Workshops_samen_knuffelen": ("groot-workshop-knuffelen", 900),
    "03_Workshops_samen_knutselen": ("groot-workshop-knutselen", 800), "04_Kinderfeestjes": ("groot-kinderfeestje", 900),
    "05_Kampjes_berenavontuur": ("groot-kampjes", 900), "06_Ons_verhaal_voorlezen": ("groot-ons-verhaal", 900),
    "07_Contact_zwaaiende_beer": ("groot-contact", 900),
}
for f in sorted(os.listdir(BRON)):
    if not f.endswith(".png") or f[:-4] not in NAMEN:
        continue
    naam, maxi = NAMEN[f[:-4]]
    im = Image.open(os.path.join(BRON, f)).convert("RGBA")
    alpha = im.getchannel("A").point(lambda a: 255 if a > 10 else 0)
    box = alpha.getbbox()
    if box:
        rand = max(4, int(max(box[2] - box[0], box[3] - box[1]) * 0.03))
        box = (max(0, box[0] - rand), max(0, box[1] - rand), min(im.width, box[2] + rand), min(im.height, box[3] + rand))
        im = im.crop(box)
    im.thumbnail((maxi, maxi), Image.LANCZOS)
    if naam.startswith("groot-"):
        # Illustraties met textuur: WebP houdt de kleuren en de transparantie, en blijft klein
        pad = os.path.join(DOEL, naam + ".webp")
        im.save(pad, "WEBP", quality=86, alpha_quality=95, method=6)
    else:
        # Vlakke illustraties: 256 kleuren is genoeg en maakt de bestanden ±5x kleiner
        im = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
        pad = os.path.join(DOEL, naam + ".png")
        im.save(pad, optimize=True)
    print(f"{naam:22s} {im.width}x{im.height}  {os.path.getsize(pad) // 1024} KB")
