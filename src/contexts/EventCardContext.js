import React from 'react';

export default React.createContext({
  participants: [],
  isJoined: false,
  event_id: null,
  setParticipants: () => {},
});
