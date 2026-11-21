# Nimra Afzal | Portfolio Website

HTML5, CSS3 and Vanilla JavaScript only. Light cream, warm grey and peach theme matching the cartoon avatar.

## 1. Run it with VS Code + Live Server
1. Install VS Code, then the **Live Server** extension (by Ritwick Dey).
2. Unzip the project, then in VS Code use **File > Open Folder** and choose `portfolio`.
3. Right-click `index.html` and choose **Open with Live Server**.
4. Put your CV at `assets/Nimra-Afzal-CV.pdf` (see step 5). The page needs internet for fonts and icons.

## 2. Set up EmailJS (contact form)
1. Go to emailjs.com and create a free account.
2. **Email Services > Add New Service**, choose Gmail, connect your account. Copy the **Service ID**.
3. **Email Templates > Create New Template**. Use these variables in the template:
   `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`. Set "To email" to your own address. Save and copy the **Template ID**.
4. **Account > General**: copy your **Public Key**.
5. Open `js/config.js` and replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, `YOUR_PUBLIC_KEY`.
6. Test the form. Never put a private key in this project.

Until you do this, the form shows: "The contact form is not connected yet. Please email me directly." with a mail link.

## 3. Upload to GitHub
1. Create a new repository on github.com (for example `portfolio`).
2. In the project folder, run:
```
git init
git add .
git commit -m "My portfolio"
git branch -M main
git remote add origin https://github.com/serious-jpg/portfolio.git
git push -u origin main
```

## 4. Deploy later
- **GitHub Pages:** repository Settings > Pages > Source: `main` branch, `/ (root)` > Save. Your link appears after a minute.
- **Netlify:** log in at netlify.com > Add new site > Deploy manually, then drag the `portfolio` folder in.

## 5. How to edit things
- **Info and text:** open `index.html` and change the text (About, Education, Contact, Footer).
- **Skills, projects, journey, goals:** edit `js/projects.js`.
- **Add a real project:** copy one object in `PROJECTS`, set `category: "real"`, change the text. Add `github:` or `live:` only if the link really exists. Real projects have a coral border and no SAMPLE badge. Delete the sample ones when you want.
- **Colors:** change the variables at the top of `css/style.css` (`:root`).
- **CV:** place your file at `assets/Nimra-Afzal-CV.pdf`. If missing, the buttons show a friendly message.
- **Avatar:** the animated 3D-style cartoon is inline SVG inside the commented AVATAR block in `index.html`. To use your own image, delete the `<svg>` and put `<img src="assets/images/avatar.png" alt="...">` there. Keep `class="float"`.

## Folder structure
```
portfolio/
  index.html
  css/style.css
  js/main.js  js/animations.js  js/projects.js  js/config.js
  assets/images/   (put avatar.png here if you want your own)
  assets/icons/
  assets/Nimra-Afzal-CV.pdf   (you add this)
  README.md
```
