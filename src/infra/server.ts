import app from '../app';
import config from './config/config';
import { createGame, getAllGames } from './http/controllers/gameController';

app.route('/games')
    .post(createGame)
    .get(getAllGames)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});