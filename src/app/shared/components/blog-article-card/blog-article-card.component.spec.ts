import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogArticleCardComponent } from './blog-article-card.component';

describe('BlogArticleCardComponent', () => {
  let component: BlogArticleCardComponent;
  let fixture: ComponentFixture<BlogArticleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogArticleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
