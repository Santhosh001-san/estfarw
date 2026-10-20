# The Last Chapter — For Estelle, My Commander 🌙

A cinematic, emotional farewell tribute website built across **three distinct HTML pages**, dedicated to a special person named **Estelle** (*Commander*).

Designed with a midnight navy (`#080D20`) and cosmic purple palette, an animated canvas starfield, a realistic glowing crescent moon, glassmorphism, responsive typography, and an interactive unsent letter with typewriter effect and keepsake download.

---

## 🌟 The Three Chapters

1. **`index.html` — The Beginning**
   - Fullscreen midnight sky with a glowing crescent moon and twinkling starfield.
   - Title: *"THE LAST CHAPTER"*
   - Subtitle: *"For Estelle, My Commander 🌙"*
   - Atmospheric prompt: *"Hey, Commander… before you go, there's something I want you to know."*
   - Glowing primary button: **"Enter My Little Universe →"** linking directly to `letter.html`.

2. **`letter.html` — The Unsent Letter**
   - Heading: *"A Letter For You, Commander 💌"*
   - An interactive glowing envelope and letter paper.
   - Smooth typewriter reveal with an instant **"Read All"** button for quick reading.
   - Respects `prefers-reduced-motion` accessibility standards.
   - Three elegant memory cards below the letter:
     - *The Little Things*
     - *Moments Worth Keeping*
     - *A Chapter I'll Remember*
   - Navigation links: **"Turn the Final Page →"** (`goodbye.html`) and **"← Back to Beginning"** (`index.html`).

3. **`goodbye.html` — Until We Meet Again**
   - Cosmic starry background where stars drift upward toward the infinite universe.
   - Sequential animated reveal of three philosophical reflections followed by the final farewell:
     - *"Some chapters end..."*
     - *"Some memories stay..."*
     - *"And some people will always have a special place in our story."*
     - *"Take care, Commander. Wherever life takes you, I hope it gives you countless reasons to smile. 💙"*
   - Four functional actions:
     - 💌 **"Read My Letter Again"** (links to `letter.html`)
     - 📥 **"Keep This Memory"** (downloads `Letter-For-Commander-Estelle.txt` locally to the user's device)
     - 🌙 **"Start From The Beginning"** (links to `index.html`)
     - 🎁 **"Surprise, Commander"** (opens a secret modal with 3 warm lines and an unlockable photo reveal with toggle/revisit feature)

---

## 📂 Project Structure

```text
├── index.html       # Page 1: The Beginning (Hero & Crescent Moon)
├── letter.html      # Page 2: The Unsent Letter (Typewriter & Memory Cards)
├── goodbye.html     # Page 3: Until We Meet Again (Cosmic Drift, Keepsake & Surprise)
├── assets/
│   ├── my-photo.jpg            # Your picture for Commander (replace anytime)
│   ├── placeholder-avatar.svg  # Fallback cosmic avatar
│   └── README.txt              # Quick instructions for photo replacement
├── shared.css       # Unified cinematic stylesheet, glassmorphism & modal styles
├── shared.js        # Starfield canvas engine, typewriter, modal & editable configs
├── test_website.py  # Automated regression & link validation suite
├── README.md        # Documentation, preview & GitHub Pages guide
└── .gitignore       # Git ignore rules
```

---

## 🖥️ How to Preview Locally

You can preview the website locally using any of these simple methods:

### Option 1: Using Python (Recommended)
Open a terminal in this project folder (`d:\estfw`) and run:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
[http://localhost:8000](http://localhost:8000)

### Option 2: Direct Browser File Opening
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Safari, Firefox). All pages use relative paths (`index.html`, `letter.html`, `goodbye.html`) and work seamlessly offline.

---

## 🚀 How to Publish to GitHub Pages (Beginner Guide)

This website uses pure HTML, CSS, and JavaScript. **No build tools or installations are needed**—it is 100% ready for GitHub Pages!

### Step 1: Create a GitHub Repository
1. Log in to [GitHub.com](https://github.com).
2. Click the **+** (plus icon) in the top right corner and select **New repository**.
3. Name your repository (for example: `estelle-farewell` or `commander`).
4. Set the visibility to **Public** (GitHub Pages is free for public repositories).
5. Leave "Add a README file" **unchecked** (we already created one).
6. Click **Create repository**.

### Step 2: Push Your Code to GitHub
In your local terminal inside `d:\estfw`, run these commands (replace `YOUR_USERNAME` and `YOUR_REPO` with yours):
```bash
git init
git add .
git commit -m "Initial commit: The Last Chapter - Farewell Website for Estelle"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On your GitHub repository page, click the **Settings** tab.
2. In the left sidebar, click **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`.
5. Click **Save**.

### Step 4: Visit Your Live Website!
In about 1-2 minutes, GitHub will display your live website link at the top of the Pages settings:
`https://YOUR_USERNAME.github.io/YOUR_REPO/`

Share this link with Estelle whenever you are ready.

---

## ✏️ How to Customize Text & Memories

All personalized texts are stored in a clean configuration object inside **`shared.js`**. You don't need to touch HTML!

Open `shared.js` and locate `SITE_CONFIG` at the top:
- **`recipient`**: Change the name (`Estelle`) or nickname (`Commander`).
- **`letter.paragraphs`**: Edit or add paragraphs to the farewell letter.
- **`memories`**: Customize the 3 memory cards with your own shared moments, icons, and tags.
- **`goodbyeSequence`**: Customize the cosmic reveal quotes.
- **`surprise`**: Customize the 3 lines, button label, and caption for the photo surprise.

### 📷 How to Add Your Real Photo:
1. Simply copy your photo into `d:\estfw\assets\`
2. Name it `my-photo.jpg` (replacing the placeholder file).
3. That's it! When Commander clicks "Surprise, Commander" and unlocks the photo, she will see your real picture.

---

## 💙 Accessibility & Performance

- **Zero Trackers / Privacy First**: No external tracking, cookies, or analytics.
- **No Autoplay Audio**: Fully respectful of recipient environment.
- **Reduced Motion Support**: Automatically disables particle drift and animates instantly when `prefers-reduced-motion` is enabled in system settings.
- **Mobile Responsive**: Tested across smartphone, tablet, laptop, and desktop viewports with safe touch targets and zero horizontal overflow.
