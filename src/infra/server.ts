import app from '../app';
import config from './config/config';
import { createGame } from './http/controllers/gameController';

app.route('/games')
    .post(createGame)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});