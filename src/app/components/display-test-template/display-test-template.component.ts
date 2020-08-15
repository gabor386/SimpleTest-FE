import { Component, OnInit, Input } from '@angular/core';
import { TestTemplate } from 'src/app/model/TestTemplate';
import { TestTemplateService } from 'src/app/services/test-template.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-display-test-template',
  templateUrl: './display-test-template.component.html',
  styleUrls: ['./display-test-template.component.css']
})
export class DisplayTestTemplateComponent implements OnInit {

  @Input() testTemplate: TestTemplate;
  testT: TestTemplate=null;
  constructor(private testTemplateService: TestTemplateService,private router: Router,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    
  }

  

  

}
