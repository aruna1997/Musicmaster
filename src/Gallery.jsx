import React,{ Component } from 'react';
import './App.css';
class Gallery extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            playingUrl:'',
            playing:false,
            audio:null
        }
    }
    playaudio(previewurl)
    {
        let audio=new Audio(previewurl);
        if(!this.state.playing)
        {
        audio.play();
        this.setState({
            playing:true,
            playingUrl:previewurl,
            audio
        })
        }else
        {
          if(this.state.playingUrl===previewurl)
          {
              this.state.audio.pause();
              this.setState({
                  playing:false
              })
          }
          else{
              this.state.audio.pause();
              audio.play();
              this.setState({
                  playing:true,
                  playingUrl:previewurl,
                  audio
              })
          }
        }
    }
render()
{
    const {tracks}=this.props;
    return(
      <div>
          {tracks.map((track,k)=>{
        const trackimg=track.album.images[0].url;
        return (<div 
        key={k}
        className="track"
        onClick={()=>this.playaudio(track.preview_url)}
        >  
        <div className="track-play">
        <div className="track-play-inner">
        {
            this.state.playingUrl===track.preview_url
            ? <span>| |</span>
            :<span>&#9654;</span>
        }
        </div>
        </div>
        <img alt="track" src={trackimg} className="track-img"></img>
        <div className="track-text">{track.name}</div>
        </div>)
        })}
      </div>

    );
}



}
export default Gallery;
