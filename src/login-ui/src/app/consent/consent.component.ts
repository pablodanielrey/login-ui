import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {

  consent: string = '';

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      console.log(p);
      console.log(p.get('consent'));
      this.consent = p.get('consent');
    });
  }

}
