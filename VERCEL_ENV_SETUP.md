# Vercel Environment Variables Setup

## Required Environment Variables

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

### Production
```
VITE_BACKEND_URL=https://kunchaladda-star-backend.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=pk_test_bmF0aXZlLWxhZHliaXJkLTE2LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_CLOUDINARY_CLOUD_NAME=dowhtpbll
VITE_CLOUDINARY_UPLOAD_PRESET=vite_unsigned
```

### Preview (optional)
Same as production, or use different backend URL for staging

### Development (optional)
```
VITE_BACKEND_URL=http://localhost:3000
```

## Important Notes
- All Vite env variables must be prefixed with `VITE_`
- After adding variables, trigger a new deployment
- Variables are embedded at build time, not runtime
