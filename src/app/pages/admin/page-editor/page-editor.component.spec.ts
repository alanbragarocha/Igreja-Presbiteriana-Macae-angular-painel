import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router, convertToParamMap } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { PageEditorComponent } from "./page-editor.component";
import { DataService } from "../../../services/data.service";

describe("PageEditorComponent", () => {
  let component: PageEditorComponent;
  let fixture: ComponentFixture<PageEditorComponent>;
  let router: Router;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj("DataService", [
      "obterConteudoPagina",
      "atualizarConteudoPagina",
    ]);
    dataServiceSpy.obterConteudoPagina.and.returnValue({
      "test-key": "test-value",
    });

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, PageEditorComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ slug: "test-page" }),
            },
          },
        },
        { provide: DataService, useValue: dataServiceSpy },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(PageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load page content on init", () => {
    expect(dataServiceSpy.obterConteudoPagina).toHaveBeenCalledWith(
      "test-page"
    );
    expect(component.pageSlug).toBe("test-page");
  });

  it("should save content correctly", () => {
    const testItem = { slug: "test-key", valor: "new-value" };
    component.salvar(testItem);

    expect(dataServiceSpy.atualizarConteudoPagina).toHaveBeenCalledWith(
      "test-page",
      { "test-key": "new-value" }
    );
  });

  it("should navigate back to pages list", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.voltarParaListagem();
    expect(navigateSpy).toHaveBeenCalledWith(["/admin/paginas"]);
  });
});
