import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    }
  };
  public barChartType: ChartType = "horizontalBar";

  public barChartData: ChartDataSets[] = [];
  public barChartLabels: string[] = ["Web", "iOS", "Android"];
  // stackChartColors;
  constructor() {}

  ngOnInit() {
    this.barChartData = [
      { data: [1, 2, 3], label: "Bot", stack: "a", backgroundColor: ["black"] },
      {
        data: [2, 2, 3],
        label: "Normal",
        stack: "a",
        backgroundColor: ["#007bff"]
      },
      {
        data: [0, 2, 3],
        label: "Human Impersonation",
        stack: "a",
        backgroundColor: ["#007bff"]
      },
      {
        data: [1, 2, 3],
        label: "Unknown",
        stack: "a",
        backgroundColor: ["#007bff"]
      }
    ];
  }
}
