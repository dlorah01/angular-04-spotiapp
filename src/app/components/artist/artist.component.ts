import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

	artista: any = {};
	loading: boolean;
	topTracks: any[] = [];
	error: boolean;
  	errorMensaje: string;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) { 
  	this.loading = true;
  	this.router.params.subscribe(params => {
  		console.log(params['id']);
  		this.getArtista(params['id']);
  		this.getTopTracks(params['id']);
  	});
  }

  ngOnInit() {
  }

  getArtista(id: string) {
  	this.loading = true;
  	this.error = false;
  	this.spotify.getArtista(id).subscribe(artista => {
  		console.log(artista);
  		this.artista = artista;
  		this.loading = false;
  	}, (error) => {
      this.loading = false;
      this.error = true;
      this.errorMensaje = error.error.error.message;
    });
  }

  getTopTracks(id: string) {
  	this.loading = true;
  	this.error = false;
  	this.spotify.getTopTracks(id).subscribe(tracks => {
  		console.log(tracks);
  		this.topTracks = tracks;
  		this.loading = false; 
  	}, (error) => {
      this.loading = false;
      this.error = true;
      this.errorMensaje = error.error.error.message;
    });
  }

}
