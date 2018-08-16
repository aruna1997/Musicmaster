import React,{ Component} from 'react';
import './App.css';
class Playlist extends Component
{
render()
 {
  const {playlist} =this.props;
  return(
          <div>
              {
          playlist.map((play,k)=>{
            return(
              <div key={k} className="track">
              <a href={play.external_urls.spotify}><img className="track-image" src={play.images[0].url}></img></a>
              </div>);
          })
              }
          </div>
      
  );  
 }
}
export default Playlist;