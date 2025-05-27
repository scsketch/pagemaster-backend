import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`Swagger running on http://${HOST}:${PORT}/api-docs`);
  }
});
