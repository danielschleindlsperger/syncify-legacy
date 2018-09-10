export const setupPlayer = ({ commit }) => {
  const token = 'BQBu22dBr1g7eNRDbbMOv7iat7_ZBYzg30GyXooNxr_GWW6wozliG7yFdyzzn10j4QBCXl4KRCjYUQE6JZmAKRQzsU8q-ySQeb88S_UXcG-mZ0pcNGExQ9O6uopEJscAyu9cmCRCNR_avyiZo8efMBkPfKJ-Ck0xAPkvAjjMw18';
  const player = new window.Spotify.Player({
    name: 'Syncify Web',
    getOAuthToken: (cb) => { cb(token); },
  });

  commit('setPlayerInstance', player);
};

export const connectPlayer = ({ state }) => new Promise((resolve) => {
  // Playback status updates
  // state.player.addListener('player_state_changed', console.log);

  state.player.addListener('ready', () => {
    resolve();
  });

  // Connect to the player!
  state.player.connect();
});
