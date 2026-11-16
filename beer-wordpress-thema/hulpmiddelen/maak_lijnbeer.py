"""Tekent de beer in lijnstijl (zoals het logo in de mockup).
Delen die achter een ander deel zitten, worden gemaskeerd zodat er geen dubbele lijnen zijn."""
import sys

C = "#D9673F"

# vorm: (naam, svg-element zonder stijl). Volgorde = van VOOR naar ACHTER.
VORMEN = [
    ("hoofd", '<circle cx="100" cy="80" r="50"/>'),
    ("been-l", '<ellipse cx="58" cy="194" rx="28" ry="21"/>'),
    ("been-r", '<ellipse cx="142" cy="194" rx="28" ry="21"/>'),
    ("lijf", '<ellipse cx="100" cy="150" rx="56" ry="56"/>'),
    ("arm-l", '<ellipse cx="44" cy="142" rx="18" ry="34" transform="rotate(25 44 142)"/>'),
    ("arm-r", '<ellipse cx="156" cy="142" rx="18" ry="34" transform="rotate(-25 156 142)"/>'),
    ("oor-l", '<circle cx="52" cy="48" r="26"/>'),
    ("oor-r", '<circle cx="148" cy="48" r="26"/>'),
]
# details die achter het hoofd verdwijnen
BINNENOOR = ['<circle cx="52" cy="48" r="13"/>', '<circle cx="148" cy="48" r="13"/>']


def teken(dikte, met_details=True, hartje_buiten=False):
    defs, lijnen = [], []
    for i, (naam, vorm) in enumerate(VORMEN):
        voor = [v for _, v in VORMEN[:i]]
        if voor:
            zwart = "".join(v.replace("/>", ' fill="#000"/>', 1) for v in voor)
            defs.append(f'<mask id="m-{naam}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="220">'
                        f'<rect width="200" height="220" fill="#fff"/>{zwart}</mask>')
            lijnen.append(f'<g mask="url(#m-{naam})">{vorm}</g>')
        else:
            lijnen.append(vorm)
    kop = VORMEN[0][1].replace("/>", ' fill="#000"/>', 1)
    defs.append(f'<mask id="m-binnenoor" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="220">'
                f'<rect width="200" height="220" fill="#fff"/>{kop}</mask>')
    lijnen.append(f'<g mask="url(#m-binnenoor)" stroke-width="{dikte * .7:.1f}">{"".join(BINNENOOR)}</g>')
    if met_details:
        lijnen += [
            f'<ellipse cx="100" cy="101" rx="22" ry="16" stroke-width="{dikte * .8:.1f}"/>',
            f'<path d="M100 104v6M92 111q8 6 16 0" stroke-width="{dikte * .8:.1f}"/>',
            f'<path d="M100 166c-7-5-12-9-12-13a5 5 0 0 1 12-3a5 5 0 0 1 12 3c0 4-5 8-12 13z" stroke-width="{dikte * .8:.1f}"/>',
            f'<ellipse cx="54" cy="197" rx="12" ry="9" stroke-width="{dikte * .6:.1f}"/>',
            f'<ellipse cx="146" cy="197" rx="12" ry="9" stroke-width="{dikte * .6:.1f}"/>',
        ]
    gevuld = (f'<ellipse cx="100" cy="93" rx="8" ry="6" fill="{C}" stroke="none"/>'
              f'<circle cx="81" cy="74" r="{max(4.5, dikte * .9):.1f}" fill="{C}" stroke="none"/>'
              f'<circle cx="119" cy="74" r="{max(4.5, dikte * .9):.1f}" fill="{C}" stroke="none"/>')
    vb = "0 0 200 222"
    extra = ""
    if hartje_buiten:
        vb = "0 -20 250 242"
        extra = (f'<path d="M222 40c-11-8-18-14-18-20a9 9 0 0 1 18-4a9 9 0 0 1 18 4c0 6-7 12-18 20z" '
                 f'stroke-width="{dikte:.1f}" transform="rotate(12 222 22)"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" fill="none" stroke="{C}" '
            f'stroke-width="{dikte}" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Beer">'
            f'<defs>{"".join(defs)}</defs>{"".join(lijnen)}{gevuld}{extra}</svg>\n')


uit = sys.argv[1]
open(f"{uit}/logo-beer.svg", "w").write(teken(9, met_details=False))
open(f"{uit}/beer-lijn.svg", "w").write(teken(3.2, hartje_buiten=True))
open(f"{uit}/streepjes.svg", "w").write(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="none" stroke="{C}" stroke-width="3" stroke-linecap="round">'
    '<path d="M10 48L22 30M30 46L46 30M34 56L52 50"/></svg>\n')
print("ok")
