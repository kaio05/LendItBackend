import app from './app';
import config from './infra/config/config';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
