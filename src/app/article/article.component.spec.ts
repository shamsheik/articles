import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleComponent } from "./article.component";
import { ArticleService } from "../article.service";
import { of } from "rxjs";

describe('ArticleComponent',()=>{
    let component: ArticleComponent;
    let fixture: ComponentFixture<ArticleComponent>;
    let mockActivatedRoute : any;
    let mockArticleService : any;
    let mockRouter : any;
    
    beforeEach(async ()=>{
        mockActivatedRoute = {
            params: of({key:'sample-key'})
        }
        mockArticleService = {
            getArticleKey : jest.fn()
        }
        mockRouter = {
            navigate : jest.fn()
        };
        await TestBed.configureTestingModule({
            declarations:[ArticleComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute},
                { provide: ArticleService, useValue: mockArticleService},
                { provide: Router, useValue: mockRouter}
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(ArticleComponent);
        component = fixture.componentInstance;
    });
    it('should create the component',()=>{
        expect(component).toBeTruthy();
    });
    it('should navigate to page-not-found when article is not found',()=>{
        mockArticleService.getArticleKey.mockReturnValue(of(null));
        component.ngOnInit();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['page-not-found']);
    });
    it('should set article when article is found',()=>{
        const mockArticle = { title: 'Sample-Article' };
        mockArticleService.getArticleKey.mockReturnValue(of(mockArticle));
        component.ngOnInit();
        expect(component.article).toEqual(mockArticle);
    })
})