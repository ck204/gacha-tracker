#!/usr/bin/env python3
"""Build compact digests of the bulky mirror files for the cloud routine.

The scheduled routine reads mirrors/ into context; the raw GFL2 page (~45K tokens)
and Steam JSONs (~22K) dominate its token use. This reduces them to ~2K total:

  mirrors/gfl2-help-banners.html  -> mirrors/gfl2-digest.txt        (tag-stripped)
  mirrors/p5x-steam-news.json     -> mirrors/p5x-steam-digest.json  (6 latest posts)
  mirrors/gfl2-steam-news.json    -> mirrors/gfl2-steam-digest.json (6 latest posts)

Raw mirrors are kept untouched (fallback/debugging). Missing inputs are skipped.
Run from the repo root: `python3 scripts/make-digests.py`.
"""
import json
import re
import datetime
from pathlib import Path

MIRRORS = Path("mirrors")


def gfl2_text_digest():
    src = MIRRORS / "gfl2-help-banners.html"
    if not src.exists():
        return
    html = src.read_text(encoding="utf-8", errors="replace")
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S | re.I)
    html = re.sub(r"<style.*?</style>", " ", html, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", html)
    text = (text.replace("&amp;", "&").replace("&#39;", "'")
                .replace("&#039;", "'").replace("&nbsp;", " "))
    text = re.sub(r"\s+", " ", text).strip()
    # The banner list (current + upcoming + recent past) sits near the top.
    (MIRRORS / "gfl2-digest.txt").write_text(text[:1800], encoding="utf-8")


def steam_digest(app):
    src = MIRRORS / f"{app}-steam-news.json"
    if not src.exists():
        return
    items = json.loads(src.read_text(encoding="utf-8")).get("appnews", {}).get("newsitems", [])[:6]
    out = [{
        "title": i.get("title", ""),
        "date": datetime.datetime.fromtimestamp(
            i.get("date", 0), datetime.timezone.utc).strftime("%Y-%m-%d"),
        "contents": i.get("contents", "")[:400],
    } for i in items]
    (MIRRORS / f"{app}-steam-digest.json").write_text(
        json.dumps({"items": out}, ensure_ascii=False), encoding="utf-8")


if __name__ == "__main__":
    gfl2_text_digest()
    steam_digest("p5x")
    steam_digest("gfl2")
