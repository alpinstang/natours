/**
 * @author John McDonald <jcm.codes@gmail.com>
 * @file server entry point
 * @desc Created on 2021-01-15 12:38:21 am
 * @copyright GNU General Public License v3.0
 */
import { dotenv } from 'dotenv';
import { app } from './app';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('🚀 app running on port ' + port + '...');
});
