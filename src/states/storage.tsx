import {MMKV} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
const storage = new MMKV();

export const token_storage = new MMKV({
  id: 'user_storage',
  encryptionKey: 'RSA KEY',
});

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    return Promise.resolve(storage.getString(key));
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
