# Hello, Welcome to the Kanji Kitto 🔰 GitHub
This is a project aimed at teaching Kanji through writing.
If you havent seen, check it out here: https://www.kanjikitto.com/

## - IMPORTANT - Please read
Please be aware that this application is still under early development and anything that 
is inputed into the database has a chance to be deleted before the 1.0 release!

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

## Roadmap

### Current Goals
- Add settings and profile pages
- Reword review workflow
- Review tracking

### Future Goals
- Review Statistics
- Bookmarking
- Deck Ratings
- Forking Decks

## Local Development

### Website
- clone repo
```bash
git clone https://github.com/benbousquet/kanjikitto && cd kanjikitto
```

- update ENV variables and rename ".env copy" to ".env"
```env
ML_API_URL = ML api url ex. localhost:3000/classify
DEV = Controls ML api url for classify route 
DATABASE_URL = Postgresql db url string
NEXTAUTH_SECRET = Used for next-auth
GOOGLE_ID = Used for next-auth
GOOGLE_SECRET = Used for next-auth
```

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

