import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 800) this.changeNavStatus();
    });
  }

  changeNavStatus(): void {
    let checkbox: any = document.getElementsByName("navi");
    checkbox[0].checked = false;
  }
}
