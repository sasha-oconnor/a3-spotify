import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
    //Subscribe id so that Angular reuses this component.
    this.route.paramMap.subscribe((params) => {
      this.artistId = params.get('id');
      //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
      this.spotifyService.getArtist(this.artistId).then((data) => {
        this.artist = data;
      });
      this.spotifyService.getTopTracksForArtist(this.artistId).then((data) => {
        this.topTracks = data;
      });
      this.spotifyService.getAlbumsForArtist(this.artistId).then((data) => {
        this.albums = data;
      });
    });
  }

}