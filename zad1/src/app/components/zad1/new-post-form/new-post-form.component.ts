import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonPlaceholderService } from 'src/app/services/json-placeholder.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-new-post-form',
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.css'],
})
export class NewPostFormComponent implements OnInit {
  modelForm: FormGroup;
  @Output() postAdded = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private jsonPlaceholderService: JsonPlaceholderService
  ) {
    this.modelForm = this.formBuilder.group({
      title: [''],
      body: [''],
    });
  }

  ngOnInit(): void {}

  addPost(): void {
    let newPost: Post = {
      userId: 1,
      title: this.modelForm.value.title,
      body: this.modelForm.value.body,
    };
    this.jsonPlaceholderService.addPost(newPost).subscribe((data) => {
      this.clearForm();
      this.postAdded.emit(data);
    });
  }

  clearForm(): void {
    this.modelForm.reset();
  }
}
