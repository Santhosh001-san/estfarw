import os
import re

print("Running Website Verification Tests...")

required_files = [
    'index.html',
    'letter.html',
    'goodbye.html',
    'shared.css',
    'shared.js',
    'README.md',
    '.gitignore'
]

for filename in required_files:
    assert os.path.exists(filename), f"Missing file: {filename}"
    size = os.path.getsize(filename)
    assert size > 0, f"File is empty: {filename}"
    print(f"  [PASS] File exists and non-empty: {filename} ({size} bytes)")

html_files = ['index.html', 'letter.html', 'goodbye.html']

for hf in html_files:
    with open(hf, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all hrefs
    href_pattern = re.compile(r'href=["\']([^"\']+)["\']')
    for href in href_pattern.findall(content):
        if href.startswith(('http://', 'https://', 'mailto:', '#')):
            continue
        # Remove query strings or hashes
        clean_path = href.split('?')[0].split('#')[0]
        if clean_path:
            assert os.path.exists(clean_path), f"Broken link in {hf}: {href} -> {clean_path} does not exist"
            print(f"  [PASS] {hf} -> Valid link: {href}")

    # Find all srcs
    src_pattern = re.compile(r'src=["\']([^"\']+)["\']')
    for src in src_pattern.findall(content):
        if src.startswith(('http://', 'https://')):
            continue
        clean_path = src.split('?')[0].split('#')[0]
        if clean_path:
            assert os.path.exists(clean_path), f"Broken resource in {hf}: {src} -> {clean_path} does not exist"
            print(f"  [PASS] {hf} -> Valid resource: {src}")

# Check specific user prompt requirements
with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()
    assert "THE LAST CHAPTER" in idx_content, "index.html missing 'THE LAST CHAPTER'"
    assert "For Estelle, My Commander 🌙" in idx_content, "index.html missing subtitle"
    assert "Hey, Commander… before you go, there's something I want you to know." in idx_content
    assert "Enter My Little Universe" in idx_content
    assert 'href="letter.html"' in idx_content
    print("  [PASS] index.html text & button requirements verified")

with open('letter.html', 'r', encoding='utf-8') as f:
    let_content = f.read()
    assert "A Letter For You, Commander 💌" in let_content
    assert "Read All" in let_content
    assert "The Little Things" in let_content
    assert "Moments Worth Keeping" in let_content
    assert "A Chapter I'll Remember" in let_content
    assert "Turn the Final Page" in let_content
    assert 'href="goodbye.html"' in let_content
    assert 'href="index.html"' in let_content
    print("  [PASS] letter.html text, cards & navigation requirements verified")

with open('goodbye.html', 'r', encoding='utf-8') as f:
    gb_content = f.read()
    assert "Some chapters end..." in gb_content
    assert "Some memories stay..." in gb_content
    assert "And some people will always have a special place in our story." in gb_content
    assert "Take care, Commander. Wherever life takes you, I hope it gives you countless reasons to smile. 💙" in gb_content
    assert "Read My Letter Again" in gb_content
    assert "Keep This Memory" in gb_content
    assert "Start From The Beginning" in gb_content
    assert "Surprise, Commander" in gb_content
    assert "surpriseModal" in gb_content
    assert "btnRevealPhoto" in gb_content
    assert "Some chapters end. The memories remain. 💙" in gb_content
    print("  [PASS] goodbye.html text, quotes, surprise button & modal verified")

with open('shared.js', 'r', encoding='utf-8') as f:
    js_content = f.read()
    assert "SITE_CONFIG" in js_content
    assert "downloadFarewellLetter" in js_content
    assert "LetterTypewriter" in js_content
    assert "Starfield" in js_content
    assert "prefers-reduced-motion" in js_content
    assert "Someone who will remember this chapter fondly. 💙" in js_content
    print("  [PASS] shared.js configuration, methods and content verified")

print("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!")
