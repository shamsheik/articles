import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ArticleListComponent } from './article-list.component';
import { ArticleService } from '../article.service';

describe('ArticleListComponent', () => {
  let component: ArticleListComponent;
  let fixture: ComponentFixture<ArticleListComponent>;
  let mockArticleService: any;

  beforeEach(async () => {
    mockArticleService = {
      authenticateUser: jest.fn(), // Mock the authenticateUser method
      getArticles: jest.fn(), // Mock the getArticles method
    };

    await TestBed.configureTestingModule({
      declarations: [ArticleListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ArticleService, useValue: mockArticleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should authenticate user on component initialization', () => {
    mockArticleService.authenticateUser.mockReturnValue(of(null));

    component.ngOnInit();

    expect(mockArticleService.authenticateUser).toHaveBeenCalled();
  });

  it('should get articles on component initialization', () => {
    const mockArticles = [{ title: 'Article 1' }, { title: 'Article 2' }];
    mockArticleService.getArticles.mockReturnValue(of(mockArticles));
    component.ngOnInit();

    expect(mockArticleService.getArticles).toHaveBeenCalled();
    expect(component.articles).toEqual(mockArticles);
  });
});
