# Hello, Welcome to the Kanji Kitto 🔰 GitHub
This is a project aimed at teaching Kanji through writing.
If you havent seen, check it out here: https://www.kanjikitto.com/

## Project structure

### Repos
- Frontend + Client facing API (current repo)
- Flask ML Server ([here](https://github.com/benbousquet/kanjikitto-ml-api))

### Technologies
- Next.js
- Auth.js (NextAuth)
- TypeScript
- Tailwind CSS
- DaisyUI
- Flask
- DaKanji Single Kanji Recognition Model
- Docker

## Local Development

### Website
- clone repo
```bash
git clone https://github.com/benbousquet/kanjikitto && cd kanjikitto
```

- update ENV variables and rename ".env copy" to ".env"

- run server
```bash
npm install && npm run dev
```

### ML api
- clone repo
```bash
git clone https://github.com/benbousquet/kanjikitto-ml-api && cd kanjikitto-ml-api
```

- install packages
```bash
pip3 install -r /requirements.txt
```

- run server
```bash
flask --app main run
```

