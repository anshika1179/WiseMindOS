## Description
Removes the publicly committed, hardcoded weak JWT secret (`secretwisemindos`) from `backend/.env.example` and replaces it with a safe placeholder. Closes #98.

## Changes Made
- `backend/.env.example`: `JWT_SECRET="secretwisemindos"` → `JWT_SECRET=change-me-to-a-random-secret`

## Why This Matters
- **Publicly visible**: Anyone can read `.env.example` in the repo
- **Weak entropy**: 14 lowercase chars — brute-forceable in minutes
- **Copy-to-production**: Developers commonly copy `.env.example` to `.env` unchanged
- **JWT forgery**: With the known secret, attackers can forge tokens for any user

## Verification
- Confirmed no other files reference `secretwisemindos`
- Placeholder forces developers to generate their own secret

## How to Generate a Strong Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
