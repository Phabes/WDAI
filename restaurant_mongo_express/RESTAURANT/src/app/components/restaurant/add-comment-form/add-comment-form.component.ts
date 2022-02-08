import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commentary } from 'src/models/commentary';

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.css'],
})
export class AddCommentFormComponent implements OnInit {
  modelForm: FormGroup;
  @Output() addComment = new EventEmitter();
  @Output() commentErrors = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.modelForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      review: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(500),
        ],
      ],
      date: [],
    });
  }

  ngOnInit(): void {}

  addCommentClick(): void {
    let errors: string[] = [];
    if (this.modelForm.valid) {
      let comment: Commentary = {
        nick: 'NICK',
        title: this.modelForm.value.title,
        review: this.modelForm.value.review,
        date: this.modelForm.value.date,
      };
      this.addComment.emit(comment);
      this.clearForm();
    } else {
      if (this.modelForm.controls['title'].errors != null) {
        errors.push('Title is required');
      }
      let reviewErrors = this.modelForm.controls['review'].errors;
      if (reviewErrors != null) {
        Object.keys(reviewErrors).forEach((keyError) => {
          if (keyError == 'required') errors.push('Review is required');
          if (keyError == 'minlength') errors.push('Review is too short');
          if (keyError == 'maxlength') errors.push('Review is too long');
        });
      }
    }
    this.commentErrors.emit(errors);
  }

  clearForm(): void {
    this.modelForm.reset();
  }
}
