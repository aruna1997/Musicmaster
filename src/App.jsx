import React,{ Component } from 'react';
import './App.css';
import { FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import Playlist from './Playlist';
class App extends Component{
constructor(props)
{
    super(props);
    this.state={
        query:'',
        artist:null,
        tracks:[],
        playlists:[]
    }
}
play='https://api.spotify.com/v1/browse/featured-playlists?q=country=US&limit=6';
accessToken=
'BQCi5JowaE1faQB10lz_vrIMSR0ZfH45_JR8tUcYl2xZxJKcVFninmgAvDGd7-1MV-o1_5RtT5DAbpM-7M--ZZZMTxhJum_eBwEKHrlgNOYQ_6hq6oAucY0uA4PDgw1K-T1Jak1y4hBJen1HHCFQs_H-PZAV2tLK2vgWeer9aWkgB89yFA&refresh_token=AQDSLMnB2mHNlWTSvXOs-5-37nWyzHs_D2AzekSvpKW166I0A88G-EBIXDvJWlON3I04mvHXLoZ5I5ErI09JacUESkrJjBhL3yMPftoejoquvhuPiuA8kydzDVr8E_y3Up0';
myOptions = {
    method: 'GET',
    headers:  {
      'Authorization': 'Bearer ' + this.accessToken
   },
    mode: 'cors',
    cache: 'default'
  };

search()
{
    if(this.state.query==null||this.state.query=='')
    {
      this.setState({query:''});
    }
    else{
    const BASE_URL='https://api.spotify.com/v1/search?';
    let FINAL_URL=BASE_URL+'q='+this.state.query+'&type=artist&limit=1';
    const ALBUM_URL='https://api.spotify.com/v1/artists/';
    
      fetch(FINAL_URL,this.myOptions )
        .then(response => response.json())
        .then(json => {
               if(json.artists.items.length==0)
                 {
                     this.setState();
                     alert(`${this.state.query} not found`);
                 }
              else{
                const artist=json.artists.items[0];
               this.setState({artist});
               FINAL_URL=`${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

               fetch(FINAL_URL,this.myOptions)
               .then(response => response.json())
               .then(json => {
                   
                const tracks=json.tracks;
                console.log('tracks',tracks); 
                this.setState({tracks}); 
           })
        }
})
}
}
componentWillMount()
{
    fetch(this.play,this.myOptions)
    .then(response => response.json())
    .then(json => {
        if(!(json.playlists.items.length==0))
        {
            const playlists=json.playlists.items;
            this.setState({playlists:playlists})
        }
    })
}
render()
{
    
    return(
      <div className="App">
          <div className="App-title">Music Master</div>
          <FormGroup>
              <InputGroup>
              <FormControl 
               type="text"
               placeholder="Search Artist Here.."
               value={this.state.query}
               onChange={event=>{this.setState({query:event.target.value})}}
               onKeyPress={event =>{
                   if(event.key=='Enter')
                   {
                       this.search()
                   }
               }}
              />
              <InputGroup.Addon onClick={() =>this.search()}>
               <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
              </InputGroup>
          </FormGroup>
          {
          this.state.artist!==null?<div>
          <Profile artist={this.state.artist} />
          <Gallery tracks={this.state.tracks} />
          </div>:<div><Playlist playlist={this.state.playlists}/></div>
          }
          
          </div>
    );
}
}
export default App;