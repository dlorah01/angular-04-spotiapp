import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
  	const url = `https://api.spotify.com/v1/${query}`;

  	const headers = new HttpHeaders({
  		'Authorization': 'Bearer BQDiRTr-7jXaYpyFDsLsA3vbutaxhpFOijDkJ2y0oOGVcIVphOKYp_v0RyFhuOGjye9RU-SrDJstN7kylHI'
  	});

  	return this.http.get(url, {headers});
  }


  getNewReleases () {

  	// const headers = new HttpHeaders({
  	// 	'Authorization': 'Bearer BQBwgX7J2YII54kgGzitUhNvxdjJwUKh-EgbJwPSGF59Dlw6X8RFuOjImopCc7B7b0hfVw4OUWDP3KeHc0M'
  	// });
  	// return this.http.get("https://api.spotify.com/v1/browse/new-releases", {headers})
  	// 					.pipe(map( data => {
  	// 						return data['albums'].items;
  	// 					}));

  	return this.getQuery('browse/new-releases?limit=20')
  	  					.pipe(map( data => {
  							return data['albums'].items;
  						}));
  }

  getArtistas (termino: string) {
  	// const headers = new HttpHeaders({
  	// 	'Authorization': 'Bearer BQBwgX7J2YII54kgGzitUhNvxdjJwUKh-EgbJwPSGF59Dlw6X8RFuOjImopCc7B7b0hfVw4OUWDP3KeHc0M'
  	// });
  	// return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
  	// 					.pipe(map( data => {
  	// 						return data['artists'].items;
  	// 					}));

  	return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
  	  					.pipe(map( data => {
  							return data['artists'].items;
  						}));
  }

  getArtista (id: string) {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQBwgX7J2YII54kgGzitUhNvxdjJwUKh-EgbJwPSGF59Dlw6X8RFuOjImopCc7B7b0hfVw4OUWDP3KeHc0M'
    // });
    // return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
    //           .pipe(map( data => {
    //             return data['artists'].items;
    //           }));

    return this.getQuery(`artists/${id}`);
  }

  getTopTracks (id:string) {

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
                  .pipe(map( data => {
                    return data['tracks'];
                  }));
  }
}
