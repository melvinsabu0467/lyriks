import YTMusic from 'ytmusic-api';

const ytmusic = new YTMusic();

const initializeYTMusic = async () => {
  await ytmusic.initialize();
};

initializeYTMusic(); // Call this once when the app starts

export default ytmusic;
