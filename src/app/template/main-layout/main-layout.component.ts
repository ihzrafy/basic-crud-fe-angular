import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

interface Todo {
  id: number;
  title: string;
  progress: number;
}

export interface ApexChartInterface {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
}

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  todos: Todo[] = [];
  chartOptions: Partial<ApexChartInterface> | any;
  pieChartOptions: Partial<ApexChartInterface> | any;

  constructor(private restApiService: ApiServiceService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  private getTodos() {
    this.restApiService.getUser().subscribe({
      next: (res) => {
        this.todos = res.data;
        this.showBarChart();
        this.showPieChart();
        console.log(this.todos);
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  }

  showBarChart() {
    const todoTitles = this.todos.map(todo => todo.title);
    const todoProgress = this.todos.map(todo => todo.progress);

    this.chartOptions = {
      series: [{ name: 'Progress', data: todoProgress }],
      chart: { type: 'bar', height: 350 },
      plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' }},
      dataLabels: { enabled: true, formatter: (val: number) => `${val}%` },
      xaxis: { categories: todoTitles, title: { text: 'Todo Titles' } },
      yaxis: { title: { text: 'Progress (%)' }, max: 100 },
      fill: { opacity: 1 },
      tooltip: { y: { formatter: (val: number) => `${val}% completed` } },
    };
  }

  showPieChart() {
    // Menghitung jumlah todo berdasarkan title
    const todoCountMap = this.todos.reduce((acc, todo) => {
      acc[todo.title] = (acc[todo.title] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(todoCountMap);
    const counts = Object.values(todoCountMap);

    this.pieChartOptions = {
      series: counts,
      chart: { type: 'pie', height: 350 },
      labels: categories,
      dataLabels: { enabled: true },
      legend: { position: 'bottom' },
    };
  }
}
