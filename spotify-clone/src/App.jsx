import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './components/Player';
import { useDataLayerValue } from './StateProvider';


const spotify = new SpotifyWebApi();

function App() {
  const [{user, token }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash="";
    const _token = hash.access_token;

    if(_token){

      dispatch({
        type: "SET_TOKEN",
        token: _token
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        console.log(user);
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then(playlist => {
        dispatch({
          type: "SET_PLAYLIST",
          playlists: playlist
        });
      });

      spotify.getPlaylist('5g89CF0tD9hCYUmjGhEqDz').then(response => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        });
      });
    }


  }, []);

  return (
      <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
          <Login />
        )
      }
      </div>
  );
}

export default App;
