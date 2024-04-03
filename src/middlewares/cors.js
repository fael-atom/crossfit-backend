import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = ["http://localhost:3000", "https://meuapp.com"];
  
    if (ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    }
  
    if (!origin) {
      callback(null, true);
    }
  
    return callback(new Error("Not allowed by CORS"));
  }
});
