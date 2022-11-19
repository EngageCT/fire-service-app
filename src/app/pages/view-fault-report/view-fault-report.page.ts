import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-fault-report',
  templateUrl: './view-fault-report.page.html',
  styleUrls: ['./view-fault-report.page.scss'],
})
export class ViewFaultReportPage implements OnInit {
  fault: any;
  url = environment.url;
  faultID: any;
  reviews: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    console.log(this.faultID);
    this.http.get(this.url + 'get-fault-details.php?id=' + this.faultID).subscribe((data: any) => {
      console.log(data);
      this.fault = data.fault;
      this.reviews = data.ratings;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    console.log(this.faultID);
    this.http.get(this.url + 'get-fault-details.php?id=' + this.faultID).subscribe((data: any) => {
      console.log(data);
      this.fault = data.fault;
      this.reviews = data.ratings;
    });
  }

}
