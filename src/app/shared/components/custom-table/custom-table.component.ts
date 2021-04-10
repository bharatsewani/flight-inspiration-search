import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  constructor() { }
  p: number = 1;
  
  @Input()
  columns: { title: string; key: string }[] = [];

  @Input()
  values: any[] = [];

  @ContentChild("header", { static: false })
  headerTemplate: TemplateRef<any>;

  @ContentChild("body", { static: false })
  bodyTemplate: TemplateRef<any>;

  ngOnInit(): void {

  }

}
