import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  errorMensaje: string;

  constructor(private spotify: SpotifyService) { 

    this.loading = true;
    this.error = false;

  	this.spotify.getNewReleases().subscribe((data:any) => {
  		console.log(data);
  		this.nuevasCanciones = data;
      this.loading = false;

  	}, (error) => {
      this.loading = false;
      this.error = true;
      this.errorMensaje = error.error.error.message;
    });
  }

  ngOnInit() {
  }

}
