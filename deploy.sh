cd frontend
npm run build
cd ..
rm -r backend/public
cp -r frontend/build backend/public
vercel deploy --prod