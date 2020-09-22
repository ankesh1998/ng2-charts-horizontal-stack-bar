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
    },
    tooltips: {
      // Disable the on-canvas tooltip
      enabled: false,
      custom: function (tooltipModel) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          tooltipEl.style.backgroundColor = "#FFFFFF";
          tooltipEl.style.borderColor = "#000000";
          tooltipEl.style.borderWidth = "thin";
          tooltipEl.style.borderStyle = "solid";
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = "0";
          return;
        } else {
          tooltipEl.style.opacity = "1";
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<thead>';

          titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function (body, i) {
            let name = body[0].split(":")[0];
            let icon = null;
            if (name == "Bot") {
              icon = '<div style="margin-top:2px;margin-right:2px;float: left;height: 15px;width: 15px;border: 1px solid #E76B25;clear: both;background-color: #E76B25;"></div>';
              name = icon + name;
            } else if (name == "Normal") {
              icon = '<div style="margin-top:2px;margin-right:2px;float: left;height: 15px;width: 15px;border: 1px solid #53AF50;clear: both;background-color:#53AF50;"></div>';
              name = icon + name;
            } else if (name == "Human Impersonation") {
              icon = '<div style="margin-top:2px;margin-right:2px;float: left;height: 15px;width: 15px;border: 1px solid #E8594C;clear: both;background-color: #E8594C;"></div>';
              name = icon + name;
            }else if (name == "Unknown") {
              icon = '<div style="margin-top:2px;margin-right:2px;float: left;height: 15px;width: 15px;border: 1px solid #c0c0c0;clear: both;background-color: #c0c0c0;"></div>';
              name = icon + name;
            }
            let value = body[0].split(":")[1];
            innerHtml += '<tr><td style="padding: 0px"><b>' + name + ':</b> ' + value + '</td></tr>';
          });
          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        // `this` will be the overall tooltip
        var position = this._chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }
    }
  };
  public barChartType: ChartType = "horizontalBar";

  public barChartData: ChartDataSets[] = [
    { data: [] },
    { data: [] },
    { data: [] }
  ];
  public barChartLabels: string[] = ["Web", "iOS", "Android"];
  // stackChartColors;
  constructor() {}

  ngOnInit() {
    this.barChartData = [
      { data: [1, 2, 3],
        label: "Bot",
        stack: "a",
        backgroundColor: "rgb(255, 129, 0)" 
      },
      {
        data: [2, 2, 3],
        label: "Normal",
        stack: "a",
        backgroundColor: "#DFEFDD"
      },
      {
        data: [0, 2, 3],
        label: "Human Impersonation",
        stack: "a",
        backgroundColor: "#F8DBD8"
      },
      {
        data: [1, 2, 3],
        label: "Unknown",
        stack: "a",
        backgroundColor: "#f0f0f0"
      }
    ];
  }
}
