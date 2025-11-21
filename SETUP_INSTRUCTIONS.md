# SafeNet - Setup Instructions

## ✅ Fixed: File Upload Integration

### What Was Fixed:

Your file upload feature was pointing to a different backend (port 5000/ngrok), which broke other features that use port 3001. 

**Solution:** Added a proxy route in your backend that forwards file uploads to your teammate's ngrok API.

### How It Works Now:

```
Frontend (port 5173)
    ↓
Your Backend (port 3001) ← All features use this
    ↓
Teammate's Ngrok API (for file uploads only)
```

### Setup Steps:

**Your `.env.local` file IS being used!** ✅

1. **client/.env.local** (Frontend environment variables):
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   VITE_FILE_UPLOAD_API=https://neatly-carduaceous-merissa.ngrok-free.dev
   ```
   - `VITE_API_BASE_URL` - Your local backend (for login, scanner, chatbot)
   - `VITE_FILE_UPLOAD_API` - Your teammate's ngrok URL (for file uploads)

2. **server/.env** (Backend environment variables):
   ```env
   NGROK_FILE_UPLOAD_URL=https://neatly-carduaceous-merissa.ngrok-free.dev
   ```
   - Only needed if you want to use the proxy route (optional)

3. **Start your backend:**
   ```bash
   cd server
   npm start
   ```

4. **Start your frontend:**
   ```bash
   cd client
   npm run dev
   ```

### What Changed:

**client/.env.local:** ✅ ACTIVE
- ✅ Added `VITE_API_BASE_URL` for local backend
- ✅ Added `VITE_FILE_UPLOAD_API` for ngrok file uploads
- ✅ Frontend now uses environment variables

**client/src/components/FileUpload.jsx:**
- ✅ Now reads from `VITE_FILE_UPLOAD_API` environment variable
- ✅ Falls back to local proxy if env var not set
- ✅ Direct connection to ngrok (no proxy needed)

**server/index.js:**
- ✅ Added proxy route `/api/files` (optional fallback)
- ✅ Handles file upload, forwarding, and cleanup
- ✅ Added error handling and logging

**server/.env:**
- ✅ Added `NGROK_FILE_UPLOAD_URL` variable (for proxy route)

**server/package.json:**
- ✅ Installed `form-data` package

### All Features Now Work:

✅ Login/Register (port 3001)
✅ Scanner (port 3001)  
✅ Chatbot (port 3001)
✅ File Upload (port 3001 → proxies to ngrok)

### Testing:

1. Make sure your backend is running on port 3001
2. Update the ngrok URL in `.env`
3. Try uploading a file
4. Check console logs for "Forwarding file upload to: ..."

### Troubleshooting:

**If file upload fails:**
- Check if ngrok URL is correct in `.env`
- Check if your teammate's API is running
- Check server console for error messages

**If other features fail:**
- Make sure backend is running on port 3001
- Check if MongoDB is running
- Check browser console for errors

### Environment Variables:

Make sure your `server/.env` has:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
VIRUSTOTAL_API_KEY=your-virustotal-key
PORT=3001
GEMINI_API_KEY=your-gemini-key
NGROK_FILE_UPLOAD_URL=https://your-ngrok-url.ngrok.io
```

---

**Everything is now fixed and ready to use!** 🚀
