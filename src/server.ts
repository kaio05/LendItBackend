import app from './app';
import config from './infra/config/config';
import { AppDataSource } from './data/data-source';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

(async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
})();
