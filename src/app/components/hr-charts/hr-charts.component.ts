import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/services/charts.service';
import { ToastrService } from 'ngx-toastr';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-hr-charts',
  templateUrl: './hr-charts.component.html',
  styleUrls: ['./hr-charts.component.css']
})
export class HrChartsComponent implements OnInit {
  totalTestsChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    }
  };
  totalTestsChartLabels: Label[] = [];
  totalTestsChartData: number[] = [];
  totalTestsChartType: ChartType = 'pie';
  totalTestsChartColors = [
    {
      backgroundColor: ["#ffa1b5", "#86c7f3", "#ffe29a"],
    },
  ];


  testPerTechnologyChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{ticks: {beginAtZero: true}}], yAxes: [{ticks: {beginAtZero: true}}] }
  };
  testPerTechnologyChartLabels: Label[] = [];

  testPerTechnologyChartData: ChartDataSets[] = [
    {data: [], label: ''}
  ];
  constructor(private chartsService: ChartsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTestsTotal();
    this.getStatistics();
  }

  getTestsTotal() {
    return this.chartsService.getTestsTotal().subscribe((res) => {
      this.totalTestsChartLabels.push(['For Review']);
      this.totalTestsChartData.push(res.forReview);
      this.totalTestsChartLabels.push(['Reviewed']);
      this.totalTestsChartData.push(res.reviewed);
      this.totalTestsChartLabels.push(['Invited']);
      this.totalTestsChartData.push(res.invited);
    }, (err) => {
      this.toastr.show("Getting total tests data failed");
    });
  };

  getStatistics() {
    return this.chartsService.getChartData().subscribe((res) => {
      const forReviewData = [];
      const reviewData = [];
      const invitedData = [];
      for (const testGroupStatistic of res) {
        this.testPerTechnologyChartLabels.push(testGroupStatistic.testGroupName);
        forReviewData.push(testGroupStatistic.testStatistics.forReview);
        reviewData.push(testGroupStatistic.testStatistics.reviewed);
        invitedData.push(testGroupStatistic.testStatistics.invited);
      }
      this.testPerTechnologyChartData = [
        { data: forReviewData, label: 'For review' },
        { data: reviewData, label: 'Reviewed' }, 
        { data: invitedData, label: 'Invited' }];
    }, (err) => {
      this.toastr.show("Getting statistics data failed");
    })
  }
}
