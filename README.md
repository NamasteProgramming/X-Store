# X-Store

This is a multivendor e-commerce website, you can also watch tutorial using YouTube playlist.

## How to setup
- Clone this project
- Copy `.env.example` to `.env` and update variables **_carefully**
- For prod build of assets run `npm run asset:build` and `npm run asset:watch` for development


## Notes for developers
Every module have these files
- service: Contains core logic
- models: Contains modeles which connects to DB
- validation: Contains validations
