import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	artistas: any[] = [];
  loading: boolean = false;
  error: boolean;
  errorMensaje: string;

  constructor(private spotify: SpotifyService) { 
    this.error = false;
  }

  ngOnInit() {
  }

  buscar (termino: string) {
  	console.log(termino);
    this.loading = true;
  	this.spotify.getArtistas(termino).subscribe((data:any) => {
  		console.log(data);
  		this.artistas = data;
      this.loading = false;

  	}, (error) => {
      this.loading = false;
      this.error = true;
      this.errorMensaje = error.error.error.message;
    });
  }

}
