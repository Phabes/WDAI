import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-posty-page',
  templateUrl: './posty-page.component.html',
  styleUrls: ['./posty-page.component.css'],
})
export class PostyPageComponent implements OnInit {
  posts: Post[] = [];

  constructor(private jsonPlaceholderService: JsonPlaceholderService) {}

  ngOnInit(): void {
    this.jsonPlaceholderService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  addPost(newPost: Post): void {
    this.posts.push(newPost);
  }
}
