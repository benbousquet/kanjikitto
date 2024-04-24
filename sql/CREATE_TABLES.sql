CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  deck_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
  CONSTRAINT fk_card FOREIGN KEY(card_id) REFERENCES cards(id)
)

CREATE TABLE bookmarks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  deck_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
  CONSTRAINT fk_card FOREIGN KEY(card_id) REFERENCES cards(id)
)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE decks (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  body TEXT,
  creator_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
  CONSTRAINT fk_creator FOREIGN KEY(creator_id) REFERENCES users(id)
)

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
  card_id INTEGER
  user_id INTEGER
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
  CONSTRAINT fk_card FOREIGN KEY(card_id) REFERENCES cards(id)
)

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  front VARCHAR,
  back VARCHAR,
  deck_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
)