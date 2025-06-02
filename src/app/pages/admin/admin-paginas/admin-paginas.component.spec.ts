import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AdminPaginasComponent } from "./admin-paginas.component";
import { DataService } from "../../../services/data.service";

describe("AdminPaginasComponent", () => {
  let component: AdminPaginasComponent;
  let fixture: ComponentFixture<AdminPaginasComponent>;
  let router: Router;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj("DataService", [
      "obterConteudoPagina",
      "atualizarConteudoPagina",
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AdminPaginasComponent],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AdminPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain a list of pages", () => {
    expect(component.pages.length).toBeGreaterThan(0);
  });

  it("should navigate to editor when navegarParaEditor is called", () => {
    const navigateSpy = spyOn(router, "navigate");
    component.navegarParaEditor("test-slug");
    expect(navigateSpy).toHaveBeenCalledWith(["/admin/paginas", "test-slug"]);
  });
});
