"""Download bc-full product images from keptron.in homepage."""
import re
import pathlib
import urllib.request

BASE = "https://www.keptron.in/"
OUT = pathlib.Path(__file__).resolve().parent.parent / "assets" / "products"


def clean_url(raw: str) -> str:
    """Strip trailing junk from URLs embedded in CSS/HTML."""
    s = raw.strip()
    for junk in (");", ")", ";", "'", '"'):
        if junk in s:
            s = s.split(junk)[0]
    return s.rstrip(".,)")


def main() -> None:
    html = urllib.request.urlopen(BASE, timeout=45).read().decode("utf-8", errors="ignore")
    raw = re.findall(r"https://2\.wlimg\.com/product_images/bc-full/[^\s\"'<>]+", html)
    urls = sorted({clean_url(u) for u in raw if ".jpeg" in u.lower() or ".jpg" in u.lower()})
    OUT.mkdir(parents=True, exist_ok=True)
    for i, url in enumerate(urls):
        tail = url.rsplit("/", 1)[-1]
        safe = re.sub(r"[^a-zA-Z0-9._-]", "_", tail)[:120]
        path = OUT / f"{i:02d}_{safe}"
        if path.exists():
            continue
        try:
            urllib.request.urlretrieve(url, path)
            print("OK", path.name)
        except Exception as e:
            print("FAIL", url, e)
    print("Total:", len(urls))


if __name__ == "__main__":
    main()
